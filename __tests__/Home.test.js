import "@testing-library/jest-dom";
import CourseCard from "@/app/(browsing)/ui/CourseCard";
import { render, screen } from "@testing-library/react";

it("should" , () => {
  render(<CourseCard title="a" description="a" category="a" url="a" />);
  const el = screen.getAllByText("a");
  expect(el).toHaveLength(2);
});