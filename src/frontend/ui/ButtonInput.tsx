import { useCallback, useRef, useState } from "react";

type ButtonInputProps = {
  action: (payload: string) => void;
  children: React.ReactNode;
}

export default function ButtonInput(props: ButtonInputProps) {
  let [active, setActive] = useState(false);
  let nameRef = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    setActive(!active);
  };
  const onAction = useCallback(() => {
    if (!nameRef.current?.value) return;
    props.action(nameRef.current.value);
  }, [props.action]);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleClick}
        className="text-start w-full p-2 text-text-grayed border-1  border-text-grayed rounded-md"
      >
        {props.children}
      </button>
      {active ? (
        <div className="flex justify-between">
          <input ref={nameRef} placeholder="Lesson Name" />
          <button onClick={onAction}>Submit</button>
        </div>
      ) : null}
    </div>
  );
}
