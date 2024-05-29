import mongoose, { Model, Document } from "mongoose";

export interface Block extends Document {
  type: string;
  content: string;
  order: number;
}

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

type BlockModelType = Model<Block>;

export const BlockModel: BlockModelType = mongoose.models.Block || mongoose.model("Block", blockSchema);