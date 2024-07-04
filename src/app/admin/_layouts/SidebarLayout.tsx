"use client";

import ResponsiveSidebarLayout from "@/frontend/layouts/ResponsiveSidebarLayout";

type SidebarLayoutProps = {
  children: React.JSX.Element;
};

export async function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <ResponsiveSidebarLayout>
      <nav className="fixed md:static w-screen md:w-1/6 h-screen py-8 px-12 flex flex-col gap-4 items-start bg-foreground border-primary-300 border-r-1">
        {props.children}
      </nav>
    </ResponsiveSidebarLayout>
  );
}
