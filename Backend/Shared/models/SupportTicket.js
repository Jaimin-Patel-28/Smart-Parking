const mongoose = require("mongoose");

const supportTicketSchema = new mongoose.Schema(
  {
    ticketNumber: {
      type: String,
      unique: true,
      index: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    category: {
      type: String,
      default: "General",
      trim: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    bookingContext: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    transactionContext: {
      type: mongoose.Schema.Types.Mixed,
      default: null,
    },
    source: {
      type: String,
      enum: ["contact-form", "admin"],
      default: "contact-form",
    },
    status: {
      type: String,
      enum: ["open", "in-progress", "resolved", "closed"],
      default: "open",
    },
    adminNotes: {
      type: String,
      default: "",
    },
    handledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },
    resolvedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  },
);

supportTicketSchema.pre("save", async function generateTicketNumber() {
  if (!this.isNew || this.ticketNumber) {
    return;
  }

  let ticketNumber = `SUP-${Math.floor(1000 + Math.random() * 9000)}`;

  while (await mongoose.models.SupportTicket.exists({ ticketNumber })) {
    ticketNumber = `SUP-${Math.floor(1000 + Math.random() * 9000)}`;
  }

  this.ticketNumber = ticketNumber;
});

module.exports = mongoose.model("SupportTicket", supportTicketSchema);