import { getCourses } from "@/backend/controllers/courseController";
import { generateBody } from "../_utils/generateBody";

export default async function Courses() {
  const courses = await getCourses();
  let bodyElements: React.JSX.Element[] = generateBody(courses);
  await new Promise(resolve => setTimeout(resolve, 1000));  
  return bodyElements;
}