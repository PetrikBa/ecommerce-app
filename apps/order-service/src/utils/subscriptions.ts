import { OrderType } from "@repo/types";
import { consumer } from "./kafka";
import { createOrder } from "./order";

export const runKafkaSubscriptions = async () => {
    await consumer.subscribe([
        {
            topicName: "payment.successfull",
            topicHandler: async (message) => {
                console.log('[ORDER] Received Kafka message payment.successfull:', JSON.stringify(message));
                console.log('[ORDER] userId:', message?.userId, '| email:', message?.email, '| amount:', message?.amount, '| status:', message?.status, '| products count:', message?.products?.length);

                const order = message as OrderType;

                if (!order.userId) console.error('[ORDER] WARNING: userId is missing/null!');
                if (!order.email) console.error('[ORDER] WARNING: email is missing!');
                if (!order.products || order.products.length === 0) console.error('[ORDER] WARNING: products array is empty!');

                try {
                    const savedOrder = await createOrder(order);
                    console.log('[ORDER] Order successfully saved to DB, _id:', savedOrder._id);
                } catch (error) {
                    console.error('[ORDER] Failed to save order to DB:', error);
                }
            }
        }
    ]);
}