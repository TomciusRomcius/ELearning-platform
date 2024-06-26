import { UserModel, UserRole } from "../models/userModel";

export async function createUser(email: any, password: any, isAdmin: boolean = false) {
  let user = await new UserModel({
    email: email,
    password: password,
    role: isAdmin ? UserRole.ADMIN : UserRole.NORMAL,
  });
  user.save();
  return user.toObject();
}

export async function signIn(email: string, password: string) {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found!");
  if (password === user.password) {
    return user.toObject();
  } 
  else return null;
}

export async function getUserByEmail(email: string) {
  const id = await UserModel.exists({ email });
  if (!id) return null;
  const user = await UserModel.findById(id);
  return user?.toObject();
}
