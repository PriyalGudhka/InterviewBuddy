import { request } from "express";
 import NewProfile from "../models/userDetails.js";

// This method is used for adding a new user
export const saveProfileDetails = async (newPofile) => {
  // const existingUser = newUser.email;

  // /* Change logic to check if user already exists */
  // const isUserExisting = NewUser.findOne({ existingUser });
  // if (isUserExisting) {
  //         return null;
  // }

  // else {

    const params = { ...query };
    console.log("In service search profile method: "+params.target_role);
    const findProfile = NewProfile.find({target_role: query.target_role}).exec(); //Used find method by passing the parameters to search the to-do items
  console.log("todos: "+findProfile)

const createProfile = await NewProfile.findOneAndUpdate(
{_id: params._id},
{ "$set": { "target_role": params.target_role, "target_company": params.target_company, "github_profile": params.github_profile, "linkedin_profile": params.linkedin_profile,"resume":params.resume}}

);

    return findProfile;




  const newProfileDetails = new NewProfile(newPofile);
  console.log("In save profile details");

  return newProfileDetails.save();
  //   }
};


export const searchProfileMatch = async (query) => {
  const params = { ...query };
  console.log("In service search profile method: "+params.target_role);
  const todos = NewProfile.find({target_role: query.target_role}).exec(); //Used find method by passing the parameters to search the to-do items
console.log("todos: "+todos)
  return todos;
}