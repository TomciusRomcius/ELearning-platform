import { useRef, useState } from "react"
import { ModuleType } from "../../../../utils/types";
import CourseEditorManager from "@/frontend/services/courseEditorManager";

type ModuleNameProps = {
  module: ModuleType;
  isRenaming: boolean;
  setIsRenaming: (isRenaming: boolean) => void;
}
export default function ModuleName(props: ModuleNameProps) {
  let nameRef = useRef<HTMLInputElement>(null);

  const onRename = () => {
    const newTitle = nameRef.current?.value;
    if (!newTitle) return;
    let newModule = structuredClone(props.module);
    newModule.title = newTitle;
    CourseEditorManager.updateModule(newModule).then(() => {
      props.setIsRenaming(false);
    });
  }

  return (
    <>
      {!props.isRenaming ? (
        <h1 className="text-text-light text-base">
          Module: {props.module.title}
        </h1>
      ) : (
        <div className="flex gap-2">
          <input ref={nameRef} defaultValue={props.module.title} />
          <button onClick={onRename}>Submit</button>
        </div>
      )}
    </>
  )
}