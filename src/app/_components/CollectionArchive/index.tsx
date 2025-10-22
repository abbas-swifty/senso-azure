'use client'

import React, { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import qs from 'qs'

import type { Category, Distributor, Product } from '../../../payload/payload-types'
import type { ArchiveBlockProps } from '../../_blocks/ArchiveBlock/types'
import { Gutter } from '../Gutter'
import { Pagination } from '../Pagination'

import Modal from 'react-modal'
import classes from './index.module.scss'
import { ProductsCarousel } from '../ProductsCarousel'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { usePathname } from 'next/navigation'
import { Card } from '../Card'
import { useFilter } from '../../_providers/Filter'
import { fetchDocs } from '../../_api/fetchDocs'
import Filters from '../../(pages)/products/filters'

type Result = {
  docs: (Product | string)[]
  hasNextPage: boolean
  hasPrevPage: boolean
  nextPage: number
  page: number
  prevPage: number
  totalDocs: number
  totalPages: number
}

type CustomScrollbarDotsProps = {
  onClick: () => void
  active: boolean
}

export type Props = {
  categories?: ArchiveBlockProps['categories']
  className?: string
  limit?: number
  onResultChange?: (result: Result) => void // eslint-disable-line no-unused-vars
  populateBy?: 'collection' | 'selection'
  populatedDocs?: ArchiveBlockProps['populatedDocs']
  populatedDocsTotal?: ArchiveBlockProps['populatedDocsTotal']
  relationTo?: 'products'
  selectedDocs?: ArchiveBlockProps['selectedDocs']
  showPageRange?: boolean
  sort?: string
  displayAs: 'carousel' | 'list'
}

export const CollectionArchive: React.FC<Props> = props => {
  const { categoryFilters: categoryFiltersFromContext, sort } = useFilter()
  const [filterCategories, setFilterCategories] = useState<Category[] | null>(null)

  const {
    categories: catsFromProps,
    className,
    limit = 9,
    onResultChange,
    populateBy,
    populatedDocs,
    populatedDocsTotal,
    relationTo,
    selectedDocs,
    showPageRange,
    // sort = '-createdAt',
    displayAs,
  } = props

  const [results, setResults] = useState<Result>({
    docs: (populateBy === 'collection'
      ? populatedDocs
      : populateBy === 'selection'
      ? selectedDocs
      : []
    )?.map(doc => doc.value),
    hasNextPage: false,
    hasPrevPage: false,
    nextPage: 1,
    page: 1,
    prevPage: 1,
    totalDocs: typeof populatedDocsTotal === 'number' ? populatedDocsTotal : 0,
    totalPages: 1,
  })

  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | undefined>(undefined)
  const scrollRef = useRef<HTMLDivElement>(null)
  const hasHydrated = useRef(false)
  const isRequesting = useRef(false)
  const [page, setPage] = useState(1)
  const pathName = usePathname()

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const categories = (catsFromProps || [])
    .map(cat => (typeof cat === 'object' ? cat?.id : cat))
    .join(',')

  const scrollToRef = useCallback(() => {
    const { current } = scrollRef
    if (current) {
      // current.scrollIntoView({
      //   behavior: 'smooth',
      // })
    }
  }, [])

  useEffect(() => {
    if (!isLoading && typeof results.page !== 'undefined') {
      // scrollToRef()
    }
  }, [isLoading, scrollToRef, results])

  useEffect(() => {
    let timer: NodeJS.Timeout = null

    if (populateBy === 'collection' && !isRequesting.current) {
      isRequesting.current = true

      // hydrate the block with fresh content after first render
      // don't show loader unless the request takes longer than x ms
      // and don't show it during initial hydration
      timer = setTimeout(() => {
        if (hasHydrated.current) {
          setIsLoading(true)
        }
      }, 500)

      const searchQuery = qs.stringify(
        {
          depth: 1,
          limit,
          page,
          sort: sort, // Use context sort if available, fallback to prop sort
          where: {
            ...(categories
              ? {
                  categories: {
                    in: categories,
                  },
                }
              : {}),
            ...(categoryFiltersFromContext && categoryFiltersFromContext.length > 0
              ? {
                  categories: {
                    in:
                      typeof categoryFiltersFromContext === 'string'
                        ? [categoryFiltersFromContext]
                        : categoryFiltersFromContext.join(','),
                  },
                }
              : {}),
          },
        },
        { encode: false },
      )

      const makeRequest = async () => {
        try {
          const fetchedCategories = await fetchDocs<Category>('categories')
          setFilterCategories(fetchedCategories)
          const req = await fetch(
            `${process.env.NEXT_PUBLIC_SERVER_URL}/api/${relationTo}?${searchQuery}`,
          )

          const json = await req.json()
          clearTimeout(timer)

          const { docs } = json as { docs: Product[] }

          if (docs && Array.isArray(docs)) {
            setResults(json)
            setIsLoading(false)
            if (typeof onResultChange === 'function') {
              onResultChange(json)
            }
          }
        } catch (err) {
          console.warn(err) // eslint-disable-line no-console
          setIsLoading(false)
          setError(`Unable to load "${relationTo} archive" data at this time.`)
        }

        isRequesting.current = false
        hasHydrated.current = true
      }

      void makeRequest()
    }

    return () => {
      if (timer) clearTimeout(timer)
    }
  }, [
    page,
    categoryFiltersFromContext,
    categories,
    relationTo,
    onResultChange,
    sort,
    limit,
    populateBy,
  ])

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  const CustomScrollbarDots: React.FC<CustomScrollbarDotsProps> = ({ onClick, active }) => {
    return (
      <div
        className={[classes.customScrollbarDots, active ? classes.customScrollbarActive : '']
          .filter(Boolean)
          .join(' ')}
        onClick={onClick}
      ></div>
    )
  }

  return (
    <div className={[classes.collectionArchive, className].filter(Boolean).join(' ')}>
      <div className={classes.scrollRef} ref={scrollRef} />
      {!isLoading && error && <Gutter>{error}</Gutter>}
      <Fragment>
        {/* {showPageRange !== false && populateBy !== 'selection' && (
          <Gutter>
            <div className={classes.pageRange}>
              <PageRange
                collection={relationTo}
                currentPage={results.page}
                limit={limit}
                totalDocs={results.totalDocs}
              />
            </div>
          </Gutter>
        )} */}
        {displayAs === 'list' && (
          <div className="flex flex-col">
            <div className="lg:hidden flex w-full justify-end">
              <button
                className="bg-gradient-to-r from-brand-blue to-brand-blue/65 text-white p-4 rounded-full shadow-lg"
                onClick={openModal}
              >
                Filter
              </button>
            </div>
            <div className="flex flex-row gap-8">
              <div className="lg:min-w-72 lg:flex hidden">
                {filterCategories !== null && <Filters categories={filterCategories} />}
              </div>
              <div className="flex flex-col w-full">
                <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
                  {results.docs?.map((result, index) => {
                    if (typeof result === 'object' && result !== null) {
                      return <Card key={index} doc={result} relationTo={relationTo} showCategories />
                    }
                    return null
                  })}
                </div>
                <div className="flex w-full justify-end">
                  {results.totalPages > 1 && populateBy !== 'selection' && (
                    <Pagination
                      className={classes.pagination}
                      onClick={setPage}
                      page={results.page}
                      totalPages={results.totalPages}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {displayAs === 'carousel' && (
          // pb-[40px] lg:pb-[80px]
          <div className="">
            <Carousel
              autoPlay={false}
              autoPlaySpeed={2500}
              keyBoardControl={true}
              removeArrowOnDeviceType={['tablet', 'mobile']}
              infinite={true}
              showDots={true}
              responsive={responsive}
              containerClass="carousel-container"
              customDot={<CustomScrollbarDots />}
            >
              {results.docs?.map((result, index) => {
                if (typeof result === 'object' && result !== null) {
                  return (
                    <div key={index} className="h-full mx-[16px]">
                      <ProductsCarousel doc={result} relationTo={relationTo} showCategories />
                    </div>
                  )
                }
                return null
              })}
            </Carousel>
          </div>
        )}
        <Modal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          contentLabel="Filters"
          className="fixed inset-0 bg-[#BFBFBF] p-4 m-4 rounded-lg shadow-lg overflow-auto h-fit mt-14"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={closeModal} className="text-brand-primary text-lg bg-[#BFBFBF] ">
              &times;
            </button>
          </div>
          {filterCategories !== null && <Filters categories={filterCategories} />}
        </Modal>
      </Fragment>
    </div>
  )
}
