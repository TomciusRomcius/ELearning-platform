"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CourseType, CurrentLessonType, LessonType } from "../utils/types";
import CourseEditorManager from "@/services/courseEditorManager";

export function useCourse() {
  let [course, setCourse] = useState<CourseType | null>(null);
  let [currentLessonId, setCurrentLessonId] = useState<string>("");
  let currentModuleId = useRef<string | null>("");
  const params = useParams();

  const getLesson = (): CurrentLessonType | null => {
    if (!currentLessonId) return null;
    const module = course?.modules.find(
      (element) => element._id === currentModuleId.current
    );
    const lesson = module?.lessons.find(
      (element) => element._id === currentLessonId
    );
    if (lesson && module) {
      const castedLesson = lesson as CurrentLessonType;
      castedLesson.moduleId = module._id;
      return castedLesson;
    }
    return null;
  };

  const setCurrentLesson = (moduleId: string, lessonId: string) => {
    setCurrentLessonId(lessonId);
    currentModuleId.current = moduleId;
  };

  let lesson: CurrentLessonType | null = getLesson();

  // Note we must currently use structured clone to change the reference of the course object
  // to allow it to update. It's not ideal.
  useEffect(() => {
    CourseEditorManager.fetchCourse(params.id as string)
      .then(() => {
        if (!CourseEditorManager.currentCourse) return;
        setCourse(structuredClone(CourseEditorManager.currentCourse));
      })

    CourseEditorManager.subscribers.push(() => {
      if (!CourseEditorManager.currentCourse) return;
      setCourse(structuredClone(CourseEditorManager.currentCourse));
    });

    // setCurrentLessonId(course?.modules[0].lessons[0]._id);
    // currentModuleId.current = course?.modules[0]._id;
  }, []);

  console.log(course);
  return { setCurrentLesson, course, lesson };
}
