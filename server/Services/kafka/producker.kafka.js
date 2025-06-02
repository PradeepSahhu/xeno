import { Kafka } from "kafkajs";

// // the kafka client
const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER_URL || "localhost:9092"],
});

const producer = kafka.producer();

const connectKafkaProducker = async () => {
  return await producer.connect();
};

// // this is the prdocuer
// const producer = kafka.producer();
const orderProducer = async (data) => {
  // the kafka client

  // this is the prdocuer

  // Producing

  //   const data = JSON.stringify({
  //     customerID: "6836bcabd2a1cc00f32de89e",
  //     amount: "5000",
  //     order_date: "2025-05-20T15:30:00.000Z",
  //   });

  try {
    await producer.send({
      topic: "quickstart-events",
      messages: [{ value: data }],
    });
  } catch (error) {
    console.log(error);
  }
};

const customerProducer = async (data) => {
  try {
    await producer.send({
      topic: "customer-events",
      messages: [{ value: data }],
    });
  } catch (error) {
    console.log(error);
  }
};

// run().catch(console.error);
export { connectKafkaProducker, orderProducer, customerProducer };
