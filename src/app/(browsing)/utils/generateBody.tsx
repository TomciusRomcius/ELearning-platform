import { CourseType } from "@/utils/types";
import { getCategoryToCourseMap } from "./getCategoryToCourseMap";
import CourseCard from "@/frontend/components/CourseCard";

export function generateBody(courses: CourseType[]): React.JSX.Element[] {
  const categoryToCourseMap = getCategoryToCourseMap(courses);
  const bodyElements: React.JSX.Element[] = [];
  categoryToCourseMap.forEach((mapCourses, category) => {
    bodyElements.push(
      <>
        <h4 className="text-2xl">{category}</h4>
        <div className="flex flex-row flex-wrap gap-10">
          {mapCourses.map((course) => (
            <CourseCard
              key={course._id}
              url={course?._id}
              title={course?.title}
              description={course?.description}
              category={course.category}
            />
          ))}
        </div>
      </>
    );
  });
  return bodyElements;
}
