"use client";

import { useEffect, useState } from "react";
import { CourseType } from "@/utils/types";
import { useRouter } from "next/navigation";
import { DataDetailsContext } from "./utils/dataDetailsContext";
import Sidebar from "./Sidebar";
import AdminPage from "../admin/AdminPage";
import LessonContainer from "./LessonContainer";

type ClientPageProps = {
  course: CourseType;
};

export default function ClientPage(props: ClientPageProps) {
  const router = useRouter();
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(
    props.course.modules[0].lessons[0]
  );

  useEffect(() => {
    // router.push(`/lesson?v=${currentLesson._id}`);
  }, []);
  return (
    <div className="w-screen h-screen flex flex-row">
      <DataDetailsContext.Provider
        value={{
          course: props.course,
          currentLesson: currentLesson,
          setCurrentLesson: setCurrentLesson,
        }}
      >
        {!isAdmin ? (
          <>
            <Sidebar />
            <LessonContainer/>
          </>
        ) : (
          <AdminPage />
        )}
      </DataDetailsContext.Provider>
    </div>
  );
}
