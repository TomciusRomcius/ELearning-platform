type BodyLayoutProps = {
  children: React.ReactNode;
}

export async function BodyLayout(props: BodyLayoutProps) {
  return (
    <div className="flex justify-center flex-1 px-12 py-36">
      {props.children}
    </div>
  )
  
}