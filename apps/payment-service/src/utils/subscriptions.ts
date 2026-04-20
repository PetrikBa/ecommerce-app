import { consumer } from "./kafka";
import { createStripeProduct, deleteStripeProduct } from "./stripeProduct";

export const runKafkaSubscriptions = async () => {
    await consumer.subscribe([
        {
            topicName: "product.created",
            topicHandler: async (message) => {
                console.log("Received message: product.created", message);
                await createStripeProduct(message);
            },
        },
        {
            topicName: "product.deleted",
            topicHandler: async (message) => {
                console.log("Received message: product.deleted", message);
                await deleteStripeProduct(message);
            },
        },
    ]);
}


    