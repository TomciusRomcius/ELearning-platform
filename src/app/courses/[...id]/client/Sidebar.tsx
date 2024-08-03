"use client";

import { useDataDetails } from "./_utils/useDataDetails";
import { Module } from "./Module";
import ResponsiveSidebarLayout from "@/frontend/layouts/ResponsiveSidebarLayout";

export default function Sidebar() {
  const { course } = useDataDetails();

  return (
    <ResponsiveSidebarLayout>
      <h2 className="text-text-light text-xl font-bold text-center">
        {course.title}
      </h2>
      {course.modules.map((module) => (
        <Module module={module} />
      ))}
    </ResponsiveSidebarLayout>
  );
}
