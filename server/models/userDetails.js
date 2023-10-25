/* Imports the mongoose library */
import mongoose from "mongoose";
import bcrypt from "bcrypt";

/* Sets the scehma by defining columns such as firstname, lastname, email and password */
const schema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      required: "The firstname field is required.",
    },
    lastname: {
      type: String,
      required: "The lastname field is required.", //Used for making the field as mandatory
    },
    email: {
      type: String,
      required: "The email field is required.", //Used for making the field as mandatory
      //unique: true,
    },
    password: {
      type: String,
      // required: "The password field is required.", //Used for making the field as mandatory
    },
    github_profile: {
      type: String,
    },
    linkedin_profile: {
      type: String,
    },
    target_role: {
      type: String,
      // required: "The Target Role field is required.", //Used for making the field as mandatory
    },
    target_company: {
      type: String,
      // required: "The Target Company field is required.", //Used for making the field as mandatory
    },
    resume: {
      type: String,
    },
    connections : {
      type: Array,
      default: [],
    },
    following : {
      type: Array,
      default: [],
    },
    followers : {
      type: Array,
      default: [],
    },
    requests : {
      type: Array,
      default: [],
    },
  },
  { versionKey: false }
);

schema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

const model = mongoose.model("registers", schema);

export default model;
