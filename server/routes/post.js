import express from "express";
import { createPost, getAllPosts, comment } from "../controllers/post.js";
// const { authUser } = require("../middleware/authuser.js");

const route = express.Router();

route.post("/createPost", createPost);
route.get("/getAllPosts", getAllPosts);
route.put("/comment", comment);

export default route;
