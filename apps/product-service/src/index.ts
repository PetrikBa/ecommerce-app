import express, {Request, Response} from 'express';
import cors from 'cors';
import { verifyToken } from '@clerk/backend';

const app = express();

app.use(cors({
    origin: ['http://localhost:3002', 'http://localhost:3003'],
    credentials: true,
}));

app.get('/health', (req: Request, res: Response) => {
    return res.json({
    status: 'ok',
    uptime: process.uptime(),
    time: Date.now(),
  })
});

app.get('/test', async (req: Request, res: Response) => {
    try {
        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            return res.status(401).json({ message: 'You are not logged in!' });
        }

        const verifiedToken = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY,
            authorizedParties: ['http://localhost:3002'],
            clockSkewInMs: 120_000,
        }) as { sub?: string };

        if (!verifiedToken?.sub) {
            return res.status(401).json({ message: 'You are not logged in!' });
        }

        return res.json({ message: 'Product service authenticated successfully!' });
    } catch {
        return res.status(401).json({ message: 'You are not logged in!' });
    }
})

app.listen(8000, ()=> {
    console.log('Product service is running on port 8000');
})
