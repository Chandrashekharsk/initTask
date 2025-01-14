import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  email: { 
    type: String, 
    required: true,
    unique:true,
  },

  firstName: { 
    type: String, 
    required: true 
  },
  lastName: { 
    type: String, 
    required: true 
  },
  company: { 
    type: String 
  },
  city: { 
    type: String 
  },
  country: { 
    type: String, 
    required: true 
  },
  phone1: { 
    type: String, 
    required: true 
  },
  phone2: { 
    type: String 
  },
  subscriptionDate: { 
    type: Date, 
    required: true
  },
  website: { 
    type: String 
  }
});

const CustomerModel = new mongoose.model("CustomerTable", CustomerSchema);
export default CustomerModel;
