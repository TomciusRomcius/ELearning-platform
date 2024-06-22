"use client";

import AccentButton from "@/frontend/ui/AccentButton";
import { useCallback, useRef, useState } from "react";
import { UploadFile } from "./ui/UploadFile";
import { fileURLToPath } from "url";
import courseService from "@/frontend/services/courseService";

export default function NewCourse() {
  let nameRef = useRef<HTMLInputElement>(null);
  let descriptionRef = useRef<HTMLTextAreaElement>(null);
  let categoryRef = useRef<HTMLInputElement>(null);
  let file = useRef<File | null>(null);

  const setFile = (fileArg: File) => {
    file.current = fileArg;
  };

  const onSubmit = () => {
    const name = nameRef.current?.value;
    const description = descriptionRef.current?.value;
    const category = categoryRef.current?.value;
    if (!name || !description || !category)
      return;
    if (!file.current) 
      return;
    courseService.createCourse(name, description, category, file.current);
  }

  return (
    <div className="flex flex-col gap-4 w-2/4">
      <h1 className="text-4xl">New course</h1>
      <div className="flex flex-col gap-2">
        <small>Course name</small>
        <div className="p-2 w-full border-border border-1 rounded-lg">
          <input ref={nameRef}/>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <small>Course description</small>
        <div className="p-2 w-full border-border border-1 rounded-lg">
          <textarea ref={descriptionRef} className="w-full h-full" />
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <small>Course category</small>
        <div className="relative p-2 w-full border-border border-1 rounded-lg">
          <input ref={categoryRef}/>
        </div>
      </div>
      <UploadFile setFile={setFile}></UploadFile>
      <AccentButton onClick={(onSubmit)} className="w-max">
        Submit
      </AccentButton>
    </div>
  );
}
