import { consumer } from "./kafka";
import { createStripeProduct, deleteStripeProduct } from "./stripeProduct";

export const runKafkaSubscriptions = async () => {
    await consumer.subscribe([
        {
            topicName: "product.created",
            topicHandler: async (message) => {
                console.log("Received message: product.created", message);
                try {
                    await createStripeProduct(message);
                } catch (err) {
                    console.error('[Kafka] Failed to handle product.created:', (err as Error).message);
                }
            },
        },
        {
            topicName: "product.deleted",
            topicHandler: async (message) => {
                console.log("Received message: product.deleted", message);
                try {
                    await deleteStripeProduct(message);
                } catch (err) {
                    console.error('[Kafka] Failed to handle product.deleted:', (err as Error).message);
                }
            },
        },
    ]);
}


    