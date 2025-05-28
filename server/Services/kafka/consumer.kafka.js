import { Kafka } from "kafkajs";

import { Order } from "../../models/order.models.js";
import DatabaseConnection from "../../utils/DatabaseConnection.utils.js";

const kafka = new Kafka({
  clientId: "my-app",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "test-group" });

const run = async () => {
  // Consuming
  await consumer.connect();
  await consumer.subscribe({ topic: "quickstart-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // it should send the data to the database.

      DatabaseConnection().then(async () => {
        const { amount, order_date, customerID } = JSON.parse(message.value);

        console.log(JSON.parse(message.value));

        const order = await Order.create({
          customer: customerID,
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
      });

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
