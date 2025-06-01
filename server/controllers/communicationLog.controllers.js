import { asyncHandler } from "../utils/AsyncHandler.utils.js";
import { ApiError } from "../utils/ApiError.utils.js";
import { ApiResponse } from "../utils/ApiResponse.utils.js";

import { CommunicationLog } from "../models/communicationLog.models.js";

const getCampaignById = asyncHandler(async (req, res) => {
  const { campaignId } = req.body;
  console.log("this function is working");

  if (!campaignId) {
    return ApiError(301, "Campaign ID is required");
  }

  const log = await CommunicationLog.findOne({ campaign: campaignId });

  if (!log) {
    return ApiError(404, "Can't find the campaigh ID");
  }

  return res
    .status(201)
    .json(new ApiResponse(200, log, "Successfully fetched the log"));
});

export { getCampaignById };
