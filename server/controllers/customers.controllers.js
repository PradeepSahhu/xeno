import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Customer } from "../models/customer.models.js";
import { consumrProducer } from "../Services/kafka/producker.kafka.js";

const addCustomer = asyncHandler(async (req, res) => {
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
  } = req.body;

  if (!name || !email || !phone) {
    return new ApiError(400, "All fields are required");
  }

  console.log(req.body);

  // send it to the kafka for insertion in the database

  //-----------------------------------------------------

  // const cusmer = await Customer.create({
  //   name,
  //   email,
  //   phone,
  //   totalSpent,
  //   totalVisits,
  //   lastPurchaseDate,
  //   lastActivityDate,
  //   isActive,
  //   createdDate,
  // });

  await consumrProducer("this is the consumer producer --------> ");

  // const createdCustomer = await Customer.findById(cusmer._id);

  // if (!createdCustomer) {
  //   return new ApiError(400, "User not created");
  // }
  //----------------------------------------------------

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Customer Successfully Added"));
});

export { addCustomer };
