import { ReactNode } from "react"

type BodyLayoutProps = {
  children: ReactNode;
}

export default function BodyLayout(props: BodyLayoutProps) {
  return (
    <section className="flex flex-col gap-10 px-12 py-10 md:px-48">
      {props.children}
    </section>
  )
}