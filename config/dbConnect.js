import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017", {
      dbName: "handle-image",
    });
    console.log("Database is connected");
  } catch (error) {
    console.log(error);
  }
};

export default connectDB;
