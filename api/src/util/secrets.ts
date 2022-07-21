import dotenv from 'dotenv'
import fs from 'fs'
import logger from './logger'

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables')
  dotenv.config({ path: '.env' })
} else {
  logger.debug('Using .env.example file to supply config environment variables')
  dotenv.config({ path: '.env.example' }) // you can delete this after you create your own .env file!
}

export const ENVIRONMENT = process.env.NODE_ENV
const prod = ENVIRONMENT === 'production' // Anything else is treated as 'dev'
export const PORT = process.env.PORT || 5000

export const POSTGRES_USER = process.env.POSTGRES_USER || ''
export const POSTGRES_PASS = process.env.POSTGRES_PASS || ''
export const POSTGRES_HOST = process.env.POSTGRES_HOST || ''
export const POSTGRES_PORT = parseInt(process.env.POSTGRES_PORT || '5432')
export const POSTGRES_DB = process.env.POSTGRES_DB || ''

export const JWT_SECRET = process.env['JWT_SECRET'] || ''
export const MONGODB_URI = process.env['MONGODB_URI'] || ''
// Use this instead if you want to use local mongodb
// export const MONGODB_URI = (
//   prod ? process.env['MONGODB_URI'] : process.env['MONGODB_URI_LOCAL']
// ) as string

if (!JWT_SECRET) {
  logger.error('No client secret. Set JWT_SECRET environment variable.')
  // process.exit(1)
}

if (!MONGODB_URI) {
  if (prod) {
    logger.error(
      'No mongo connection string. Set MONGODB_URI environment variable.'
    )
  } else {
    logger.error(
      'No mongo connection string. Set MONGODB_URI_LOCAL environment variable.'
    )
  }
  // process.exit(1)
}
