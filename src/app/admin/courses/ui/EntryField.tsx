import Edit from "@/frontend/resources/svg/Edit";
import TextArea from "@/frontend/ui/TextArea";
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
      <div className="max-w-64 flex gap-4">
        {isEditing ? (
          <TextArea
            ref={inputRef}
            className="max-w-26 border-1 border-border rounded-lg"
            defaultValue={props.content}
          />
        ) : (
          <p className="w-full">{props.content}</p>
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
