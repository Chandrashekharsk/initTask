import express from "express";
import "dotenv/config";
import connectDB from "./utils/db.js";
import CustomerModel from "./models/prodects.model.js";
import cors from "cors";



const app = express();
const port = process.env.PORT || 8000;
connectDB();
app.use(express.json());
const corsOptions = {
  origin: "http://localhost:5173",
}
app.use(cors(corsOptions));

app.get("/", (req, res)=>{
  console.log("hello");
  res.status(200).json({message: "hello"})
})


app.post("/customers", async (req, res) => {
  try {
    const{firstName, lastName, company, city, country, email, phone1, phone2, subscriptionDate, website} = req.body;
    const newCustomer = await CustomerModel.create({
      lastName, 
      firstName,
      city,
      company,
      country,
      email,
      phone1,
      phone2,
      email, 
      website,
      subscriptionDate,
    })
    res.status(201).json(newCustomer);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error message
  }
});
app.get("/customers", async (req, res) => {
  try {
    const customers = await CustomerModel.find().sort({ createdAt: -1 }); 
    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message }); // Send error message
  }
});

app.listen(port, ()=>{
  console.log("server is running on port:", port)
})