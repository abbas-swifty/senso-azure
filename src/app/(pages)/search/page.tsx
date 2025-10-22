import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { SearchPage } from './SearchPage'

import classes from './index.module.scss'

export default async function OrderConfirmation() {
  return (
    <section>
      <div
        className="container mx-auto py-28 px-4
      lg:px-4 lg:py-28
      "
      >
        <Suspense fallback={<div>Loading...</div>}>
          <SearchPage />
        </Suspense>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Search Products',
  description: 'List of all the products which you can search.',
  openGraph: mergeOpenGraph({
    title: 'Search Products',
    url: '/search',
  }),
}
