"use server"

import { authOptions } from "../api/auth/authOptions"
import { getServerSession } from "next-auth";
import AdminPage from "./AdminPage";


export default async function Page() {
  const session = await getServerSession(authOptions);
  if (!session.user) return <h1>Not allowed</h1>;

  return <AdminPage/>
}