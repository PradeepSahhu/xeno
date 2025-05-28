import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    googleId: {
      type: String,
      unique: true,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    lastLogin: {
      type: Date,
    },
    createdAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

userSchema.index({ googleId: 1 });

export const User = mongoose.model("User", userSchema);
