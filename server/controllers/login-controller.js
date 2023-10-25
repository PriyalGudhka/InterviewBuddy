import * as loginService from "./../services/login-service.js";
import * as profileService from "./../services/create-profile.js";
import jwt from "jsonwebtoken";
import NewUser from "../models/userDetails.js";
import bcrypt from "bcrypt";

const JWD_SECRET = "snkdjksw8ufjkdamk232442342sa//";

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

//This method is used for add a new user using "POST" method
export const post = async (req, res) => {
  try {
    const newUser = req.body;

    // Calls the save method present in login-service.js file for adding a new user
    const newUserDetails = await loginService.save(newUser);
    setResponse(newUserDetails, res);
  } catch (error) {
    setError(error, res);
  }
};

//This function is used to get email and password from created user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //Model finds email from created user
  const user = await NewUser.findOne({ email });
  console.log("user: "+user);
  //if user has entered wrong data
  if (!user) {
    return res.json("User not found");
  }
  //To decrypt the password
  if (await bcrypt.compare(password, user.password)) {
    const passwordToken = jwt.sign({}, JWD_SECRET);
    //If user has successfully logged in
    if (res.status(201)) {
      console.log(user);
      return res.json({ status: "ok", data: passwordToken, user });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid password" });
};

export const createProfile = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const newProfile = await NewUser.findOneAndUpdate(
      { _id: userID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    // setResponse(newProfileDetails, res);
    setResponse(newProfile, res);
  } catch (error) {
    setError(error, res);
  }
};

export const fetchSingleUser = async (req, res) => {
  try {
    console.log(req.params.id);
    const user = await NewUser.findById(req.params.id);
    console.log(user);
    return res.json(user);
  } catch (error) {
    console.log(error);
    res.json(error);
  }
};

export const updateUserProfile = async (req, res) => {
  try {
    const { id: userID } = req.params;
    const newProfile = await NewUser.findOneAndUpdate(
      { _id: userID },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!newProfile) {
      return res.status(404).json({ msg: `No profile with id : ${userID}` });
    }
    res.status(200).json({ newProfile, msg: "Profile Updated Successfully!" });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

export const searchByTargetRole = async (req, res) => {
  try {
    console.log("In serach by target role controller method");
    //  const targetRole = req.query.target_role;
    const targetRole = req.params.target_role;

    // const description = req.query.description;
    const query = {};

    //Assigns title to the query variable
    if (targetRole) query.target_role = targetRole;

    console.log(
      "In serach by target role controller method 1: " + req.params.target_role
    );

    //Calls the search method present in todo-service.js file for fetching all the items
    const searctToDo = await profileService.searchProfileMatch(query);
    console.log("In serach by target role controller method 2: " + searctToDo);

    setResponse(searctToDo, res);
  } catch (error) {
    //In case of an invalid response, error message is displayed
    setError(error, res);
  }
};

//This method is used for deleting a user account using "DELETE" method
export const deleteUserAccount = async (req, res) => {

  try {
    console.log("In Delete Account controller method!");
      const id = req.params.id;

      //Calls the remove method present in todo-service.js file for deleting a to-do item based on the id passed
      const deletedUserAccount = await loginService.deleteUserAccount(id);

      setResponse({ message: `Successfully deleted a user account with Id: ${id}` }, res);
  }

  catch (error) {
      setError(error, res);
  }
}
