import React from 'react'
import { Chevron } from '../Chevron'
import classes from './index.module.scss'

export const Pagination: React.FC<{
  page: number
  totalPages: number
  onClick: (page: number) => void
  className?: string
}> = props => {
  const { page, totalPages, onClick, className } = props
  const hasNextPage = page < totalPages
  const hasPrevPage = page > 1

  // Function to generate the page numbers
  const generatePageNumbers = () => {
    const range = 1 // Number of pages to show before and after the current page
    const pages = []

    // Show ellipsis if there are more pages than the range
    if (totalPages > range * 2 + 1) {
      pages.push(1)
      if (page > range + 1) pages.push('...')
      for (let i = Math.max(2, page - range); i <= Math.min(totalPages - 1, page + range); i++) {
        pages.push(i)
      }
      if (page < totalPages - range) pages.push('...')
      pages.push(totalPages)
    } else {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    }

    return pages
  }

  return (
    <div className={[classes.pagination, className].filter(Boolean).join(' ')}>
      <button
        type="button"
        className={classes.button}
        disabled={!hasPrevPage}
        onClick={() => {
          onClick(page - 1)
        }}
      >
        <Chevron rotate={90} className={classes.icon} />
      </button>
      <div className={classes.pageRange}>
        {/* <span className={classes.pageRangeLabel}>
          Page {page} of {totalPages}
        </span> */}
        <span className="flex flex-row gap-2">
          {generatePageNumbers().map((pageNumber, index) => (
            <React.Fragment key={index}>
              {pageNumber === '...' ? (
                <span>...</span>
              ) : (
                <button
                  type="button"
                  className={`${classes.button} ${
                    pageNumber === page ? 'bg-brand-dark text-white' : ''
                  } border border-brand-dark`}
                  onClick={() => onClick(pageNumber)}
                >
                  {pageNumber}
                  {/* {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-4 h-4 border-2 border-t-2 border-t-transparent border-brand-dark rounded-full animate-spin"></div>
                    </div>
                  )} */}
                </button>
              )}
            </React.Fragment>
          ))}
        </span>
      </div>
      <button
        type="button"
        className={classes.button}
        disabled={!hasNextPage}
        onClick={() => {
          onClick(page + 1)
        }}
      >
        <Chevron rotate={-90} className={classes.icon} />
      </button>
    </div>
  )
}
