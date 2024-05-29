import CourseEditorManager from "@/frontend/services/courseEditorManager";
import { useRef, useState } from "react";

type NewLessonButtonProps = {
  courseId: string;
}

export default function NewModuleButton(props: NewLessonButtonProps) {
  let [active, setActive] = useState(false);
  let nameRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setActive(!active);
  };
  const onCreate = () => {
    if (!nameRef.current?.value) return;
    CourseEditorManager.createModule(nameRef.current?.value);
  };
  
  return (
    <div>
      <button onClick={handleClick} className="text-start w-full p-2 text-text-grayed border-2  border-text-grayed rounded-md">
        New module
      </button>
      {active ? (
        <>
          <input ref={nameRef} placeholder="Module Name" />
          <button onClick={onCreate}>Submit</button>
        </>
      ) : null}
    </div>
  );
}
