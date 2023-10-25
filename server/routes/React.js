import express from "express";
import { reactPost, getReacts } from "../controllers/react.js";

const route = express.Router();
route.put("/reactPost", reactPost);
route.get("/getReacts/:id/:userId", getReacts);

export default route;
