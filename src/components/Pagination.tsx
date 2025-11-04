interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)
  const visiblePages = pages.filter(
    page => page === 1 || 
    page === totalPages || 
    (page >= currentPage - 2 && page <= currentPage + 2)
  )

  return (
    <div className="flex items-center justify-center space-x-2 mt-8">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200 font-poppins"
      >
        Previous
      </button>
      
      <div className="flex space-x-2">
        {visiblePages.map((page, index) => (
          <div key={page} className="flex items-center space-x-2">
            {index > 0 && visiblePages[index - 1] !== page - 1 && (
              <span className="text-sw-gray">...</span>
            )}
            <button
              onClick={() => onPageChange(page)}
              className={`px-4 py-2 rounded-lg font-poppins transition-colors duration-200 ${
                page === currentPage
                  ? 'bg-sw-yellow text-sw-dark font-semibold'
                  : 'bg-gray-800 text-white hover:bg-gray-700'
              }`}
            >
              {page}
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-800 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700 transition-colors duration-200 font-poppins"
      >
        Next
      </button>
    </div>
  )
}
