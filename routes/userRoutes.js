import express from "express";
import {
  addUser,
  deleteUser,
  editUser,
  getAll,
} from "../controllers/userController.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.route("/test").get((req, res) => {
  res.send("anjay");
});
router.route("/all").get(getAll);
router.route("/user").post([upload.single("gambar")], addUser);
router.route("/user").delete(deleteUser);
router.route("/user/:userId").put([upload.single("gambar")], editUser);

// router.delete("/user");
// router.put("/user");

export default router;
