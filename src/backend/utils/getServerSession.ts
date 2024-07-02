import { authOptions } from "@/app/api/auth/authOptions";
import { getServerSession } from "next-auth";

export async function getSessionServer() {
  const session = await getServerSession(authOptions);
  return session;
}