import errorHandler from 'errorhandler'
import { Sequelize } from 'sequelize-typescript'

import app from './app'
import logger from './util/logger'
import {
  POSTGRES_DB,
  POSTGRES_HOST,
  POSTGRES_PASS,
  POSTGRES_PORT,
  POSTGRES_USER,
} from './util/secrets'

export const sequelize = new Sequelize({
  dialect: 'postgres',
  username: POSTGRES_USER,
  password: POSTGRES_PASS,
  host: POSTGRES_HOST,
  port: POSTGRES_PORT,
  database: POSTGRES_DB,
  models: [__dirname + '/models'], // or [Player, Team],
})

try {
  sequelize
    .authenticate()
    .then(() =>
      logger.info('Connection to PostgreSQL has been established successfully.')
    )
} catch (error) {
  console.error('Unable to connect to the database:', error)
  process.exit(1)
}

;(async () => {
  await sequelize.sync()
  // await sequelize.sync({ force: true })
})()

/**
 * Error Handler. Provides error handing middleware only use in development
 */
if (process.env.NODE_ENV === 'development') {
  app.use(errorHandler())
}

// Start Express server
app.listen(app.get('port'), () => {
  console.log(
    '  App is running at http://localhost:%d in %s mode',
    app.get('port'),
    app.get('env')
  )
  console.log('  Press CTRL-C to stop\n')
})
