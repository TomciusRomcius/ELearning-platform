"use client"
import { SessionProvider } from "next-auth/react";
import NewCourse from "./NewCourse";

export default function Page() {
  return (
    <SessionProvider>
      <NewCourse/>
    </SessionProvider>
  )
}