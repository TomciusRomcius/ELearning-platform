import { useRef, useState } from "react";
import { LessonType, ModuleType } from "../utils/types";
import LessonButton from "./LessonButton";
import NewLessonButton from "./NewLessonButton";
import Image from "next/image";
import Popup from "@/frontend/ui/Popup";
import CourseEditorManager from "@/frontend/services/courseEditorManager";

type ModuleProps = {
  courseId: string;
  module: ModuleType;
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
};

export function Module(props: ModuleProps) {
  let [popupVisible, setPopupVisible] = useState(false);
  let [isRenaming, setIsRenaming] = useState(false);
  let nameRef = useRef<HTMLInputElement>(null);

  const onTogglePopup = () => {
    setPopupVisible(!popupVisible);
  }

  const onToggleRename = () => {
    setIsRenaming(!isRenaming);
  }

  const onRename = () => {
    let newName = nameRef.current?.value;
    if (!newName) return;
    let newModule = structuredClone(props.module);
    newModule.title = newName;
    CourseEditorManager.updateModule(newModule);
    setIsRenaming(false);
  }

  const onDelete = () => {
    CourseEditorManager.deleteModule(props.module._id || "");
  }

  return (
    <div className="flex flex-col gap-4 relative">
      {popupVisible ? (
        <Popup onClose={onTogglePopup} isFixed={false}>
          <div className="text-text-grayed flex flex-col gap-2 items-start p-4 bg-primary-200 border-2 border-border shadow-lg rounded-lg">
            <button onClick={onDelete}>Delete</button>
            <button onClick={onToggleRename}>Rename</button>
          </div>
        </Popup>
      ) : null}
      <div className="flex gap-2">
        {!isRenaming ? (
          <h1 className="text-text-light text-2xl">
            Module: {props.module.title}
          </h1>
        ) : (
          <div className="flex gap-2">
            <input ref={nameRef} defaultValue={props.module.title} />
            <button onClick={onRename}>Submit</button>
          </div>
        )}
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
