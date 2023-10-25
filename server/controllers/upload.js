import cloudinary from "cloudinary";
import fs from "fs";
cloudinary.config({
  cloud_name: "dr3cjlxcx",
  api_key: "764416466296688",
  api_secret: "wcW7rb8T8u2Shx_YbbN51asKP1E",
});
export const uploadImages = async (req, res) => {
  console.log("su");
  try {
    const { path } = req.body;

    let files = Object.values(req.files).flat();

    let images = [];
    for (const file of files) {
      const url = await uploadToCloudinary(file, path);

      images.push(url);
      console.log(images);
      removeTmp(file.tempFilePath);
    }
    res.json(images);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message });
  }
};

const uploadToCloudinary = async (file, path) => {
  return new Promise((resolve) => {
    cloudinary.v2.uploader.upload(
      file.tempFilePath,
      {
        folder: path,
      },
      (err, res) => {
        if (err) {
          removeTmp(file.tempFilePath);
          return res.status(400).json({ message: "Upload image failed." });
        }
        resolve({
          url: res.secure_url,
        });
      }
    );
  });
};

const removeTmp = (path) => {
  fs.unlink(path, (err) => {
    if (err) throw err;
  });
};
