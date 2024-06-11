type CourseCardProps = {
  title: string;
  description: string;
  category: string;
  url: string;
};

export default function CourseCard(props: CourseCardProps) {
  return (
    <a
      href={`/courses/${props.url}`}
      className="flex flex-col bg-primary-100 w-64 h-72 border-1 border-border rounded-md shadow-lg"
    >
      <div className="relative flex-1 p-4">
      </div>
      <div className="flex flex-col gap-2 h-28 p-4">
        <small className="text-sm font-semibold text-accent">{props.category}</small>
        <h4 className="text-xl">{props.title}</h4>
      </div>
    </a>
  );
}
