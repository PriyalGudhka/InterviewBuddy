import express from "express";
import cors from "cors";
import Routes from "./routes/Routes.js";
import upload from "./routes/upload.js";
import chatRoute from "./routes/chatRoute.js";
import Connection from "./database/database.js";
import fileUpload from "express-fileupload";
import dotenv from "dotenv";
// import { post } from "./controllers/login-controller.js";
import post from "./routes/post.js";
import React from "./routes/React.js";
import conversations from "./routes/conversations.js";
import messages from "./routes/messages.js";

const app = express();
app.use(cors());
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(
  fileUpload({
    useTempFiles: true,
  })
);

dotenv.config();

app.use("/api", Routes);
app.use("/chat", chatRoute);
app.use("/", upload);
app.use("/post", post);
app.use("/", React);
app.use("/", conversations);
app.use("/", messages);

Connection();
const Port = 5050;

app.listen(Port, () => {
  console.log(`Server started on port: ${Port}`);
});
