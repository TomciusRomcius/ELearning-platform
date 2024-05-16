import Popup from "@/ui/Popup";
import { LessonType } from "../utils/types";
import { useState } from "react";

type LessonButtonProps = {
  setCurrentLesson: (moduleId: string, lessonId: string) => void;
  lesson: LessonType;
  moduleId: string;
};

export default function LessonButton(props: LessonButtonProps) {
  let [popupVisible, setPopupVisible] = useState(false);

  const onLessonSelect = () => {
    props.setCurrentLesson(props.moduleId, props.lesson._id);
  };

  const onContextMenu = (e) => {
    e.preventDefault();
    setPopupVisible(!popupVisible);
  };

  const onClosePopup = () => setPopupVisible(false);

  const onDelete = () => {
    
  };

  return (
    <div className="relative">
      {popupVisible ? (
        <Popup isFixed={false} onClose={onClosePopup}>
          <div className="flex flex-col gap-2 items-start p-4 bg-white shadow-lg rounded-lg">
            <button onClick={onDelete}>Delete</button>
          </div>
        </Popup>
      ) : null}
      <button onContextMenu={onContextMenu} onClick={onLessonSelect}>
        {props.lesson.title}
      </button>
    </div>
  );
}
