export const Loader = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-sw-yellow border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-8 h-8 border-4 border-sw-yellow border-b-transparent rounded-full animate-spin animate-reverse"></div>
        </div>
      </div>
    </div>
  )
}
