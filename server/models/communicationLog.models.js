import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    customerName: {
      type: String,
      required: true,
    },
    customerEmail: {
      type: String,
      required: true,
      lowercase: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["SENT", "FAILED"],
      default: "SENT",
    },
    sendAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  }
);
const communicationLogSchema = new mongoose.Schema(
  {
    campaign: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Campaign",
      required: true,
      index: true,
    },

    status: {
      type: String,
      enum: ["CREATED", "IN_PROGRESS", "COMPLETED", "FAILED"],
      default: "CREATED",
    },
    message: [messageSchema],
    sentCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    failedCount: {
      type: Number,
      default: 0,
      min: 0,
    },
    pendingCount: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

communicationLogSchema.pre("save", function (next) {
  if (this.message && this.message.length > 0) {
    this.sentCount = this.message.filter((msg) => msg.status === "SENT").length;
    this.failedCount = this.message.filter(
      (msg) => msg.status === "FAILED"
    ).length;
    this.pendingCount = this.message.length - this.sentCount - this.failedCount;
  }
  next();
});

communicationLogSchema.methods.updateMessageStatus = function (
  customerEmail,
  status
) {
  const messageToUpdate = this.message.find(
    (msg) => msg.customerEmail === customerEmail
  );
  if (messageToUpdate) {
    messageToUpdate.status = status;
    return this.save();
  }
  return Promise.reject(new Error("Message not found"));
};

communicationLogSchema.methods.getStats = function () {
  return {
    total: this.message.length,
    sent: this.sentCount,
    failed: this.failedCount,
    pending: this.pendingCount,
  };
};

export const CommunicationLog = mongoose.model(
  "CommunicationLog",
  communicationLogSchema
);

export const Message = mongoose.model("Message", messageSchema);
