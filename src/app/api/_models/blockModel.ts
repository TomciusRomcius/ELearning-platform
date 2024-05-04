import mongoose from "mongoose";

export const blockSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true
  },
  order: {
    type: Number,
    required: true,
  },
});

export const BlockModel = mongoose.models.Block || mongoose.model("Block", blockSchema);