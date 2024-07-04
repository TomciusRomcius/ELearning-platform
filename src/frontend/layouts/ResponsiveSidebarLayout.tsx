import { ReactNode, useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import Menu from "../resources/svg/Menu";

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
  const isMobile = !useMediaQuery({ query: mediaQuery.MD });
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    setIsOpen(false);
  }, [isMobile]);

  if (!isMobile) return props.children;

  if (!isOpen)
    return (
      <button onClick={toggleOpen} className="absolute top-2 left-2">
        <Menu/>
      </button>
    );
  else
    return (
      <>
        <button onClick={toggleOpen} className="absolute z-50 top-2 left-2">
          <Menu/>
        </button>
        {props.children}
      </>
    );
}
