type CourseCardProps = {
  title: string;
  description: string;
  url: string;
}

export default function CourseCard(props: CourseCardProps) {
  return (
    <a href={`/courses/${props.url}`} className="flex flex-col bg-primary-100 w-80 h-72 border-1 border-border rounded-md">
      <div className="h-3/4 p-4 border-b-1 border-border">
        <div className=""></div>
      </div>
      <div className="flex flex-col flex-1 p-2">
        <h4 className="text-lg">{props.title}</h4>
        <p>{props.description}</p>
      </div>
    </a>
  );
}
