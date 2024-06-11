"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";

interface LinkOptionProps extends React.HTMLAttributes<HTMLDivElement> {
  href: string;
  className: string;
  highlightedClass: string;
  children: React.JSX.Element;
}

export default function LinkOption(props: LinkOptionProps) {
  const pathName = usePathname();
  let isActive = false;
  if (pathName === props.href)
    isActive = true;
  
  return (
    <Link className={`${props.className} ${isActive ? props.highlightedClass : ""}`} href={props.href}>
      {props.children}
    </Link>
  )
}