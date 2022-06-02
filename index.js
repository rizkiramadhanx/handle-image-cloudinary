import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/dbConnect.js";
import User from "./model/User.js";
import bodyParser from "body-parser";
connectDB();

const app = express();
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  res.send("Hello World 🌏🌏🌏");
});

app.listen(
  process.env.PORT,
  console.log(`app is running on port ${process.env.PORT}`)
);

const test = async (req, res) => {
  User.create({ username: "oji", photo: "anjay" });
};

test();
