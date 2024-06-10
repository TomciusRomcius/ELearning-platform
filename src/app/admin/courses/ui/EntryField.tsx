import Edit from "@/frontend/resources/svg/Edit";
import { useRef, useState } from "react";

type EntryFieldProps = {
  content: string;
  action: (newContent: string) => void;
};

export default function EntryField(props: EntryFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  let inputRef = useRef<HTMLInputElement>(null);

  const onToggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const onSubmit = () => {
    if (inputRef.current?.value) {
      props.action(inputRef.current.value);
      setIsEditing(false);
    }
  }

  return (
    <td className="px-24 py-2">
      <div className="flex gap-4">
        {isEditing ? (
          <input
            ref={inputRef}
            className="border-1 border-border rounded-lg"
            defaultValue={props.content}
          />
        ) : (
          <h4>{props.content}</h4>
        )}

        { isEditing ? (
          <button onClick={onSubmit}>Apply</button>
        ) : null }

        <button onClick={onToggleEdit}>
          <Edit className="fill-text-grayed hover:fill-secondary" />
        </button>
      </div>
    </td>
  );
}
