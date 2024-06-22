export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-screen min-h-screen bg-primary-0 flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-1/4">
        {children}
      </div>
    </div>
  )
}