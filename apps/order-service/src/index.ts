import Fastify from 'fastify';
import cors from '@fastify/cors';
import { clerkPlugin, getAuth } from '@clerk/fastify';
import { shouldBeUser } from './middleware/authMiddleware.js';
import { connectOrderDB } from '@repo/order-db';
import { orderRoute } from './routes/order.js';
import { consumer, producer } from './utils/kafka.js';
import { runKafkaSubscriptions } from './utils/subscriptions.js';

const fastify = Fastify();

fastify.register(cors, {
    origin: ['http://localhost:3002', 'http://localhost:3003', 'https://ecommerce-app-admin-azure.vercel.app'],
    credentials: true,
});

fastify.register(clerkPlugin);

fastify.get('/health', async (request, reply) => {
  return reply.send({
    status: 'ok',
    uptime: process.uptime(),
    time: Date.now(),
  });
});

fastify.get('/test', { preHandler: shouldBeUser }, async (request, reply) => {

  return reply.send({ 
    message: 'Order service authenticated successfully!', 
    userId: request.userId 
  });
});

fastify.register(orderRoute);

const start = async () => {
  try {
    await connectOrderDB();
  } catch (err) {
    console.error('[MongoDB] Connection failed:', err);
    process.exit(1);
  }

  await fastify.listen({ port: Number(process.env.PORT) || 8001, host: '0.0.0.0' });
  console.log(`Order service is running on port ${process.env.PORT || 8001}`);

  Promise.all([producer.connect(), consumer.connect()])
    .then(() => runKafkaSubscriptions())
    .catch((err) => console.warn('[Kafka] Connection failed, running without Kafka:', err.message));
}
start()