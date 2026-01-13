import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    priority: {
      type: String,
      enum: ["Must Do", "Important", "Optional"],
      default: "Must Do",
    },
    targetDate: {
      type: Date,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
