import Google from "@/frontend/resources/svg/Google";

export default function GoogleButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex flex-row gap-4 items-center justify-center font-bold text-primary-0 bg-secondary p-2 rounded-lg">
      <Google className="stroke-secondary"/>
      {props.children}
    </button>
  );
}
