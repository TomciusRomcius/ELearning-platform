"use client"

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { CourseType, CurrentLessonType, LessonType } from "../utils/types";
import CourseEditorManager from "@/frontend/services/courseEditorManager";

export function useCourse() {
  let [course, setCourse] = useState<CourseType | null>(null);
  let [currentLessonId, setCurrentLessonId] = useState<string>("");
  let currentModuleId = useRef<string | null>("");
  const params = useParams();

  // Load the current lesson
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

  // Callback for setting the current lesson
  const setCurrentLesson = (moduleId: string, lessonId: string) => {
    setCurrentLessonId(lessonId);
    currentModuleId.current = moduleId;
  };

  let lesson: CurrentLessonType | null = getLesson();

  // On initialization load the course based on courseId from the URL parameters
  // Note we must currently use structured clone to change the reference of the course object
  // to allow it to update. It's not ideal.
  useEffect(() => {
    // Load the course
    CourseEditorManager.fetchCourse(params.id as string)
      .then(() => {
        if (!CourseEditorManager.currentCourse) return;
        setCourse(structuredClone(CourseEditorManager.currentCourse));
      })

    // Register the update callback
    CourseEditorManager.subscribers.push(() => {
      if (!CourseEditorManager.currentCourse) return;
      setCourse(structuredClone(CourseEditorManager.currentCourse));
    });
  }, []);

  return { setCurrentLesson, course, lesson };
}
