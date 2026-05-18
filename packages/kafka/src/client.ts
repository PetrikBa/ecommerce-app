import { Kafka, logLevel, SASLOptions } from "kafkajs";

export const createKafkaClient = (service: string) => {
    const brokers = (process.env.KAFKA_BROKERS ?? "localhost:9094,localhost:9095,localhost:9096").split(",");

    const sasl: SASLOptions | undefined =
        process.env.KAFKA_USERNAME && process.env.KAFKA_PASSWORD
            ? {
                  mechanism: "plain",
                  username: process.env.KAFKA_USERNAME,
                  password: process.env.KAFKA_PASSWORD,
              }
            : undefined;

    return new Kafka({
        clientId: service,
        brokers,
        ssl: sasl ? true : false,
        sasl,
        logLevel: logLevel.ERROR,
    });
}