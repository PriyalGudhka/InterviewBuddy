import express from "express";
import { uploadImages } from "../controllers/upload.js";
import uploadImage from "../middleware/uploadImage.js";
// const { authUser } = require("../middleware/authuser.js");

const route = express.Router();

route.post("/uploadImages", uploadImage, uploadImages);

export default route;
