import axios from "axios";

export const createPost = async (text, images, registers) => {
  try {
    console.log(images);
    const { data } = await axios.post("http://localhost:5050/post/createPost", {
      text,
      images,
      registers,
      // token,
    });
    // console.log("Post Created: " + data);
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};

export const reactPost = async (postId, react) => {
  try {
    const { data } = await axios.put("http://localhost:5050/reactPost", {
      postId,
      react,
      userId: localStorage.getItem("userId"),
    });
    return "ok";
  } catch (error) {
    return error.response.data.message;
  }
};
export const getReacts = async (postId) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5050/getReacts/${postId}/${localStorage.getItem(
        "userId"
      )}`
    );
    return data;
  } catch (error) {
    return error.response.data.message;
  }
};
