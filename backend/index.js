import express from "express";
import "dotenv/config";
import connectDB from "./utils/db.js";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.route.js"

const app = express();
const port = process.env.PORT || 8000;

connectDB();


app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(express.json());
const corsOptions = {
  origin: process.env.FRONTEND_URL, 
  credentials: true, 
  methods: "*",
};
app.use(cors(corsOptions));

app.use("/users", userRoutes); 
app.get("/", (req, res) => {
  res.status(200).json({ message: "Hello" });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
