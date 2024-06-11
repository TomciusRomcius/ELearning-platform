type SidebarLayoutProps = {
  children: React.JSX.Element;
}

export async function SidebarLayout(props: SidebarLayoutProps) {
  return (
    <nav className="bg-foreground py-8 px-12 flex flex-col gap-4 items-start border-r-2 border-primary-300 w-1/6 h-screen">
      {props.children}
    </nav>
  )
  
}