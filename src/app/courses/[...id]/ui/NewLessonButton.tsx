import { createLesson } from "@/services/createLesson";
import { useRef, useState } from "react";

type NewLessonButtonProps = {
  courseId: string;
}

export default function NewLessonButton(props: NewLessonButtonProps) {
  let [active, setActive] = useState(false);
  let nameRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setActive(!active);
  };
  const onCreate = () => {
    if (!nameRef.current?.value) return;
    createLesson(props.courseId, nameRef.current?.value)
  };
  
  return (
    <div>
      <button onClick={handleClick} className="p-2 bg-gray-200 rounded-md">
        New lesson
      </button>
      {active ? (
        <>
          <input ref={nameRef} placeholder="Lesson Name" />
          <button onClick={onCreate}>Submit</button>
        </>
      ) : null}
    </div>
  );
}
