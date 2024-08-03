import { CourseType } from "@/utils/types";
import { getCategoryToCourseMap } from "./getCategoryToCourseMap";
import CourseCard from "../_ui/CourseCard";
import CourseContainerLayout from "../_layouts/CourseContainerLayout";

export function generateBody(courses: CourseType[]): React.JSX.Element[] {
  const categoryToCourseMap = getCategoryToCourseMap(courses);
  const bodyElements: React.JSX.Element[] = [];
  categoryToCourseMap.forEach((mapCourses, category) => {
    bodyElements.push(
      <>
        <h4 className="text-2xl">{category}</h4>
        <CourseContainerLayout>
          {mapCourses.map((course) => (
            <CourseCard
              key={course._id}
              url={course?._id}
              title={course?.title}
              description={course?.description}
              category={course.category}
            />
          ))}
        </CourseContainerLayout>
      </>
    );
  });
  return bodyElements;
}
