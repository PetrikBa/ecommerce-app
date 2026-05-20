import express, {Request, Response} from 'express';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express';
import { shouldBeAdmin } from './middleware/authMiddleware.js';
import userRoute from './routes/user.route.js';
import { producer } from './utils/kafka.js';

const app = express();

app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3003', 'https://ecommerce-app-admin-azure.vercel.app', 'https://ecommerce-app-client-brown.vercel.app'],
    credentials: true,
}));

app.use(express.json());
app.use(clerkMiddleware());

app.get('/health', (req: Request, res: Response) => {
    return res.json({
    status: 'ok',
    uptime: process.uptime(),
    time: Date.now(),
  })
});

app.use('/users', shouldBeAdmin, userRoute);

app.use((err: any, req: Request, res: Response, next: Function) => {
    console.error(err);
    return res.status(err.status || 500).json({ message: err.message || 'Internal server error' });
});

const shutdown = async (signal: string) => {
    console.log(`[Auth service] Received ${signal}, shutting down...`);
    try {
        await producer.disconnect();
    } catch (err: any) {
        console.error('[Kafka] Error during disconnect:', err.message);
    }
    process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

const start = async () => {
    app.listen(Number(process.env.PORT) || 8003, () => {
        console.log(`Auth service is running on port ${process.env.PORT || 8003}`);
    });

    producer.connect()
        .catch((err) => console.warn('[Kafka] Connection failed, running without Kafka:', err.message));
}

start();
