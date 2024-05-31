type CourseCardProps = {
  title: string;
  url: string;
}

export default function CourseCard(props: CourseCardProps) {
  return (
    <a href={`/courses/${props.url}`} className="flex flex-col bg-primary-100 w-80 h-72 border-1 border-border rounded-md">
      <div className="h-3/4 p-4 border-b-1 border-border">
        <div className=""></div>
      </div>
      <div className="flex flex-row flex-1 items-center p-2">
        <h4 className="text-lg">{props.title}</h4>
      </div>
    </a>
  );
}
