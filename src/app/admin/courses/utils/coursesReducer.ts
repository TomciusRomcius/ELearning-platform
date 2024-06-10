import { deleteCourse } from "@/frontend/services/deleteCourse";
import { updateCourse } from "@/frontend/services/updateCourse";
import { CourseType } from "@/utils/types";

export type ReducerAction =
  | {
      type: "reset";
      payload: { courses: CourseType[] };
    }
  | {
      type: "rename";
      payload: {
        name: string;
        id: string;
      };
    }
  | {
      type: "change_description";
      payload: {
        description: string;
        id: string;
      };
    }
  | {
      type: "delete";
      payload: {
        id: string;
      };
    };

export default function reducer(state: CourseType[], action: ReducerAction) {
  if (action.type === "reset") {
    return structuredClone(action.payload.courses);
  }
  let newState = structuredClone(state);
  const courseIndex = newState.findIndex(
    (element) => element._id === action.payload.id
  );
  const course = newState[courseIndex];
  if (!course) return state;
  switch (action.type) {
    case "rename":
      course.title = action.payload.name;
      updateCourse(course._id, { title: course.title });
      break;
    case "change_description":
      course.description = action.payload.description;
      updateCourse(course._id, { description: course.description });
      break;
    case "delete":
      newState.splice(courseIndex, 1);
      deleteCourse(action.payload.id);
      break;
  }
  return newState;
}
