import { Campaign } from "../models/campaign.models.js";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";
import EventEmitter from "events";

import { PerformSendingMessages } from "../Services/vendorApi/EventFunctions.vendorApi.js";

const addCampaign = asyncHandler(async (req, res) => {
  const {
    name,
    rule,
    audienceSize,
    // sentCount = 0,
    // failedCount = 0,
    createdBy,
  } = req.body;

  console.table(req.body);

  if (!name || !rule) {
    return new ApiError(400, "Name or rule can't be empty");
  }

  const existingCampaign = await Campaign.findOne({ name: name });

  if (existingCampaign) {
    return new ApiError(401, "Campaign with same name already exists");
  }

  const campaign = await Campaign.create({
    name,
    rule,
    audienceSize,
    // sentCount,
    // failedCount,
    createdBy,
  });

  const isCeatedCampaign = await Campaign.findById(campaign?._id);

  if (!isCeatedCampaign) {
    return ApiError(401, "Unable to create the Campaign something went wrong");
  }

  const eventEmitter = new EventEmitter();
  eventEmitter.on("logging", PerformSendingMessages);
  process.nextTick(() => {
    eventEmitter.emit("logging", campaign?._id);
  });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Added Campaign Successfully"));
});

const getAllCampaign = asyncHandler(async (req, res) => {
  const campaign = await Campaign.find({});

  if (!campaign) {
    return new ApiError(401, "Unable to find anyting in the database");
  }

  console.log(campaign);

  return res
    .status(200)
    .json(new ApiResponse(200, campaign, "Successfully found the campaigns"));
});

export { addCampaign, getAllCampaign };
