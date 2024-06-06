"use server"

import NewCourse from "./NewCourse";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession();
  if (!session) {
    return <h1>Not allowed</h1>
  }

  return (
    <NewCourse/>
  )
}