import { CourseType } from "@/utils/types";

export function getCategoryToCourseMap(
  courses: CourseType[]
): Map<string, CourseType[]> {
  let categoryToCourseMap = new Map<string, CourseType[]>();
  courses.forEach((course) => {
    if (!categoryToCourseMap.get(course.category)) {
      categoryToCourseMap.set(course.category, []);
    }
    categoryToCourseMap.get(course.category)?.push(course);
  });

  return categoryToCourseMap;
}
