"use server"

import { authOptions } from "../api/auth/authOptions"
import { getServerSession } from "next-auth";
import { SidebarLayout } from "./_layouts/SidebarLayout";
import CoursesTab from "./_tabs/CoursesTab";


export default async function AdminPage() {
  return (
    <div className="w-screen h-screen flex">
      <SidebarLayout>
        <>
          <button>KPIs</button>
          <button>Courses</button>
        </>
      </SidebarLayout>
      <CoursesTab/>
    </div>
  )
}