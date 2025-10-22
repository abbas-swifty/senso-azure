import React, { Suspense } from 'react'
import { Metadata } from 'next'

import { Gutter } from '../../_components/Gutter'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { OrderConfirmationPage } from './OrderConfirmationPage'

import classes from './index.module.scss'

export default async function OrderConfirmation() {
  return (
    <section className={classes.confirmationPage}>
      <div className="container mx-auto py-28 px-16">
        <Suspense fallback={<div>Loading...</div>}>
          <OrderConfirmationPage />
        </Suspense>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Order Confirmation',
  description: 'Your order has been confirmed.',
  openGraph: mergeOpenGraph({
    title: 'Order Confirmation',
    url: '/order-confirmation',
  }),
}
