'use client'

import React, { Fragment, useEffect, useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import qs from 'qs'

import classes from './index.module.scss'
import { useFilter } from '../../../_providers/Filter'
import { Category, Product } from '../../../../payload/payload-types'
import { Pagination } from '../../../_components/Pagination'
import { Card } from '../../../_components/Card'
import Filters from '../../products/filters'
import { fetchDocs } from '../../../_api/fetchDocs'
import Modal from 'react-modal'
import Link from 'next/link'

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

export const SearchPage: React.FC<{}> = () => {
  const { categoryFilters: categoryFiltersFromContext, sort } = useFilter()
  const [filterCategories, setFilterCategories] = useState<Category[] | null>(null)
  const searchParams = useSearchParams()
  const router = useRouter()
  const error = searchParams.get('error')
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Result | null>(null)
  const [filters, setFilters] = useState<any>({})
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState<string | undefined>(undefined)
  const [priceRange, setPriceRange] = useState<string | undefined>(undefined)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handlePriceRangeChange = e => {
    const priceRangesLocal = e.target.value
    setPriceRange(priceRangesLocal)
    const [minPrice, maxPrice] = priceRangesLocal.split('-').map(Number)
    filters.priceJSON = {
      greater_than_equal: parseInt(minPrice),
      less_than_equal: parseInt(maxPrice),
    }

    setFilters({
      ...filters,
      priceJSON: { greater_than_equal: minPrice, less_than_equal: maxPrice },
    })
    makeRequest({
      ...filters,
      priceJSON: { greater_than_equal: minPrice, less_than_equal: maxPrice },
    })
  }

  useEffect(() => {
    let searchTextQuery: string = ''

    const filtersLocal: any = { ...filters }

    if (searchParams.has('searchQuery')) {
      searchTextQuery = searchParams.get('searchQuery') || ''
      if (searchTextQuery !== '') {
        filtersLocal.title = { contains: searchTextQuery }
      } else {
        filtersLocal.title = undefined
      }
      setSearchQuery(searchTextQuery)
    }
    setFilters(filtersLocal)
    makeRequest(filtersLocal)
  }, [searchParams, page, categoryFiltersFromContext, sort])

  const makeRequest = async (filtersParam: any) => {
    setLoading(true)
    const searchQuery = qs.stringify(
      {
        depth: 1,
        limit: 9,
        page,
        sort,
        where: {
          ...filtersParam,
          ...(categoryFiltersFromContext && categoryFiltersFromContext.length > 0
            ? {
                categories: {
                  in:
                    typeof categoryFiltersFromContext === 'string'
                      ? [categoryFiltersFromContext]
                      : categoryFiltersFromContext,
                },
              }
            : {}),
        },
      },
      { encode: false },
    )

    try {
      const fetchedCategories = await fetchDocs<Category>('categories')
      setFilterCategories(fetchedCategories)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/products?${searchQuery}`,
      )
      const data = await response.json()
      if (Array.isArray(data.docs)) {
        setResults(data)
      }
    } catch (error) {
      console.error('Failed to fetch products:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Fragment>
      <div className="flex flex-col gap-3 justify-center items-center w-full">
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex flex-col gap-6 w-full">
          <div className="flex flex-col gap-6 w-full">
            <div className="flex flex-row gap-2">
              <Link
                className="no-underline text-b16 lg:text-h6 font-semibold text-black/50"
                href={'/home'}
              >
                Home
              </Link>
              <span className="no-underline text-b16 lg:text-h6 font-semibold text-black/50">
                /
              </span>
              <Link
                className="no-underline text-b16 lg:text-h6 font-semibold text-black/50 cursor-pointer"
                href={'#'}
              >
                Search
              </Link>
              {searchQuery && (
                <span className="no-underline text-h6 font-semibold text-black/50">/</span>
              )}
              <span className="no-underline text-b16 lg:text-h6 font-semibold text-black/50">
                {searchQuery}
              </span>
            </div>
            {searchQuery && (
              <div>
                <p className="text-brand-dark/50 leading-headingLH2 font-medium text-b16">
                  You’ve searched for “{searchQuery}”
                </p>
              </div>
            )}
            {/* <div className="flex flex-row justify-between gap-3">
              <div className="flex flex-row gap-6">
                <div>
                  <select
                    value={priceRange}
                    onChange={handlePriceRangeChange}
                    className="text-b14 pb-1 leading-subHeadingLH2 outline-none border-0 border-b border-solid border-brand-dark w-[188px]"
                  >
                    <option value="" selected disabled>
                      Filter by Price
                    </option>
                    <option value="0-399">0 LBP - 399 LBP</option>
                    <option value="400-699">400 LBP - 699 LBP</option>
                    <option value="700-999">700 LBP - 999 LBP</option>
                  </select>
                </div>
                <div>
                  <select className="text-b14 pb-1 leading-subHeadingLH2 outline-none border-0 border-b border-solid border-brand-dark w-[188px]">
                    <option value={null} selected disabled>
                      Filter by Rating
                    </option>
                    <option value="title">5</option>
                    <option value="rating">4</option>
                    <option value="rating">3</option>
                    <option value="price">2</option>
                    <option value="price">1</option>
                  </select>
                </div>
              </div>
              <div></div>
            </div> */}
          </div>
          {results && (
            <div className="flex flex-col ">
              <div className="lg:hidden flex w-full justify-end">
                <button
                  className="bg-brand-primary text-white p-4 rounded-full shadow-lg"
                  onClick={openModal}
                >
                  Filter
                </button>
              </div>
              <div className="flex flex-row gap-8">
                <div className="lg:min-w-72 lg:flex hidden">
                  {filterCategories !== null && <Filters categories={filterCategories} />}
                </div>
                <div className="flex flex-col w-full gap-10">
                  <div className="grid grid-cols-2 lg:grid-cols-3 grid-flow-row gap-4">
                    {results?.docs?.map((result, index) => {
                      if (typeof result === 'object' && result !== null) {
                        return (
                          <Card key={index} doc={result} relationTo={'products'} showCategories />
                        )
                      }
                      return null
                    })}
                  </div>
                  <div className="flex w-full justify-end">
                    {results.totalPages > 1 && (
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
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Filters"
        className="fixed inset-0 bg-white p-4 m-4 rounded-lg shadow-lg overflow-auto h-fit"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Filters</h2>
          <button onClick={closeModal} className="text-brand-primary text-lg">
            &times;
          </button>
        </div>
        {filterCategories !== null && <Filters categories={filterCategories} />}
      </Modal>
    </Fragment>
  )
}
