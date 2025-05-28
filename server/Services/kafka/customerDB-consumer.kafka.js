import { Kafka } from "kafkajs";

import { Customer } from "../../models/customer.models.js";

import DatabaseConnection from "../../utils/DatabaseConnection.utils.js";

const kafka = new Kafka({
  clientId: "my-apps",
  brokers: ["localhost:9092"],
});

const consumer = kafka.consumer({ groupId: "customer-consumer-group" });

const run = async () => {
  // Consuming

  await DatabaseConnection();
  await consumer.connect();
  await consumer.subscribe({ topic: "customer-events", fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      // it should send the data to the database.

      const {
        name,
        email,
        phone,
        totalSpent,
        totalVisits,
        lastPurchaseDate,
        lastActivityDate,
        isActive,
        createdDate,
      } = JSON.parse(message.value);

      console.table(JSON.parse(message.value));

      const customer = await Customer.create({
        name,
        email,
        phone,
        totalSpent,
        totalVisits,
        lastPurchaseDate,
        lastActivityDate,
        isActive,
        createdDate,
      });
      console.log({
        partition,
        offset: message.offset,
        value: message.value?.toString(),
      });

      const res = Customer.findById(customer._id);

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
