import * as loginService from "./../services/login-service.js";
import * as profileService from "./../services/create-profile.js";
import jwt from "jsonwebtoken";
import NewUser from "../models/userDetails.js";
import bcrypt from "bcrypt";

const connectionsParams = {
  connections: false,
  following: false,
  requestSent: false,
  requestReceived: false,
};

//Used for setting the response code to 200 in case of a valid request
const setResponse = (obj, response) => {
  response.status(200);
  response.json(obj);
};

//Used for setting the response code to 500 in case of a invalid request
const setError = (err, response) => {
  response.status(500);
  response.json(err);
};

export const sendConnectionRequest = async (req, res) => {
  try {
    console.log("Inside sendconnectionRequest method: " + req.body._id);
    console.log("Inside sendconnectionRequest method: " + req.params.id);

    const connectionsParams = {
      connections: false,
      following: false,
      requestSent: false,
      requestReceived: false,
    };
    // const { id: userID } = req.body;
    // console.log("Inside sendconnectionRequest method 3: "+userID);

    // console.log("Inside sendconnectionRequest method 4: "+req.NewUser.id);

    if (req.body._id !== req.params.id) {
      const sender = await NewUser.findById(req.body._id);
      const receiver = await NewUser.findById(req.params.id);

      console.log("Sender: " + sender);
      console.log("Receiver: " + receiver);

      if (
        !receiver.requests.includes(sender) &&
        !receiver.connections.includes(sender)
      ) {
        // await receiver.updateOne({
        //     $push: { requests: sender._id},
        //   });
        await receiver.updateOne({
          $push: { followers: sender._id },
        });
        await sender.updateOne({
          $push: { following: receiver._id },
        });
        connectionsParams.requestSent = true;
        res.json({ message: "Connection request has been sent" });
      } else {
        return res.status(400).json({ message: "Request Already Sent!!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "You can't send a request to yourself" });
    }
  } catch (error) {
    setError(error, res);
  }
};

export const cancelConnectionRequest = async (req, res) => {
  try {
    console.log("inside withdraw connection");
    if (req.body._id !== req.params.id) {
      const sender = await NewUser.findById(req.body._id);
      const receiver = await NewUser.findById(req.params.id);
      console.log(receiver.requests);
      console.log(sender._id);
      const senderId = sender._id.toString();
      console.log(
        "inside withdraw connection 1: " + receiver.requests.includes("Neha")
      );

      if (
        !receiver.requests.includes(sender._id)

        // &&
        // !receiver.connections.includes(sender)
      ) {
        console.log("inside withdraw connection 2");

        await receiver.updateOne({
          $pull: { requests: sender._id },
        });

        await sender.updateOne({
          $pull: { followers: sender._id },
        });

        await sender.updateOne({
          $pull: { following: sender._id },
        });
        connectionsParams.requestSent = false;
        res.json({ message: "Connection request has been cancelled" });
      } else {
        console.log("inside withdraw connection 3");

        return res.status(400).json({ message: "Request Already Cancelled!!" });
      }
    } else {
      return res
        .status(400)
        .json({ message: "You can't cancel a request to yourself" });
    }
  } catch (error) {
    setError(error, res);
  }
};

export const followConnection = async (req, res) => {
  try {
    if (req.body._id !== req.params.id) {
      const sender = await NewUser.findById(req.body._id);
      const receiver = await NewUser.findById(req.params.id);

      if (
        !receiver.followers.includes(sender._id) &&
        !sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $push: { followers: sender._id },
        });

        await sender.updateOne({
          $push: { following: receiver._id },
        });

        res.json({ message: "Following successfully" });
      } else {
        return res.status(400).json({ message: "Already Following!!" });
      }
    } else {
      return res.status(400).json({ message: "You can't follow yourself" });
    }
  } catch (error) {
    setError(error, res);
  }
};

export const unfollowConnection = async (req, res) => {
  try {
    if (req.body._id !== req.params.id) {
      const sender = await NewUser.findById(req.body._id);
      const receiver = await NewUser.findById(req.params.id);

      if (
        receiver.followers.includes(sender._id) &&
        sender.following.includes(receiver._id)
      ) {
        await receiver.updateOne({
          $pull: { followers: sender._id },
        });

        await sender.updateOne({
          $pull: { following: receiver._id },
        });

        res.json({ message: "Unfollowed successfully" });
      } else {
        return res.status(400).json({ message: "Already Unfollowing!!" });
      }
    } else {
      return res.status(400).json({ message: "You can't unfollow yourself" });
    }
  } catch (error) {
    setError(error, res);
  }
};

export const acceptConnectionRequest = async (req, res) => {
  try {
    if (req.body._id !== req.params.id) {
      // const receiver = await NewUser.findById(req.body._id);
      // const sender = await NewUser.findById(req.params.id);

      const sender = await NewUser.findById(req.body._id);
      const receiver = await NewUser.findById(req.params.id);

      console.log("Sender id: " + sender);
      console.log("Receiver id: " + receiver);

      for (let req of sender.requests) {
        console.log("Re: " + req._id);
        // const r = new Set(requests.map(req => {

        // if (
        //     sender.requests.includes(receiver)
        // )

        if (req._id == receiver._id.toString()) {
          console.log("in accept connection request");
          //  receiver.update({
          //     $push: { connections: sender, following: sender },
          // });

          await sender.update({
            $push: { connections: receiver._id, following: receiver._id },
          });

          await receiver.update({
            $push: { connections: sender._id, followers: sender._id },
          });

          //  sender.update({
          //     $push: { connections: receiver, followers: receiver},
          // });

          // req.update({
          //     $push: { connections: receiver, followers: receiver},
          // });

          //  sender.updateOne({
          //     $pull: { requests: sender},
          // });

          await sender.updateOne({
            $pull: { requests: receiver._id },
          });

          connectionsParams.connections = true;
          res.json({ message: "Connection Request Accepted" });
        } else {
          return res
            .status(400)
            .json({ message: "Already added to your network!!" });
        }

        // } ));
      }
    } else {
      return res
        .status(400)
        .json({
          message: "You can't accept a connection request from yourself",
        });
    }
  } catch (error) {
    setError(error, res);
  }
};

export const withdrawConnectionRequest = async (req, res) => {
  try {
    if (req.body._id !== req.params.id) {
      const sender = await NewUser.findById(req.body._id);
      const receiver = await NewUser.findById(req.params.id);

      if (
        receiver.connections.includes(sender._id) &&
        sender.connections.includes(receiver._id)
      ) {
        await receiver.update({
          $pull: {
            connections: sender._id,
            following: sender._id,
            followers: sender._id,
          },
        });

        await sender.update({
          $pull: {
            connections: receiver._id,
            following: receiver._id,
            followers: receiver._id,
          },
        });

        res.json({ message: "Connection Request Withdrawn successfully" });
      } else {
        return res.status(400).json({ message: "Not added to your network!!" });
      }
    } else {
      return res
        .status(400)
        .json({
          message: "You can't withdraw a connection request from yourself",
        });
    }
  } catch (error) {
    setError(error, res);
  }
};

export const deleteConnectionRequest = async (req, res) => {
  try {
    if (req.body._id !== req.params.id) {
      const receiver = await NewUser.findById(req.body._id);
      const sender = await NewUser.findById(req.params.id);

      if (receiver.requests.includes(sender._id)) {
        await receiver.update({
          $pull: { requests: sender._id, followers: sender._id },
        });

        await sender.update({
          $pull: { following: receiver._id },
        });

        res.json({ message: "Connection Request Deleted successfully" });
      }
    } else {
      return res
        .status(400)
        .json({
          message: "You can't delete a connection request from yourself",
        });
    }
  } catch (error) {
    setError(error, res);
  }
};
