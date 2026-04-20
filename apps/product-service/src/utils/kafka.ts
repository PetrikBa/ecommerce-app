import { createKafkaClient, createConsumer, createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("product-service");

export const producer = createProducer( { kafka: kafkaClient } );
export const consumer = createConsumer( kafkaClient, "product-group" );