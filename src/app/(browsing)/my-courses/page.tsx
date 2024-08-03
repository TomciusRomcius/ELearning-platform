"use server";

import { getEnrolledCourses } from "@/backend/controllers/courseController";
import { CourseType } from "@/utils/types";
import MainHeader from "@/frontend/ui/MainHeader/MainHeader";
import { navigate } from "@/utils/navigation";
import { getSessionServer } from "@/backend/utils/getServerSession";
import { generateBody } from "../_utils/generateBody";
import BodyLayout from "../_layouts/BodyLayout";

export default async function MyCourses() {
  const session = await getSessionServer();
  // If the user is not logged in, redirect to log in page.
  if (!session?.user) {
    await navigate("/auth/sign-in");
    return;
  }
  const enrolledCourses: CourseType[] = await getEnrolledCourses(
    session?.user.id
  );

  const bodyElements = generateBody(enrolledCourses);

  return (
    <>
      <MainHeader />
      <BodyLayout>
        <h1 className="text-6xl text-center">Browse</h1>
        <div className="flex flex-col flex-wrap gap-10">{bodyElements}</div>
      </BodyLayout>
    </>
  );
}
