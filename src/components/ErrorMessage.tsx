interface ErrorMessageProps {
  message: string
  onRetry?: () => void
}

export const ErrorMessage = ({ message, onRetry }: ErrorMessageProps) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="text-sw-yellow text-6xl mb-4">⚠️</div>
      <h2 className="text-2xl font-orbitron text-white mb-2">Error</h2>
      <p className="text-sw-gray mb-6 text-center max-w-md">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="px-6 py-3 bg-sw-yellow text-sw-dark font-poppins font-semibold rounded-lg hover:bg-yellow-400 transition-colors duration-200"
        >
          Retry
        </button>
      )}
    </div>
  )
}
