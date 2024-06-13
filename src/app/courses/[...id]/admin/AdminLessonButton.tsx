import Popup from "@/frontend/ui/Popup";
import Image from "next/image";
import { LessonType } from "../../../../utils/types";
import { useState } from "react";
import CourseEditorManager from "@/frontend/services/courseEditorManager";

type LessonButtonProps = {
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
  lesson: LessonType;
  moduleId: string;
  courseId: string;
};

export default function LessonButton(props: LessonButtonProps) {
  let [popupVisible, setPopupVisible] = useState(false);
  let [threeDotsVisible, setThreeDotsVisible] = useState(false);

  const onLessonSelect = () => {
    props.setCurrentLesson(props.moduleId, props.lesson._id);
  };

  const onContextMenu = (e) => {
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
    <div className="relative">
      {popupVisible ? (
        <Popup isFixed={false} onClose={onClosePopup}>
          <div className="text-text-grayed flex flex-col gap-2 items-start p-4 bg-primary-200 border-2 border-border shadow-lg rounded-lg">
            <button onClick={onDelete}>Delete</button>
          </div>
        </Popup>
      ) : null}
      <button
        className="flex justify-between w-full text-start text-base text-gray-600"
        onContextMenu={onContextMenu}
        onClick={onLessonSelect}
        onMouseOver={onFocus}
        onMouseOut={onBlur}
      >
        {props.lesson.title}
        {threeDotsVisible ? (
          <button>
            <Image src="/moreHorizontal.svg" width={24} height={24} alt="" />
          </button>
        ) : null}
      </button>
    </div>
  );
}
