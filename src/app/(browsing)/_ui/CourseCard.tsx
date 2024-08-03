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
      className="flex flex-col bg-primary-100 w-full h-[80vw] md:w-64 md:h-80 border-1 border-border rounded-md shadow-lg"
    >
      <div className="relative h-[70%] p-4">
        <img
          src={`/uploads/${props.url}`}
          className="h-full object-contain object-top"
          alt=""
        ></img>
      </div>
      <div className="h-1/4 flex flex-col gap-2 px-4">
        <small className="text-sm font-semibold text-accent overflow-hidden text-ellipsis whitespace-no-wrap">
          {props.category}
        </small>
        <h4 className="text-base overflow-hidden text-ellipsis whitespace-no-wrap line-clamp-2">
          {props.title}
        </h4>
      </div>
    </a>
  );
}
