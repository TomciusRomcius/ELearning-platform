"use server";

import MainHeader from "@/frontend/ui/MainHeader/MainHeader";
import { generateBody } from "../_utils/generateBody";
import BodyLayout from "../_layouts/BodyLayout";
import { getCourses } from "@/backend/controllers/courseController";

export default async function Page() {
  const courses = await getCourses()
  let bodyElements: React.JSX.Element[] = generateBody(courses);

  return (
    <>
      <MainHeader />
      <main className="flex flex-col h-26 gap-10">
        <BodyLayout>
          <h1 className="text-6xl text-center">Browse</h1>
          {bodyElements}
        </BodyLayout>
      </main>
    </>
  );
}
