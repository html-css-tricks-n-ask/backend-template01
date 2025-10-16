import dotenv from "dotenv";
dotenv.config(); // ✅ must come first

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import session from "express-session";
import passport from "./middleware/googleAuth.js";
import userRoutes from "./routes/userRoute.js";
import todoRoutes from "./routes/todoRoute.js";
import googleAuthRoutes from "./routes/googleAuthRoute.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(session({
  secret: "your_secret",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));


  console.log(process.env.MONGO_URI , "process.env.MONGO_URI")

app.use("/", userRoutes);
app.use("/todos", todoRoutes);
app.use("/auth", googleAuthRoutes);

app.get("/", (req, res) => res.send("API is running..."));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
