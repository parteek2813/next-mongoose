import mongoose from "mongoose";

export async function connect() {
  try {
    mongoose.connect("mongodb://127.0.0.1/nextMongo");
    const connection = mongoose.connection;

    connection.on("connected", () => {
      console.log("MongoDB Connected successfully");
    });

    connection.on("error", (err) => {
      console.log(
        "MongoDB connection error . Please make sure that mongoDB is running",
        err
      );
      process.exit();
    });
  } catch (error) {
    console.log("Somethign went wrong");
    console.log(error);
  }
}
