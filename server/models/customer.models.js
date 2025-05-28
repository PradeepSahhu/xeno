import mongoose from "mongoose";

const CustomerSchmea = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    totalSpent: {
      type: Number,
      default: 0,
    },
    totalVisits: {
      type: Number,
      default: 0,
    },
    lastPurchaseDate: {
      type: Date,
    },
    lastActivityDate: {
      type: Date,
      default: Date.now,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    createdDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Customer = mongoose.model("Customer", CustomerSchmea);
