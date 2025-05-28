import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema(
  {
    segment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Segment",
      required: true,
    },
    name: {
      type: String,
    },
    message: {
      type: String,
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
