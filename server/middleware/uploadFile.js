import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    let ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

export const upload = multer({
  storage: storage,
  fileFilter: function (req, file, collback) {
    if (file.mimetype == "resume/pdf" || file.mimetype == "resume/doc") {
      callback(null, true);
    } else {
      console.log("Only pdf and doc files are supported");
      callback(null, false);
    }
  },
});

//module.exports  = upload;
