import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const ConversationSchema = new mongoose.Schema(
  {
    members: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("Conversation", ConversationSchema);

export default model;
