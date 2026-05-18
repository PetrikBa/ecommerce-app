import sendMail from "./utils/mailer";
import { createConsumer, createKafkaClient } from "@repo/kafka";

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
    try {
        await consumer.connect();
        await consumer.subscribe(subscriptions);
        console.log('[Email service] Kafka connected and listening');
    } catch (err) {
        console.warn('[Email service] Kafka connection failed, emails will not be sent:', (err as Error).message);
    }
}

start();
