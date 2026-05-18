import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { clerkMiddleware } from "@clerk/hono"
import sessionRoute from './routes/session.route.js'
import webHookRoute from './routes/webhooks.route.js'
import { consumer, producer } from './utils/kafka.js';
import { shouldBeUser } from './middleware/authMiddleware.js';
import { runKafkaSubscriptions } from './utils/subscriptions.js'

const app = new Hono()

app.use('*', cors({
  origin: ['http://localhost:3002'],
  credentials: true,
}))
app.use('*', clerkMiddleware())

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    uptime: process.uptime(),
    time: Date.now(),
  })
})

app.get('/test', shouldBeUser, (c) => {
  const userId = c.get('userId');
  return c.json({ message: 'Payment service authenticated successfully!', userId });
})

app.route('/sessions', sessionRoute);
app.route('/webhooks', webHookRoute);

const start = async () => {
  try {
    Promise.all([
      await producer.connect(),
      await consumer.connect()
    ]);
    await runKafkaSubscriptions();
    serve (
      {
      fetch: app.fetch,
      port: Number(process.env.PORT) || 8002,
      hostname: '0.0.0.0',
      },
    (info) => {
      console.log('Payment service is running on port 8002')
    }
  )
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1)
  }
}
start();
