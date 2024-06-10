import { navigate } from "@/utils/navigation";
import CourseEntry from "./CourseEntry";
import { useEffect, useReducer, useState } from "react";
import { CourseType } from "@/utils/types";
import reducer, { ReducerAction } from "../utils/coursesReducer";

export type CourseTableProps = {
  courses: CourseType[];
};

export default function CourseTable(props: CourseTableProps) {
  const [courses, dispatch] = useReducer(reducer, structuredClone(props.courses));
  const onCreateCourse = () => {
    navigate("/admin/new-course");
  };
  console.log(courses, props.courses);

  useEffect(() => {
    dispatch({
      type: "reset",
      payload: {
        courses: props.courses,
      },
    });

  }, [props.courses]);
  return (
    <table>
      <tbody>
        <tr className="border-b-1 border-border">
          <td className="px-24 py-2 font-bold">Name</td>
          <td className="px-24 py-2 font-bold">Description</td>
          <td className="px-24 py-2 font-bold">Category</td>
        </tr>
        {courses.map((course) => (
          <CourseEntry course={course} dispatchCourses={dispatch}/>
        ))}
        <tr>
          <td className="py-2">
            <button onClick={onCreateCourse}>Create course</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
