import express, {Request, Response} from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: ['http://localhost:3003','http://localhost:3002'], credentials: true
}));

app.get('/health', (_req: Request, res: Response) => {
    return res.json({
    status: 'ok',
    uptime: process.uptime(),
    time: Date.now(),
  })
});

app.listen(8000, ()=> {
    console.log('Product service is running on port 8000');
})
