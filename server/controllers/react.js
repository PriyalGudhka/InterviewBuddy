import React from "../models/React.js";
import mongoose from "mongoose";
export const reactPost = async (req, res) => {
  try {
    const { postId, react, userId } = req.body;

    const check = await React.findOne({
      postRef: postId,
      reactBy: mongoose.Types.ObjectId(userId),
    });
    if (check == null) {
      const newReact = new React({
        react: react,
        postRef: postId,
        reactBy: userId,
      });
      await newReact.save();
    } else {
      if (check.react == react) {
        await React.findByIdAndRemove(check._id);
      } else {
        await React.findByIdAndUpdate(check._id, {
          react: react,
        });
      }
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReacts = async (req, res) => {
  try {
    const reactsArray = await React.find({ postRef: req.params.id });

    /*
    const check1 = reacts.find(
      (x) => x.reactBy.toString() == req.user.id
    )?.react;
    */
    const newReacts = reactsArray.reduce((group, react) => {
      let key = react["react"];
      group[key] = group[key] || [];
      group[key].push(react);
      return group;
    }, {});
    // console.log(newReacts);

    const reacts = [
      {
        react: "like",
        count: newReacts.like ? newReacts.like.length : 0,
      },
      {
        react: "love",
        count: newReacts.love ? newReacts.love.length : 0,
      },
      {
        react: "haha",
        count: newReacts.haha ? newReacts.haha.length : 0,
      },
      {
        react: "sad",
        count: newReacts.sad ? newReacts.sad.length : 0,
      },
      {
        react: "wow",
        count: newReacts.wow ? newReacts.wow.length : 0,
      },
      {
        react: "angry",
        count: newReacts.angry ? newReacts.angry.length : 0,
      },
    ];

    // const check1 = reacts.find(
    //       (x) => x.reactBy.toString() == req.userId
    //     )?.react;
    //     console.log(check1);
    const check = await React.findOne({
      postRef: req.params.id,
      reactBy: req.params.userId,
    });
    res.json({
      reacts,
      check: check?.react,
      total: reactsArray.length,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
