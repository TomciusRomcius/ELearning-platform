"use client";
import NewLessonButton from "./ui/NewLessonButton";
import { useCourse } from "./hooks/useCourse";
import LessonContainer from "./ui/LessonContainer";

export default function Page() {
  let { course, currentLesson, setCurrentLesson } = useCourse();

  if (!course) return (
    <h1>Loading...</h1>
  )

  return (
    <div className="flex flex-row w-screen h-screen">
      <nav className="p-4 flex flex-col gap-4 border-r-2 border-gray-200 w-1/6 h-screen">
        <h2 className="text-2xl text-center">Title {course.title}</h2>
        {course.lessons.map((lesson) => {
          return (
            <button
              onClick={() => {
                setCurrentLesson(lesson);
              }}
            >
              {lesson.title}
            </button>
          );
        })}
        <NewLessonButton courseId={course._id} />
      </nav>
      <LessonContainer courseId={course._id} currentLesson={currentLesson}/>
    </div>
  );
}
