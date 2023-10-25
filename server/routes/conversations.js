import express from "express";
import Conversation from "../models/Conversation.js";

const route = express.Router();

//new convo
route.post("/convo", async (req, res) => {
  const newConversation = new Conversation({
  
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    console.log("Sender Id: "+req.body.senderId);
    console.log("Receiver Id: "+req.body.receiverId);


    const savedConversation = newConversation.save();
    console.log("saved convo backend: "+newConversation._id);
    // res.status(200).json(savedConversation);
    res.status(200).json(newConversation._id);

  } catch (error) {
    res.status(500).json(error);
  }
});

//get convo for a user
route.get("/convo/:id", async (req, res) => {
  try {
    console.log("Inside backend get method");
    const conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    console.log("conversation="+conversation);
    res.status(200).json(conversation);
  } catch (error) {
    res.status(500).json(error);
  }
});

export default route;
