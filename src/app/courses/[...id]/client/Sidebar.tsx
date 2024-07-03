"use client"

import { useDataDetails } from "./utils/useDataDetails";
import { Module } from "./Module";

export default function Sidebar() {
  const { course } = useDataDetails();

  return (
    <nav className="w-1/6 h-screen overflow-y-auto bg-foreground py-4 px-8 flex flex-col gap-4 border-r-1 border-primary-300">
    <h2 className="text-text-light text-xl font-bold text-center">{course.title}</h2>
    {course.modules.map((module) => (
      <Module module={module}/>
    ))}
  </nav>
  )
}