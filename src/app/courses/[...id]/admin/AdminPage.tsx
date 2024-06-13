"use client";
import { useCourse } from "../hooks/useCourse";
import LessonContainer from "./AdminLessonContainer";
import NewModuleButton from "./AdminNewModuleButton";
import { AdminModule } from "./AdminModule";

export default function AdminPage() {
  let { setCurrentLesson, course, lesson } = useCourse();
  if (!course) return <h1>Loading...</h1>;

  return (
    <div className="flex flex-row w-screen h-screen">
      <nav className="bg-foreground p-4 flex flex-col gap-4 border-r-1 border-primary-300 w-1/6 h-screen overflow-y-auto">
        <h2 className="text-text-light text-xl font-medium text-center">
          {course.title}
        </h2>
        {course.modules.map((module) => (
          <AdminModule
            key={module._id}
            courseId={course._id}
            setCurrentLesson={setCurrentLesson}
            module={module}
          />
        ))}
        <NewModuleButton courseId={course._id} />
      </nav>
      {lesson ? (
        <LessonContainer
          courseId={course._id}
          moduleId={lesson.moduleId}
          currentLesson={lesson}
        />
      ) : null}
    </div>
  );
}
