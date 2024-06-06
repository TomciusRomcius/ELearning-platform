"use client";

import { useEffect, useState } from "react";
import { ClientLessonType, CourseType, LessonType } from "@/utils/types";
import { useRouter } from "next/navigation";
import { DataDetailsContext } from "./utils/dataDetailsContext";
import Sidebar from "./Sidebar";
import AdminPage from "../admin/AdminPage";
import LessonContainer from "./LessonContainer";

type ClientPageProps = {
  course: CourseType<ClientLessonType>;
  completedLessonIds: string[];
};

export default function ClientPage(props: ClientPageProps) {
  const [currentLesson, setCurrentLesson] = useState(
    {
      lessonId: props.course.modules[0]?.lessons[0]._id,
      moduleId: props.course.modules[0]._id,
    }
  );
  const [course, setCourse] = useState(props.course);
  
  return (
    <div className="w-screen h-screen flex flex-row">
      <DataDetailsContext.Provider
        value={{
          course: course,
          currentLesson: currentLesson,
          setCurrentLesson: setCurrentLesson,
          setCourse: setCourse,
        }}
      >
        <Sidebar />
        <LessonContainer/>
      </DataDetailsContext.Provider>
    </div>
  );
}
