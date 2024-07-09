export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-primary-0 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-3/4 md:w-1/3">
        {children}
      </div>
    </div>
  )
}