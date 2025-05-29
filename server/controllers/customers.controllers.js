import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import { Customer } from "../models/customer.models.js";
import { customerProducer } from "../Services/kafka/producker.kafka.js";

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

  // add the comprehensive validation logic here.-----

  //--------------------------------------

  // console.log(req.body);

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

  const customer = {
    name: name,
    email: email,
    phone: phone,
    totalSpent: totalSpent,
    totalVisits: totalVisits,
    lastPurchaseDate: lastPurchaseDate,
    lastActivityDate: lastActivityDate,
    isActive: isActive,
    createdDate: createdDate,
  };

  const existingCustomer = await Customer.findOne({ email: email });

  if (existingCustomer) {
    return new ApiError(400, "Customer already exist with the same email id");
  }

  await customerProducer(JSON.stringify(customer));

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
