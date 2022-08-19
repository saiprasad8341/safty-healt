import express from "express";
const app = express();

// path
import path from "path";

import dotenv from "dotenv";
dotenv.config();

import dbConfig from "./config/dbConfig.js";
// to converting the json formate
app.use(express.json());
// routes
import userRoute from "./routes/userRoute.js";
import adminRoute from "./routes/adminRoute.js";
import doctorsRoute from "./routes/doctorsRoute.js";

app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/doctor", doctorsRoute);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await dbConfig(process.env.MONGO_URL);
    app.listen(port, () => console.log(`server is listing at : ${port}`));
  } catch (error) {
    console.log(error);
  }
};

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build/index.html"));
  });
}
app.get("/", (req, res) => res.send("Hello World..!"));
start();
