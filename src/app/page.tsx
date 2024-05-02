import CourseCard from "./_components/CourseCard";

export default function Page() {
  return (
    <main className="flex flex-col gap-10">
      <header className="flex justify-between px-20 py-5 items-center border-b-2 border-gray-200">
        <span className="flex gap-20">
          <a href="my-courses">My courses</a>
          <a href="browse-courses">Courses</a>
        </span>
        <span className="flex gap-20">
          <a href="my-courses">My courses</a>
          <a href="browse-courses">Courses</a>
        </span>
      </header>
      <section className="flex flex-col gap-10 px-60">
        <h1 className="text-6xl text-center">Browse</h1>
        <div className="flex flex-wrap justify-start gap-10">
          <CourseCard url="course" title="Marketing"/>
          <CourseCard url="course" title="Marketing"/>
          <CourseCard url="course" title="Marketing"/>
          <CourseCard url="course" title="Marketing"/>
        </div>
      </section>
    </main>
  );
}
