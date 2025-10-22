import React from 'react'

import { Page } from '../../../payload/payload-types'
import { ReviewsWrapper } from './reviews'

type Props = Extract<Page['layout'][0], { blockType: 'productReviewsBlock' }>

export const ProductReviewsBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ title, productReviews }) => {
  return (
    <section className="bg-cover bg-no-repeat bg-center">
      <div
        className="container mx-auto py-8 px-4 text-center flex justify-center flex-col
      lg:px-8
      "
      >
        <div className="flex flex-col">
          <h4 className="text-h4 leading-headingLH2 text-brand-dark">{title}</h4>
          <ReviewsWrapper reviews={productReviews} />
        </div>
      </div>
    </section>
  )
}
