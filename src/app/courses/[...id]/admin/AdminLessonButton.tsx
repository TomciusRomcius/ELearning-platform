import Popup from "@/frontend/ui/FixedPopup";
import Image from "next/image";
import { LessonType } from "../../../../utils/types";
import { useRef, useState } from "react";
import CourseEditorManager from "@/frontend/services/courseEditorManager";
import PopupToggleArea from "./PopupToggleArea";

type LessonButtonProps = {
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
  lesson: LessonType;
  moduleId: string;
  courseId: string;
};

export default function LessonButton(props: LessonButtonProps) {
  let [popupVisible, setPopupVisible] = useState(false);
  let [threeDotsVisible, setThreeDotsVisible] = useState(false);
  const popupRef = useRef<HTMLInputElement>(null);

  const onLessonSelect = () => {
    props.setCurrentLesson(props.moduleId, props.lesson._id);
  };

  const onTogglePopup = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setPopupVisible(!popupVisible);
  };

  const onContextMenu = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setPopupVisible(!popupVisible);
  };

  const onClosePopup = () => setPopupVisible(false);

  const onDelete = () => {
    CourseEditorManager.deleteLesson(props.moduleId, props.lesson._id);
  };

  const onFocus = () => {
    setThreeDotsVisible(true);
  };

  const onBlur = () => {
    setThreeDotsVisible(false);
  };

  return (
    <PopupToggleArea popupRef={popupRef} isPopupVisible={popupVisible}>
      <Popup
        isVisible={popupVisible}
        ref={popupRef}
        isFixed={true}
        onClose={onClosePopup}
      >
        <div className="text-text-grayed flex flex-col gap-2 items-start p-4 bg-primary-200 border-2 border-border shadow-lg rounded-lg">
          <button onClick={onDelete}>Delete</button>
        </div>
      </Popup>

      <button
        className="flex justify-between w-full text-start text-base text-gray-600"
        onContextMenu={onContextMenu}
        onClick={onLessonSelect}
        onMouseOver={onFocus}
        onMouseOut={onBlur}
      >
        {props.lesson.title}
        {threeDotsVisible ? (
          <button onClick={onTogglePopup}>
            <Image onClick={onTogglePopup} src="/moreHorizontal.svg" width={24} height={24} alt="" />
          </button>
        ) : null}
      </button>
    </PopupToggleArea>
  );
}
