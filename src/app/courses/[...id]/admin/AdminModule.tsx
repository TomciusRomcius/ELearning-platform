import { useRef, useState } from "react";
import { ModuleType } from "../../../../utils/types";
import LessonButton from "./AdminLessonButton";
import NewLessonButton from "./AdminNewLessonButton";
import Image from "next/image";
import Popup from "@/frontend/ui/FixedPopup";
import CourseEditorManager from "@/frontend/services/courseEditorManager";
import ModuleName from "./AdminModuleName";

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

  const onMouseMove = ({ clientX, clientY }) => {
    if (popupVisible) return;
    if (!popupRef.current) return;
    const rect = popupRef.current.getBoundingClientRect();
    // rect.x = clientX;
    popupRef.current.style.left = `${clientX}px`;
    popupRef.current.style.top = `${clientY}px`;
    console.log(clientX);
  }

  return (
    <div className="flex flex-col gap-4 relative">
      {/* Popup */}
        <Popup ref={popupRef} onClose={onTogglePopup} isVisible={popupVisible} isFixed={true}>
          <div className="text-text-grayed flex flex-col gap-2 items-start p-4 bg-primary-200 border-2 border-border shadow-lg rounded-lg">
            <button onClick={onDelete}>Delete</button>
            <button onClick={onToggleRename}>Rename</button>
          </div>
        </Popup>
      <div className="flex gap-2"
        onMouseMove={onMouseMove}>
        <ModuleName
          module={props.module}
          isRenaming={isRenaming}
          setIsRenaming={setIsRenaming}
        />
        <button onClick={onTogglePopup}>
          <Image src="/moreHorizontal.svg" width={24} height={24} alt="" />
        </button>
      </div>
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
        <NewLessonButton
          courseId={props.courseId}
          moduleId={props.module._id}
        />
    </div>
  );
}
