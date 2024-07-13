"use client";
import { useCourse } from "../hooks/useCourse";
import LessonContainer from "./AdminLessonContainer";
import NewModuleButton from "./AdminNewModuleButton";
import { AdminModule } from "./AdminModule";
import MainHeader from "@/frontend/ui/MainHeader/MainHeader";

export default function AdminPage() {
  let { setCurrentLesson, course, lesson } = useCourse();
  if (!course) return <h1>Loading...</h1>;

  return (
    <div className="w-sceren h-screen flex flex-col">
      <MainHeader />
      <div className="flex flex-row w-full flex-1 overflow-hidden">
        <nav className="bg-foreground p-4 flex flex-col gap-4 border-r-1 border-primary-300 w-1/6 h-full overflow-y-auto">
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
    </div>
  );
}
