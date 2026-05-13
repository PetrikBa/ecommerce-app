import { createKafkaClient,createProducer } from "@repo/kafka";

const kafkaClient = createKafkaClient("email-service");
export const producer = createProducer({ kafka: kafkaClient });