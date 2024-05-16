import axios from "axios";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function NewCourse() {
  const session = useSession();
  let courseNameRef = useRef<HTMLInputElement>(null);
  let courseDescriptionRef = useRef<HTMLInputElement>(null);
  const handleSubmit = () => {
    const title = courseNameRef.current?.value;
    const description = courseNameRef.current?.value;
    if (!title || !description) return;
    axios.post("/api/courses", {
      title: title,
      description: description,
    });
  }
  if (session?.status === "unauthenticated")
    return <h1>Not allowed</h1>
  return (
    <main className="flex items-center justify-center w-screen h-screen">
      <div className="py-2 px-4 border-gray-200 border-2 w-1/4">
        <h1 className="text-4xl">New course</h1>
          <input ref={courseNameRef} className="" placeholder="Course name" />
          <input ref={courseDescriptionRef} className="" placeholder="Course description" />
          <button onClick={handleSubmit}>Submit</button>
      </div>
    </main>
  );
}
