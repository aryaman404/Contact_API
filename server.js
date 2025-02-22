import { config } from "dotenv";
import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import userRouter from "./routes/User.js";
import ContactRouter from "./routes/Contact.js";
import cors from "cors";
const app = express();
app.use(bodyParser.json());
// .env setup
config({ path: "Models/.env" });
//cors
app.use(
  cors({
    origin: true,
    methods: ["POST", "GET", "DELETE", "PUT"],
    credentials: true,
  })
);

// mongoDB Setup

mongoose
  .connect(process.env.MongoUrl, {
    dbName: "Contact_API",
  })
  .then(() => console.log("MongoDB is Connected Success"))
  .catch((error) => console.log(error));

// user Router

app.use("/api/user", userRouter);

// contact Router
app.use("/api/contact", ContactRouter);

const port = 2000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
