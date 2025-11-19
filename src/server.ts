import dotenv from 'dotenv'
import next from 'next'
import nextBuild from 'next/dist/build'
import path from 'path'
import email from './payload/email/transport'

dotenv.config({
  path: path.resolve(__dirname, '../.env'),
})

import express from 'express'
import payload from 'payload'

import { seed } from './payload/seed'

const app = express()
const PORT = process.env.PORT || 5000

const start = async (): Promise<void> => {
  try {
    await payload.init({
      secret: process.env.PAYLOAD_SECRET || '',
      express: app,
      email,
      onInit: () => {
        payload.logger.info(`Payload Admin URL: ${payload.getAdminURL()}`)
      },
    })
  } catch (error) {
    payload.logger.error('Failed to initialize Payload:', error)
    process.exit(1)
  }

  if (process.env.PAYLOAD_SEED === 'true') {
    await seed(payload)
    process.exit()
  }

  if (process.env.NEXT_BUILD) {
    app.listen(PORT, '0.0.0.0', async () => {
      payload.logger.info(`Next.js is now building... PORT:`+ PORT)
      // @ts-expect-error
      await nextBuild(path.join(__dirname, '../'))
      process.exit()
    })

    return
  }

  const nextApp = next({
    dev: process.env.NODE_ENV !== 'production',
  })

  const nextHandler = nextApp.getRequestHandler()

  // Health check endpoint for Azure App Service
  app.get('/health', (req, res) => {
    res.status(200).json({ status: 'ok' })
  })

  app.use((req, res) => nextHandler(req, res))

  nextApp.prepare().then(() => {
    payload.logger.info('Starting Next.js...')

    app.listen(PORT, '0.0.0.0', async () => {
      payload.logger.info(`Next.js App URL: ${process.env.PAYLOAD_PUBLIC_SERVER_URL}`)
      payload.logger.info(`Server listening on port ${PORT}`)
    })
  }).catch((error) => {
    payload.logger.error('Failed to start Next.js:', error)
    process.exit(1)
  })
}

start().catch((error) => {
  console.error('Failed to start server:', error)
  process.exit(1)
})
