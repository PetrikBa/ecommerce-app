import sendMail from "./utils/mailer";
import { createConsumer, createKafkaClient } from "@repo/kafka";
import { createServer } from "http";

const kafka = createKafkaClient("email-service");
const consumer = createConsumer(kafka, "email-service");

const subscriptions = [
    {
        topicName: "user.created",
        topicHandler: async (message: any) => {
            const { email, username } = message;
            console.log(`Received user.created event for ${username} (${email})`);
            if (email) {
                await sendMail({
                    subject: "Welcome to E-commerce App",
                    email,
                    text: `Hi ${username}, welcome to our e-commerce app! We're glad to have you on board.`
                });
            }
        }
    },
    {
        topicName: "order.created",
        topicHandler: async (message: any) => {
            const { email, amount, status } = message;
            console.log(`Received order.created event for ${email} with amount ${amount} and status ${status}`);
            if (email) {
                await sendMail({
                    subject: "Order Confirmation",
                    email,
                    text: `Hi ${email}, your order was created.`
                });
            }
        }
    }
];

const start = async () => {
    // HTTP server so Render Web Service stays alive
    const port = Number(process.env.PORT) || 8004;
    createServer((_, res) => { res.writeHead(200); res.end('ok'); }).listen(port, () => {
        console.log(`[Email service] Health check listening on port ${port}`);
    });

    try {
        await consumer.connect();
        await consumer.subscribe(subscriptions);
        console.log('[Email service] Kafka connected and listening');
    } catch (err) {
        console.warn('[Email service] Kafka connection failed, emails will not be sent:', (err as Error).message);
    }
}

const shutdown = async (signal: string) => {
    console.log(`[Email service] Received ${signal}, shutting down...`);
    try {
        await consumer.disconnect();
    } catch (err: any) {
        console.error('[Kafka] Error during disconnect:', err.message);
    }
    process.exit(0);
};

process.on('SIGTERM', () => shutdown('SIGTERM'));
process.on('SIGINT', () => shutdown('SIGINT'));

start();
