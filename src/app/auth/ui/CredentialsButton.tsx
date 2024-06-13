export default function CredentialsButton(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className="flex flex-row gap-4 items-center justify-center font-bold text-text-light bg-accent p-2 rounded-lg">
      {props.children}
    </button>
  );
}
