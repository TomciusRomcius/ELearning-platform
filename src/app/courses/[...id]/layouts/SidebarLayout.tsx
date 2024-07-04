import { ReactNode } from "react";

type SidebarLayoutProps = {
  children: ReactNode;
};

export default function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <div className="fixed md:static z-10 w-screen md:max-w-[30%] md:w-auto h-screen overflow-y-auto bg-foreground py-4 px-8 flex flex-col gap-4 border-r-1 border-primary-300">
      {props.children}
    </div>
  );
}
