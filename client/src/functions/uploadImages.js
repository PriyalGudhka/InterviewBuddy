import axios from "axios";

export const uploadImages = async (formData, path) => {
  try {
    console.log("hi");
    const { data } = await axios.post(
      "http://localhost:5050/uploadImages",
      formData,

      {
        headers: {
          // Authorization: `Bearer ${token}`,
          "content-type": "multipart/form-data",
        },
      }
    );

    return data;
  } catch (error) {
    // return error.response.data.message;
  }
};
