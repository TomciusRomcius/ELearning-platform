import { useEffect, useRef, useState } from "react";
import { ModuleType } from "../../../../utils/types";
import LessonButton from "./AdminLessonButton";
import NewLessonButton from "./AdminNewLessonButton";
import Image from "next/image";
import Popup from "@/frontend/ui/FixedPopup";
import CourseEditorManager from "@/frontend/services/courseEditorManager";
import ModuleName from "./AdminModuleName";
import PopupToggleArea from "./PopupToggleArea";

type ModuleProps = {
  courseId: string;
  module: ModuleType;
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
};

export function AdminModule(props: ModuleProps) {
  let [popupVisible, setPopupVisible] = useState(false);
  let [isRenaming, setIsRenaming] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);

  const onTogglePopup = (e?: MouseEvent) => {
    if (e) e.stopPropagation();
    setPopupVisible(!popupVisible);
  };

  const onToggleRename = () => {
    setIsRenaming(!isRenaming);
  };

  const onDelete = () => {
    CourseEditorManager.deleteModule(props.module._id || "");
  };

  return (
    <div className="flex flex-col gap-4 relative">
      <PopupToggleArea popupRef={popupRef} isPopupVisible={popupVisible}>
        <div className="flex gap-2">
          {/* Popup */}
          <Popup
            ref={popupRef}
            onClose={onTogglePopup}
            isVisible={popupVisible}
            isFixed={true}
          >
            <div className="text-text-grayed flex flex-col gap-2 items-start p-4 bg-primary-200 border-2 border-border shadow-lg rounded-lg">
              <button onClick={onDelete}>Delete</button>
              <button onClick={onToggleRename}>Rename</button>
            </div>
          </Popup>
          <ModuleName
            module={props.module}
            isRenaming={isRenaming}
            setIsRenaming={setIsRenaming}
          />
          <button onClick={onTogglePopup}>
            <Image src="/moreHorizontal.svg" width={24} height={24} alt="" />
          </button>
        </div>
      </PopupToggleArea>
      <div className="flex flex-col gap-4 pl-4">
        {/* Display lessons */}
        {props.module.lessons.map((lesson) => (
          <LessonButton
            key={lesson._id}
            courseId={props.courseId}
            setCurrentLesson={props.setCurrentLesson}
            moduleId={props.module._id}
            lesson={lesson}
          />
        ))}
        {/* Create new lesson */}
      </div>
      <NewLessonButton courseId={props.courseId} moduleId={props.module._id} />
    </div>
  );
}
