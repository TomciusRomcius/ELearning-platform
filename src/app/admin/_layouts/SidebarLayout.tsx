"use client";

import { ReactNode } from "react";

type SidebarLayoutProps = {
  children: ReactNode;
  className?: string;
};

export function SidebarLayout(props: SidebarLayoutProps) {
  return (
    // Huge ass classname lol
    <nav
      className={`fixed md:static w-screen md:w-2/5 2xl:w-1/5 h-screen py-8 px-12 flex flex-col items-stretch gap-4 bg-foreground border-primary-300 border-r-1 overflow-y-auto ${props.className}`}
    >
      {props.children}
    </nav>
  );
}
