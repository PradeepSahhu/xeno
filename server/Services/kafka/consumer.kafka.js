import { Kafka } from "kafkajs";

import { Order } from "../../models/order.models.js";
import DatabaseConnection from "../../utils/DatabaseConnection.utils.js";

import dotenv from "dotenv";

dotenv.config();
console.log("the kafka port is : " + process.env.KAFKA_BROKER_URL);

const kafka = new Kafka({
  clientId: "my-app",
  brokers: [process.env.KAFKA_BROKER_URL || "localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Consuming
  await DatabaseConnection();
  await consumer.connect();
  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // it should send the data to the database.

      const { amount, order_date, customer } = JSON.parse(message.value);

      console.log(JSON.parse(message.value));

      const order = await Order.create({
        customer: customer,
        amount,
        order_date,
      });
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      const res = Order.findById(order._id);

      if (!res) {
        console.log("failed to push the data");
      }

      //   const { amount, order_date, customerID } = JSON.parse(message.value);

      //   console.log(JSON.parse(message.value));

      //   const order = await Order.create({
      //     customer: customerID,
      //     amount,
      //     order_date,
      //   });
      //   console.log({
      //     partition,
      //     offset: message.offset,
      //     value: message.value?.toString(),
      //   });

      //   const res = Order.findById(order._id);

      //   if (!res) {
      //     console.log("failed to push the data");
      //   }
    },
  });
};

run().catch(console.error);
