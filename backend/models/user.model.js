import mongoose from "mongoose";
import crypto from "crypto"; 

const UserSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique: true,
    trim: true, 
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  api_key: {
    type: String,
    unique: true, 
    default: () => crypto.randomBytes(32).toString("hex"),
  },
  firstName: { 
    type: String, 
    required: true,
    trim: true,
  },
  lastName: { 
    type: String, 
    required: true,
    trim: true,
  },
  company: { 
    type: String,
    trim: true,
  },
  city: { 
    type: String,
    trim: true,
  },
  country: { 
    type: String,
    trim: true,
  },
  phone1: { 
    type: String, 
    required: true,
    trim: true,
  },
  phone2: { 
    type: String,
    trim: true,
  },
  subscriptionDate: { 
    type: Date, 
    default: Date.now,
  },
  website: { 
    type: String,
    trim: true,
  },
});

const UserModel = mongoose.model("User", UserSchema);
export default UserModel;
