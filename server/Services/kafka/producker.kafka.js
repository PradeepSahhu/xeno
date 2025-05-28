import { Kafka } from "kafkajs";

// the kafka client
const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

// this is the prdocuer
const producer = kafka.producer();
const run = async () => {
  // Producing
  await producer.connect();

  const data = JSON.stringify({
    customerID: "6836bcabd2a1cc00f32de89e",
    amount: "5000",
    order_date: "2025-05-20T15:30:00.000Z",
  });
  await producer.send({
    topic: "quickstart-events",
    messages: [{ value: data }],
  });
};

// run().catch(console.error);
export default run;
