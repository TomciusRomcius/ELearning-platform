export default function AccentButton(props: React.HTMLAttributes<HTMLButtonElement>) {
  const { className } = props;

  return (
    <button {...props} className={`bg-accent hover:bg-accentHover transition-colors px-6 py-2 rounded-lg shadow-lg ${className}`}
    >
      {props.children}
    </button>
  )
}