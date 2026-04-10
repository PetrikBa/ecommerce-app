import Fastify from 'fastify';
import cors from '@fastify/cors';
import { verifyToken } from '@clerk/backend';

const fastify = Fastify();

fastify.register(cors, {
    origin: ['http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
});


fastify.get('/health', async (request, reply) => {
  return reply.send({
    status: 'ok',
    uptime: process.uptime(),
    time: Date.now(),
  });
});

fastify.get('/test', async (request, reply) => {
  try {
    const token = (request.headers.authorization ?? '').replace('Bearer ', '');
    if (!token) {
      return reply.code(401).send({ message: 'You are not logged in!' });
    }
    const verifiedToken = await verifyToken(token, {
      secretKey: process.env.CLERK_SECRET_KEY,
      authorizedParties: ['http://localhost:3002'],
      clockSkewInMs: 120_000,
    }) as { sub?: string };
    if (!verifiedToken?.sub) {
      return reply.code(401).send({ message: 'You are not logged in!' });
    }
    return reply.send({ message: 'Order service authenticated successfully!' });
  } catch {
    return reply.code(401).send({ message: 'You are not logged in!' });
  }
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