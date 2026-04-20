import { createKafkaClient, createConsumer, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("order-service");

export const producer = createProducer( { kafka: kafkaClient } );
export const consumer = createConsumer( kafkaClient, "order-group" );