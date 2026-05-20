import type { Kafka, Consumer } from "kafkajs";

type TopicSubscription = {
  topicName: string;
  topicHandler: (message: any) => Promise<void>;
};

export const createConsumer = (kafka: Kafka, groupId: string) => {
  const consumer: Consumer = kafka.consumer({ groupId });

  const connect = async () => {
    await consumer.connect();
    console.log("Kafka consumer connected:" + groupId);
  };

  const subscribe = async (subscriptions: TopicSubscription[]) => {
    const handlers = new Map(
      subscriptions.map(({ topicName, topicHandler }) => [topicName, topicHandler])
    );

    await consumer.subscribe({
      topics: subscriptions.map(({ topicName }) => topicName),
      fromBeginning: true,
    });

    await consumer.run({
      eachMessage: async ({ topic, message }) => {
        try {
          const value = message.value?.toString();
          if (value) {
            const handler = handlers.get(topic);
            if (handler) {
              await handler(JSON.parse(value));
            }
          }
        } catch (error) {
          console.error("[Kafka] Error processing message on topic", topic, error);
        }
      },
    });
  };

  const disconnect = async () => {
    await consumer.disconnect();
  };

  return { connect, subscribe, disconnect };
};