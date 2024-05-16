import { useState } from "react";
import { LessonType, ModuleType } from "../utils/types";
import LessonButton from "./LessonButton";
import NewLessonButton from "./NewLessonButton";
import Image from "next/image";
import Popup from "@/ui/Popup";
import { deleteModule } from "@/services/moduleService";

type ModuleProps = {
  courseId: string;
  module: ModuleType;
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
};

export function Module(props: ModuleProps) {
  let [popupVisible, setPopupVisible] = useState(false);

  const onTogglePopup = () => {
    setPopupVisible(!popupVisible);
  }

  const onDelete = () => {
    deleteModule(props.courseId, props.module._id);
  }

  return (
    <div className="flex flex-col gap-4 relative">
      {popupVisible ? (
        <Popup onClose={onTogglePopup} isFixed={false}>
          <div className="text-text-grayed flex flex-col gap-2 items-start p-4 bg-primary-200 border-2 border-border shadow-lg rounded-lg">
            <button onClick={onDelete}>Delete</button>
          </div>
        </Popup>
      ) : null}
      <div className="flex gap-2">
        <h1 className="text-text-light text-2xl">
          Module: {props.module.moduleName}
        </h1>
        <button onClick={onTogglePopup}>
          <Image src="/moreHorizontal.svg" width={24} height={24} alt="" />
        </button>
      </div>
      {props.module.lessons.map((lesson) => (
        <LessonButton
          courseId={props.courseId}
          setCurrentLesson={props.setCurrentLesson}
          moduleId={props.module._id}
          lesson={lesson}
        />
      ))}
      <NewLessonButton courseId={props.courseId} moduleId={props.module._id} />
    </div>
  );
}
