import path from "path";
import multer from "multer";

const multerStorage = multer.diskStorage({
  destination: "images",
  filename: (req, file, cb) => {
    const extension = file.mimetype.split("/")[1];
    const currentTime = new Date();
    cb(
      null,
      `inifoto-${file.fieldname}-${currentTime.getSeconds()}.${extension}`
    );
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.split("/")[0] == "image") {
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!" + file.mimetype.split("/")[0]), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

export default upload;
