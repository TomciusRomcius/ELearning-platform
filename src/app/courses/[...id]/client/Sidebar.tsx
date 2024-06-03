"use client"

import { useDataDetails } from "./utils/useDataDetails";
import { Module } from "./Module";

export default function Sidebar() {
  const { course } = useDataDetails();

  return (
    <nav className="bg-foreground py-4 px-8 flex flex-col gap-4 border-r-2 border-primary-300 w-1/6 h-screen">
    <h2 className="text-text-light text-4xl font-medium text-center">{course.title}</h2>
    {course.modules.map((module) => (
      <Module module={module}/>
    ))}
  </nav>
  )
}