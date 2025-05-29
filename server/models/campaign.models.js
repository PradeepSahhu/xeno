import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    rule: {
      type: Object,
      required: true,
    },
    audienceSize: {
      type: Number,
      required: true,
    },
    sentCount: {
      type: Number,
      default: 0,
    },
    failedCount: {
      type: Number,
      default: 0,
    },
    created_by: {
      type: String,
      required: true,
    },
    created_at: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const Campaign = mongoose.model("Campaign", campaignSchema);
