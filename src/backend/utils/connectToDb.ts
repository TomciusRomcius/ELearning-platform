import mongoose from "mongoose";

export async function connectToDb() {
  const uri = "mongodb://mongo:27017";

  await mongoose
    .connect(uri)
    .then(() => {
      console.log("DB success");
    })
    .catch((err) => {
      console.log(err);
    });
}
