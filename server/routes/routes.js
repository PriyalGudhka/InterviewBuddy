import express from "express";
/* Imports login-controller.js for calling the different methods defined in it */
import * as loginController from "../controllers/login-controller.js";
import * as connectionController from "../controllers/connections-controller.js";
import { upload } from "../middleware/uploadFile.js";

const route = express.Router();

route.post("/registers", upload.single("resume"), loginController.post); //Adds a new user by using the POST method
route.post("/login-user", loginController.loginUser);
route.put("/create-profile/:id", loginController.createProfile);
route.put("/update-profile/:id", loginController.updateUserProfile);
route.get("/get-profile-data/:id", loginController.fetchSingleUser);
route.get("/target-role/:target_role", loginController.searchByTargetRole);
route.put("/sendconnectionRequest/:id", connectionController.sendConnectionRequest);
route.delete("/delete-account/:id", loginController.deleteUserAccount);
route.put("/acceptConnectionRequest/:id", connectionController.acceptConnectionRequest);
export default route;
