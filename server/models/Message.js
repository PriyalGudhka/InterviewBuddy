import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const MessageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: String,
    },
    sender: {
      type: String,
    },
    text: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Message", MessageSchema);

export default model;
