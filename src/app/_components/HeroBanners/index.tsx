'use client'

import React from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { Page } from '../../../payload/payload-types'

import classes from './index.module.scss'
import Image from 'next/image'

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    partialVisibilityGutter: 40,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    partialVisibilityGutter: 30,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    partialVisibilityGutter: 20,
  },
}

const HeroBannerCarousel: React.FC<Page['hero']> = ({ heroBanners }) => {
  return (
    <Carousel
      responsive={responsive}
      infinite
      showDots={false}
      arrows={false}
      autoPlay
      autoPlaySpeed={3000}
      transitionDuration={500}
      containerClass={classes.carouselContainerHero}
      itemClass={classes.carouselItemHero}
    >
      {heroBanners.map((banner, index) => {
        const filename =
          banner?.media && typeof banner?.media !== 'string' && banner?.media?.filename
        return (
          <div key={index} className={classes.carouselImageWrapperHero}>
            <Image
              width={1280}
              height={720}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
              alt={`Banner ${index + 1}`}
              className="w-full max-h-full object-cover object-center"
            />
          </div>
        )
      })}
    </Carousel>
  )
}

export default HeroBannerCarousel
