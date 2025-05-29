import { Campaign } from "../models/campaign.models";
import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

const addCampaign = async (req, res) => {
  const {
    name,
    message,
    rule,
    audienceSize,
    sentCount = 0,
    failedCount = 0,
    created_by,
  } = req.body;

  if (!name || !rule) {
    return ApiError(401, "Name or rule can't be empty");
  }

  const existingCampaign = await Campaign.findOne({ name: name });

  if (existingCampaign) {
    return ApiError(401, "Campaign with same name already exists");
  }

  const campaign = await Campaign.create({
    name,
    message,
    rule,
    audienceSize,
    sentCount,
    failedCount,
    created_by,
  });

  const isCeatedCampaign = await Campaign.findById(campaign?._id);

  if (!isCeatedCampaign) {
    return ApiError(401, "Unable to create the Campaign something went wrong");
  }
  return res.status(200).json({ campaign });
};

const getAllCampaign = async (req, res) => {
  const campaign = await Campaign.find({});

  if (!campaign) {
    return ApiError(401, "Unable to find anyting in the database");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, campaign, "Successfully found the campaigns"));
};

export { addCampaign, getAllCampaign };
