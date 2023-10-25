import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema(
  {
    // type: {
    //   type: String,
    //   enum: ["profilePicture", "cover", null],
    //   default: null,
    // },
    text: {
      type: String,
    },
    images: {
      type: Array,
    },
    registers: {
      type: ObjectId,
      ref: "registers",
      required: true,
    },
    // background: {
    //   type: String,
    // },
    comments: [
      {
        comment: {
          type: String,
        },
        image: {
          type: String,
        },
        commentBy: {
          type: ObjectId,
          ref: "newUserDetails",
        },
        commentAt: {
          type: Date,
          default: new Date(),
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const model = mongoose.model("post", postSchema);

export default model;
