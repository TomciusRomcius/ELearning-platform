"use client";

import { useDataDetails } from "./utils/useDataDetails";
import { Module } from "./Module";
import SidebarLayout from "../layouts/SidebarLayout";
import ResponsiveSidebarLayout from "@/frontend/layouts/ResponsiveSidebarLayout";

export default function Sidebar() {
  const { course } = useDataDetails();

  return (
    <ResponsiveSidebarLayout>
      <SidebarLayout>
        <h2 className="text-text-light text-xl font-bold text-center">
          {course.title}
        </h2>
        {course.modules.map((module) => (
          <Module module={module} />
        ))}
      </SidebarLayout>
    </ResponsiveSidebarLayout>
  );
}
