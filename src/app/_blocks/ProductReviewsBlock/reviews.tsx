'use client'

import React, { useMemo } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css' // Ensure the carousel styles are imported
import { HR } from '../../_components/HR'

interface ReviewsWrapperProps {
  reviews?: {
    name?: string | null
    review?: string | null
    rating?: string | null
  }[]
}

export const ReviewsWrapper: React.FC<ReviewsWrapperProps> = ({ reviews = [] }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
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

  const generateStars = (rating: string | null) => {
    const ratingValue = rating ? parseInt(rating.replace('_', ''), 10) : 0
    const stars = []
    for (let i = 0; i < 5; i++) {
      stars.push(
        <span
          key={i}
          className={`text-h6 m-0 ${
            i < ratingValue ? 'text-brand-yellow' : 'text-brand-lighter-gray'
          }`}
        >
          &#9733;
        </span>,
      )
    }
    return stars
  }

  const ratingCounts = useMemo(() => {
    const counts = { _1: 0, _2: 0, _3: 0, _4: 0, _5: 0 }
    reviews.forEach(review => {
      if (review?.rating && counts.hasOwnProperty(review.rating)) {
        counts[review.rating] += 1
      }
    })
    return counts
  }, [reviews])

  return (
    <div
      className="container mx-auto py-8 px-4
        lg:py-16 lg:px-8
        "
    >
      <div className="my-6">
        <Carousel
          autoPlay={true}
          autoPlaySpeed={3000}
          keyBoardControl={true}
          infinite={true}
          showDots={false}
          arrows={false}
          responsive={responsive}
        >
          {reviews.map((review, index) => (
            <div className="flex justify-start mx-[16px]" key={index}>
              <div className="text-brand-dark flex flex-col max-w-[640px] w-full text-left gap-3">
                <div className="flex flex-row gap-6 items-center">
                  <p className="text-b16 leading-headingLH2 font-semibold text-brand-dark">
                    {review?.name || 'Anonymous'}
                  </p>
                  <div className="flex gap-[2px]">{generateStars(review?.rating)}</div>
                </div>
                <p className="text-b14 leading-bodyLH font-normal text-brand-dark">
                  {review?.review || 'No review available'}
                </p>
              </div>
            </div>
          ))}
        </Carousel>
        <HR />
        <div className="flex flex-col gap-3">
          <div className="flex justify-start">
            <span className="text-h6 text-brand-dark leading-headingLH2 font-semibold m-0">
              Ratings
            </span>
          </div>
          {Object.entries(ratingCounts).map(([key, count]) => (
            <div className="flex flex-row gap-3 items-center" key={key}>
              <div className="flex gap-[2px]">{generateStars(key)}</div>
              <p className="text-b12 leading-headingLH2 font-normal text-brand-dark">
                {count} Reviews
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
