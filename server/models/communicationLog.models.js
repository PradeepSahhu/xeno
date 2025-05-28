import mongoose from "mongoose";

const communicationLogSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
    },
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
    },
    status: {
      type: String,
      enum: ["Sent", "Failed", "Pending"],
      default: "Pending",
    },
    message: {
      String,
    },
    sent_at: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);

export const CommunicationLog = mongoose.model(
  "CommunicationLog",
  communicationLogSchema
);
