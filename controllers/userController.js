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
      photo: req.file.path.replace(/\\/g, "/").split("/").slice(-1)[0],
    },
    async function (err, user) {
      if (err) return res.send(err);
      const result = await cloudinary.uploader.upload(req.file.path, {
        public_id:
          "recipes/" +
          req.file.path.replace(/\\/g, "/").split("/").slice(-1)[0],
        crop: "fill",
      });
      res.status(200).json({ data: { user, result } });
    }
  );
};

export const deleteUser = (req, res) => {
  const username = req.body.username;
  if (!username) return res.send("ngapain bang !");

  User.findOne({ username: username }, async function (err, user) {
    if (!user) return res.send("user tidak ditemukan");

    cloudinary.uploader.destroy("recipes/" + user.photo, function (err, cb) {
      if (cb.result === "not found")
        return res.json("image cloudinary belum terhapus");
      User.deleteOne(
        {
          id: user._id,
        },
        (err, cb) => {
          if (err) return res.json({ message: "Data belum dihapus" });
          return res.json({ message: "Data berhasil dihapus" });
        }
      );
    });
  });
};

export const editUser = (req, res) => {
  const userId = req.params.userId;
  const photoPath = req.file.path.replace(/\\/g, "/").split("/").slice(-1)[0];
  const username = req.body.username;

  if (!username) return res.send("ngapain bang !");

  User.findOne({ _id: userId }, async function (err, user) {
    if (!user) return res.send("user tidak ditemukan");

    if (req.file) {
      cloudinary.uploader.destroy(
        "recipes/" + user.photo,
        async function (err, cb) {
          if (cb.result === "not found")
            return res.json("image cloudinary belum terhapus");
          cloudinary.uploader.upload(
            req.file.path,
            {
              public_id: "recipes/" + photoPath,
              crop: "fill",
            },
            function () {
              User.findByIdAndUpdate(
                user._id,
                {
                  username: username,
                  photo: photoPath,
                },
                function () {
                  res.status(200).json({ message: "Data sudaha diupdate" });
                }
              );
            }
          );
        }
      );
    }
  });
};
