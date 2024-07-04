export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-primary-0 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-3/4 sm:w-5/6 md:w-4/6">
        {children}
      </div>
    </div>
  )
}