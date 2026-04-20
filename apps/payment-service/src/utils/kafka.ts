import { createKafkaClient, createConsumer, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("payment-service");

export const producer = createProducer( { kafka: kafkaClient } );
export const consumer = createConsumer( kafkaClient, "payment-group" );