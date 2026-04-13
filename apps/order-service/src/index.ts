import Fastify from 'fastify';
import cors from '@fastify/cors';
import { clerkPlugin, getAuth } from '@clerk/fastify';
import { shouldBeUser } from './middleware/AuthMiddleware.js';


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

  return reply.send({ message: 'Order service authenticated successfully!', userId: request.userId });
});

const start = async () => {
  try {
    await fastify.listen({ port: 8001 });
    console.log('Order service is running on port 8001');
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}
start()