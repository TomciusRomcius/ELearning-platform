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
    CourseEditorManager.createModule(nameRef.current?.value).then(() => {
      setActive(false);
    });
  };
  
  return (
    <div className="flex flex-col gap-2">
      <button onClick={handleClick} className="text-start w-full p-2 text-text-grayed border-1  border-text-grayed rounded-md">
        New module
      </button>
      {active ? (
        <div className="flex justify-between">
          <input ref={nameRef} placeholder="Module Name" />
          <button onClick={onCreate}>Submit</button>
        </div>
      ) : null}
    </div>
  );
}
