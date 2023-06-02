import mongoose from 'mongoose'
import app from './app'
import config from './config'
import logger from './shared/logger'

// database connection
async function bootstrap() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connection successful.`)

    app.listen(config.port, () => {
      logger.info(`Server is listening on port ${config.port}`)
    })
  } catch (err) {
    logger.error(`Fail to connect Database: error code 500`, err)
  }
}
bootstrap()
