"use server"

import NewCourse from "./NewCourse";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    redirect("/auth/sign-up");
  }

  return (
    <NewCourse/>
  )
}