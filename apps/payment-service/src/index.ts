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
  origin: ['http://localhost:3002', 'https://ecommerce-app-admin-azure.vercel.app', 'https://ecommerce-app-client-brown.vercel.app'],
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

const shutdown = async (signal: string) => {
  console.log(`[Payment service] Received ${signal}, shutting down...`);
  try {
    await Promise.all([producer.disconnect(), consumer.disconnect()]);
  } catch (err: any) {
    console.error('[Kafka] Error during disconnect:', err.message);
  }
  process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

const start = async () => {
  serve(
    {
      fetch: app.fetch,
      port: Number(process.env.PORT) || 8002,
      hostname: '0.0.0.0',
    },
    (info) => {
      console.log(`Payment service is running on port ${info.port}`);
    }
  );

  Promise.all([producer.connect(), consumer.connect()])
    .then(() => runKafkaSubscriptions())
    .catch((err) => console.warn('[Kafka] Connection failed, running without Kafka:', err.message));
}
start();
