import { ReactNode, useEffect, useState } from "react";
import Menu from "../resources/svg/Menu";
import { SidebarLayout } from "@/app/admin/_layouts/SidebarLayout";

const mediaQuery = {
  SM: "(min-width: 640px)",
  MD: "(min-width: 768px)",
  LG: "(min-width: 1024px)",
  XL: "(min-width: 1024px)",
  XXL: "(min-width: 1536px)",
};

type ResponsiveSidebarLayoutProps = {
  children: ReactNode;
};

export default function ResponsiveSidebarLayout(
  props: ResponsiveSidebarLayoutProps
) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  }

  return (
    <>
      <button onClick={toggleSidebar} className={`absolute top-2 left-2 z-50 md:hidden`}>
        <Menu />
      </button>
      {/* Make the z-index higher on mobile, and if is open and is on mobile make display: hidden */}
      <SidebarLayout className={`z-10 md:z-0 ${!isOpen ? "hidden" : ""} md:flex`}>
        {props.children}
      </SidebarLayout>
    </>
  );
}
