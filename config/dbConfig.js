import mongoose from "mongoose";

const dbConfig = (url) => {
  return mongoose.connect(url);
};

export default dbConfig;
