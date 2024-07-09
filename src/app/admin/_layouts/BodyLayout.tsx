type BodyLayoutProps = {
  children: React.ReactNode;
};

export async function BodyLayout(props: BodyLayoutProps) {
  return (
    <div className="flex justify-center flex-1 h-screen overflow-hidden px-24 py-36">
      <div className="w-full h-full overflow-y-auto">{props.children}</div>
    </div>
  );
}
