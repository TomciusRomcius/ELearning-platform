type BodyLayoutProps = {
  children: React.ReactNode;
};

export async function BodyLayout(props: BodyLayoutProps) {
  return (
    <div className="flex justify-center flex-1 h-screen">
      <div className="h-full px-12 py-16 overflow-y-auto">{props.children}</div>
    </div>
  );
}
