import Edit from "@/frontend/resources/svg/Edit";
import { navigate } from "@/utils/navigation";
import EntryField from "./EntryField";
import { ReducerAction } from "../utils/coursesReducer";
import { Dispatch } from "react";
import Delete from "@/frontend/resources/svg/Delete";

type CourseEntryProps = {
  course: any;
  dispatchCourses: Dispatch<ReducerAction>;
}

export default function CourseEntry(props: CourseEntryProps) {
  const onChangeName = (title: string) => {
    props.dispatchCourses({
      type: "rename",
      payload: {
        name: title,
        id: props.course._id,
      },
    });
  }

  const onChangeDescription = (description: string) => {
    props.dispatchCourses({
      type: "change_description",
      payload: {
        description: description,
        id: props.course._id,
      },
    });
  }

  const onChangeCategory = (category: string) => {
    props.dispatchCourses({
      type: "change_category",
      payload: {
        category: category,
        id: props.course._id,
      },
    });
  }

  const onDelete = () => {
    props.dispatchCourses({
      type: "delete",
      payload: { id: props.course._id },
    });
  };

  return (
    <tr className="border-b-1 border-border">
      <EntryField action={onChangeName} content={props.course.title} />
      <EntryField
        action={onChangeDescription}
        content={props.course.description}
      />
      <EntryField
        action={onChangeCategory}
        content={props.course.category}
      />
      <td className="px-24 py-4">
        <div className="flex gap-4">
          <button
            onClick={() => navigate(`/courses/${props.course._id}?isAdmin=1`)}
          >
            <Edit className="fill-text-grayed" />
          </button>
          <button
            onClick={onDelete}
          >
            <Delete className="fill-text-grayed" />
          </button>
        </div>
      </td>
    </tr>
  );
}
