import Fastify from 'fastify';

const fastify = Fastify();

fastify.get('/health', async (request, reply) => {
  return reply.send({
    status: 'ok',
    uptime: process.uptime(),
    time: Date.now(),
  });
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