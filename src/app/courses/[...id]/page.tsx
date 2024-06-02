"use server";

import AdminPage from "./admin/AdminPage";
import ClientPage from "./client/ClientPage";
import { Module } from "./ui/Module";
import { CourseType } from "../../../utils/types";
import { getCourse } from "@/backend/controllers/courseController";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string[] };
  searchParams: { isAdmin: boolean };
}) {
  let courseId = params.id;
  // No security yet
  let isAdmin = searchParams.isAdmin;
  let course = await getCourse(courseId[0]);
  return (
    <>
    {isAdmin ? (
      <AdminPage/>
    ) : (
      <ClientPage course={course} />
    )}
    </>
  );
}
