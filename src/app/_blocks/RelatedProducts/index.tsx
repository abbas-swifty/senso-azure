'use client'

import React from 'react'

import { Product } from '../../../payload/payload-types'
import { Card } from '../../_components/Card'
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import { ProductsCarousel } from '../../_components/ProductsCarousel'

export type RelatedProductsProps = {
  blockType: 'relatedProducts'
  blockName: string
  introContent?: any
  docs?: (string | Product)[]
  relationTo: 'products'
}

export const RelatedProducts: React.FC<RelatedProductsProps> = props => {
  const { introContent, docs, relationTo } = props

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

  return (
    <section className={classes.relatedProducts}>
      <div className="container mx-auto py-8 px-6 lg:py-16 lg:px-8">
        <div className="flex justify-center items-center py-8 text-center">
          {introContent && <RichText className="text-brand-dark" content={introContent} />}
        </div>
        <div className="pb-[40px] lg:pb-[80px]">
          <Carousel
            autoPlay={true}
            autoPlaySpeed={2500}
            keyBoardControl={true}
            removeArrowOnDeviceType={['tablet', 'mobile']}
            infinite={true}
            showDots={false}
            responsive={responsive}
          >
            {docs?.map((result, index) => {
              if (typeof result === 'object' && result !== null) {
                return (
                  <div key={index} className='mx-[16px]'>
                    <ProductsCarousel doc={result} relationTo={relationTo} showCategories={true} />
                  </div>
                )
              }
              return null
            })}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
