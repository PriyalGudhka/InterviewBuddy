import NewUser from "../models/userDetails.js";

// This method is used for adding a new user
export const save = async (newUser) => {
  // const existingUser = newUser.email;

  // /* Change logic to check if user already exists */
  // const isUserExisting = NewUser.findOne({ existingUser });
  // if (isUserExisting) {
  //         return null;
  // }

  // else {
  const newUserDetails = new NewUser(newUser);
  return newUserDetails.save();
  //   }
};


// This method is used for removing a to-do item from the list
export const deleteUserAccount = async (id) => {
  console.log("In Delete Account service method!");

  const deletedUserAccount = NewUser.findByIdAndRemove(id).exec(); //Used findByIdAndRemove method by passing the id to remove a particular to-do item

  return deletedUserAccount;
}