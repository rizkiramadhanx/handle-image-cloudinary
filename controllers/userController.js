import User from "../model/User.js";
import sharp from "sharp";
import path from "path";
import express from "express";
import upload from "../utils/multer.js";
import cloudinary from "../utils/cloudinary.js";

export const getAll = (req, res) => {
  User.find({}, (err, user) => {
    res.status(200).json(user);
  });
};

export const addUser = (req, res) => {
  if (!req.file || !req.body.username) return res.send("ngapain bang !");
  User.create(
    {
      username: req.body.username,
      photo: req.file.path.replace(/\\/g, "/").split("/")[1],
    },
    async function (err, user) {
      if (err) return res.send(err);
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id: `recipes/${user._id}`,
        crop: "fill",
      });
      res.status(200).json({ data: { user, result } });
    }
  );
};
