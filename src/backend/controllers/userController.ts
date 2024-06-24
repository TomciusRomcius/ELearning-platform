import { UserModel, UserRole } from "../models/userModel";

export async function createUser(email: any, password: any): Promise<string | null> {
  let user = await new UserModel({
    email: email,
    password: password,
    role: UserRole.NORMAL,
  });
  user.save();
  return user.id;
}

export async function signIn(email: string, password: string): Promise<string> {
  const user = await UserModel.findOne({ email });
  if (!user) throw new Error("User not found!");
  if (password === (user.password as string)) {
    return user._id.toString();
  } else return "";
}

export async function doesUserExist(email: string) {
  const user = await UserModel.exists({ email });
  if (user) return true;
  else return false;
}
