import express from "express";
import Message from "../models/Message.js";

const route = express.Router();

//add

route.post("/messages", async (req, res) => {
  const newMessage = new Message(req.body);

  try {
    console.log("hi");
    const savedMessage = await newMessage.save();
    res.status(200).json(savedMessage);
    console.log(savedMessage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//get
route.get("/allMessages/:conversationId", async (req, res) => {
  try {
    const messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    console.log("messagessssssss:="+messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default route;
