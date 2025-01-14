import mongoose from "mongoose";
import "dotenv/config";

const connectDB = async()=>{
  try {
    await mongoose.connect(process.env.MongoURI)
    .then(()=> console.log("Database Connected"));
  } catch (error) {
    console.log("Couldn't connect to Database");
    console.log(error);
  }
}

export default connectDB;