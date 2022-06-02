import express from "express";

const router = express.Router();

router.get("/all");
router.post("/user");
router.delete("/user");
router.put("/user");

export default router;
