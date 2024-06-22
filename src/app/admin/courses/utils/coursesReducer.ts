import courseService from "@/frontend/services/courseService";
import { CourseType } from "@/utils/types";

type ResetType = {
  type: "reset";
  payload: { courses: CourseType[] };
};

type RenameType = {
  type: "rename";
  payload: {
    name: string;
    id: string;
  };
};

type ChangeDescriptionType = {
  type: "change_description";
  payload: {
    description: string;
    id: string;
  };
};

type ChangeCategoryType = {
  type: "change_category";
  payload: {
    category: string;
    id: string;
  };
};

type DeleteType = {
  type: "delete";
  payload: {
    id: string;
  };
};

export type ReducerAction =
  | ResetType
  | RenameType
  | ChangeDescriptionType
  | ChangeCategoryType
  | DeleteType;

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
      courseService.updateCourse(course._id, { title: course.title });
      break;
    case "change_description":
      course.description = action.payload.description;
      courseService.updateCourse(course._id, {
        description: course.description,
      });
      break;
    case "change_category":
      course.category = action.payload.category;
      courseService.updateCourse(course._id, { category: course.category });
      break;
    case "delete":
      newState.splice(courseIndex, 1);
      courseService.deleteCourse(action.payload.id);
      break;
  }
  return newState;
}
