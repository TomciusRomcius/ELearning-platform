"use server"

import { authOptions } from "../api/auth/authOptions"
import { getServerSession } from "next-auth";
import { SidebarLayout } from "./_layouts/SidebarLayout";
import CoursesTab from "./courses/page";
import Link from "next/link";


export default async function AdminPage() {
  return (
    <div className="w-full h-full flex">
      <CoursesTab/>
    </div>
  )
}