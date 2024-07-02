import { UserRole } from "../models/userModel";
import { getSessionServer } from "./getServerSession";

export async function isAdmin() {
  const session = await getSessionServer();
  if (session?.user?.role === UserRole.ADMIN)
    return true;
  else 
    return false
}