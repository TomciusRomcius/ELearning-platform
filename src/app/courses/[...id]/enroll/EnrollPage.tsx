"use client"

import { courseEnroll } from "@/frontend/services/courseEnroll"

type EnrollPageProps = {
  courseId: string;
}

export default function EnrollPage(props: EnrollPageProps) {
  const onEnroll = () => {
    courseEnroll(props.courseId);
  }

  return (
    <div className="flex justify-center items-center">
      <button onClick={onEnroll}>Enroll</button>    
    </div>
  )
}