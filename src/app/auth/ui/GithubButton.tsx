import Github from "@/frontend/resources/svg/Github";

export default function GithubButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex flex-row gap-4 items-center justify-center font-bold text-text-light border-border border-1 p-2 rounded-lg">
      <Github className="stroke-secondary"/>
      {props.children}
    </button>
  );
}
