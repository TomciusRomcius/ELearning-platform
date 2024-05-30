"use client";
import { useCourse } from "./hooks/useCourse";
import LessonContainer from "./ui/LessonContainer";
import { Module } from "./ui/Module";
import NewModuleButton from "./ui/NewModuleButton";

export default function Page() {
  let { setCurrentLesson, course, lesson } = useCourse();
  if (!course) return <h1>Loading...</h1>;
  
  return (
    <div className="flex flex-row w-screen h-screen">
      <nav className="bg-foreground p-4 flex flex-col gap-4 border-r-2 border-primary-300 w-1/6 h-screen">
        <h2 className="text-text-light text-4xl font-medium text-center">{course.title}</h2>
        {course.modules.map((module) => (
          <Module
            key={module._id}
            courseId={course._id}
            setCurrentLesson={setCurrentLesson}
            module={module}
          />
        ))}
        <NewModuleButton courseId={course._id} />
      </nav>
      {lesson ? (
        <LessonContainer courseId={course._id} moduleId={lesson.moduleId} currentLesson={lesson} />
      ) : null}
    </div>
  );
}
