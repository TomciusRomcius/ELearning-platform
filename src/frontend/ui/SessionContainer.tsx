"use client"

import { SessionProvider } from "next-auth/react"

type SessionContainerProps = {
  children: React.JSX.Element;
}

export default function SessionContainer(props: SessionContainerProps) {
  return (
    <SessionProvider>
      {props.children}
    </SessionProvider>
  )
}