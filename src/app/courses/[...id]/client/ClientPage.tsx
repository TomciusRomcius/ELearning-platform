"use client";

import { useState } from "react";
import { CourseType, LessonType } from "@/utils/types";
import { DataDetailsContext } from "./utils/dataDetailsContext";
import Sidebar from "./Sidebar";
import LessonContainer from "./LessonContainer";
import courseService from "@/frontend/services/courseService";

type ClientPageProps = {
  course: CourseType;
  completedLessonIds: Set<string>;
};

export default function ClientPage(props: ClientPageProps) {
  const [currentLesson, setCurrentLesson] = useState(
    props.course.modules[0].lessons[0]
  );

  const [completedLessonIds, setCompletedLessonIds] = useState(
    props.completedLessonIds
  );

  const toggleLessonComplete = (lessonId: string) => {
    const newState = structuredClone(completedLessonIds);
    if (newState.has(lessonId)) {
      newState.delete(lessonId);
    }
    else newState.add(lessonId);
    setCompletedLessonIds(newState);
    courseService.completeLesson(props.course._id, lessonId);
  }

  return (
    <div className="w-screen h-screen flex flex-row relative">
      <DataDetailsContext.Provider
        value={{
          course: props.course,
          currentLesson: currentLesson,
          setCurrentLesson: setCurrentLesson,
          completedLessonIds: completedLessonIds,
          toggleLessonComplete: toggleLessonComplete,
        }}
      >
        <Sidebar />
        <LessonContainer />
      </DataDetailsContext.Provider>
    </div>
  );
}
