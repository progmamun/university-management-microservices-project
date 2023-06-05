import mongoose from 'mongoose'
import app from './app'
import config from './config'
import { logger, errorlogger } from './shared/logger'
import { Server } from 'http'

// database connection
async function bootstrap() {
  let server: Server
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection successful.`)

    server = app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`)
    })
  } catch (err) {
    errorlogger.error(`Fail to connect Database: error code 500`, err)
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error)
        process.exit(1)
      })
    } else {
      process.exit(1)
    }
  })
}
bootstrap()
