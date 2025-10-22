'use client'

import React, { useEffect, useState } from 'react'
import { Page, Review } from '../../../payload/payload-types'
import { ReviewsWrapper } from './reviews'
import { fetchDocs } from '../../_api/fetchDocs'

type Props = Extract<Page['layout'][0], { blockType: 'reviewsBlock' }>

export const ReviewsBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ title }) => {
  const [reviews, setReviews] = useState<Review[] | null>(null)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await fetchDocs<Review>('reviews')
        setReviews(fetchedReviews)
      } catch (err) {
        console.log(err)
      }
    }

    void fetchReviews()
  }, [])

  return (
    <section className="bg-cover bg-no-repeat bg-center">
      {reviews != null && <ReviewsWrapper title={title || ""} reviews={reviews} />}
    </section>
  )
}
