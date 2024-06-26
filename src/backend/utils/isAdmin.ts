import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";
import { UserRole } from "../models/userModel";

export async function isAdmin() {
  const session = await getServerSession(authOptions);
  if (session?.user?.role === UserRole.ADMIN)
    return true;
  else 
    return false
}