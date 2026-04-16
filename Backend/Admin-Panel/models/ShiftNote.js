const mongoose = require("mongoose");

const shiftNoteSchema = new mongoose.Schema(
  {
    parking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Parking",
      required: true,
      index: true,
    },

    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    note: {
      type: String,
      required: true,
      trim: true,
      maxlength: 1500,
    },

    handoverComment: {
      type: String,
      default: "",
      trim: true,
      maxlength: 1500,
    },
  },
  { timestamps: true },
);

shiftNoteSchema.index({ parking: 1, createdAt: -1 });

module.exports = mongoose.model("ShiftNote", shiftNoteSchema);
