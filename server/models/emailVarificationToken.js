// import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// //created token for user to verify email by getting otp
// const emailVarificationTokenSchema = mongoose.Schema({
//   //token will be created by objectID
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "NewUser",
//     required: true,
//   },
//   token: {
//     type: String,
//     required: true, //token will be required
//   },
//   createdAt: {
//     type: Date,
//     expires: 3600, //token will expire after 1 hour and user will need to send req again
//     default: Date.now(),
//   },
// });

// emailVarificationTokenSchema.pre("save", async function (next) {
//   if (this.isModified("token")) {
//     this.token = await bcrypt.hash(this.token, 10);
//   }

//   next();
// });

// module.exports = mongoose.model(
//   "EmailVarificationToken",
//   emailVarificationTokenSchema
// );
