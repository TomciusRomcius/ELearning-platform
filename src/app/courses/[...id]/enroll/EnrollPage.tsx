"use client";

import courseService from "@/frontend/services/courseService";
import AccentButton from "@/frontend/ui/AccentButton";
import { navigate } from "@/utils/navigation";
import { CourseType } from "@/utils/types";

type EnrollPageProps = {
  course: CourseType;
};

export default function EnrollPage(props: EnrollPageProps) {
  const onEnroll = () => {
    courseService.courseEnroll(props.course._id)
      .then(() => {
        navigate(`/courses/${props.course._id}`);
      })
  };

  return (
    <div className="w-screen min-h-screen flex flex-col gap-4">
      <div className="w-screen flex-1 h-full flex justify-between gap-16 px-56 items-center">
        <div className="flex flex-col gap-4">
          <h1 className="text-4xl">{props.course.title}</h1>
          <p className="text-xl">{props.course.description}</p>
          <AccentButton onClick={onEnroll} className="w-fit">Enroll</AccentButton>
        </div>
        <img
          className="w-1/2 rounded-lg shadow-lg"
          src={`/uploads/${props.course._id}`}
        ></img>
      </div>
    </div>
  );
}
