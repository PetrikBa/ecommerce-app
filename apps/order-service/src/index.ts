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
    origin: ['http://localhost:3002', 'http://localhost:3003'],
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
    Promise.all([
      await connectOrderDB(),
      await producer.connect(),
      await consumer.connect()
    ]);
    await runKafkaSubscriptions();
    await fastify.listen({ port: Number(process.env.PORT) || 8001, host: '0.0.0.0' });
    console.log(`Order service is running on port ${process.env.PORT || 8001}`);
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
start()