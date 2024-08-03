import MainHeader from "@/frontend/ui/MainHeader/MainHeader";
import { generateBody } from "../_utils/generateBody";
import BodyLayout from "../_layouts/BodyLayout";
import { getCourses } from "@/backend/controllers/courseController";
import { Suspense } from "react";
import CourseSkeletons from "../_ui/CourseSkeletons";
import Courses from "../_ui/Courses";

export default async function Page() {
  return (
    <>
      <MainHeader />
      <main className="flex flex-col h-26 gap-10">
        <BodyLayout>
          <h1 className="text-6xl text-center">Browse</h1>
          <Suspense fallback={<CourseSkeletons/>}>
            <Courses/>
          </Suspense>
        </BodyLayout>
      </main>
    </>
  );
}
