import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Order } from "../models/order.models.js";
import { Customer } from "../models/customer.models.js";
import produckerRun from "../Services/kafka/producker.kafka.js";

const addOrders = asyncHandler(async (req, res) => {
  const { amount, order_date, customerID } = req.body;

  if (!amount || !order_date) {
    return new ApiError(400, "All fields are required");
  }

  const customer = await Customer.findById(customerID);

  if (!customer) {
    return new ApiError(401, "Can't find the Customer");
  }

  // send it to the kafka for insertion in the database

  // Order.create({
  // customer: customerID,
  // amount,
  // order_date,
  // });

  const data = JSON.stringify({ customer: customerID, amount, order_date });

  produckerRun(data);

  return res.status(201).json(new ApiResponse(200, {}, "Successfully ordered"));
});

export { addOrders };
