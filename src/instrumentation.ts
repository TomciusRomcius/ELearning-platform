import mongoose, { ConnectOptions } from "mongoose";
import { connectToDb } from "./backend/utils/connectToDb";

export async function register() {
  await connectToDb();
}