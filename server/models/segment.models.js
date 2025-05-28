import mongoose from "mongoose";

const segmentSchema = new mongoose.Schema(
  {
    name: {
      ype: String,
      required: true,
    },
    description: {
      type: String,
    },
    estimated_size: {
      type: Number,
    },
    rules: [
      {
        field: {
          type: String,
          required: true,
        },
        operator: {
          type: String,
          required: true,
        },
        value: {
          type: mongoose.Schema.Types.Mixed,
          required: true,
        },
        logicalOperator: {
          type: String,
          enum: ["AND", "OR"],
          default: "AND",
        },
      },
    ],
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

export const Segment = mongoose.model("Segment", segmentSchema);
