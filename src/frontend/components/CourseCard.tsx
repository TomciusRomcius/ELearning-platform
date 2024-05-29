type CourseCardProps = {
  title: string;
  url: string;
}

export default function CourseCard(props: CourseCardProps) {
  return (
    <a href={`/courses/${props.url}`} className="flex flex-col w-80 h-40 border-2 rounded-md">
      <div className="text-lg">{props.title}</div>
      <div className="w-full h-[2px] bg-gray-200"></div>
      <div className="bg-green-200 flex-1">
        <p>Image</p>
      </div>
    </a>
  );
}
