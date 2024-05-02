import mongoose, { ConnectOptions } from "mongoose";

export async function register() {
  const uri = "mongodb://mongo:27017";

  await mongoose.connect(uri)
    .then(() => {
      console.log("DB success");
  
    })
    .catch((err) => {
      console.log(err);
    })
}