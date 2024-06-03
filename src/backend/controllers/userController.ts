import mongoose from "mongoose";
import { UserModel, UserRole } from "../models/userModel";

export async function createUser(email: any, password: any): Promise<void> {
  try {
    let user = await new UserModel({ 
      email: email,
      password: password,
      role: UserRole.NORMAL, 
    });
    user.save();
  } catch (error) {
    console.log(error);
  }
}

export async function signIn(
  email: string,
  password: string
): Promise<boolean> {
  try {
    const user = await UserModel.findOne({ email });
    if (password === (user?.password as string)) {
      return true;
    } else return false;
  } catch (error) {
    console.log(error);
    return false;
  }
}
