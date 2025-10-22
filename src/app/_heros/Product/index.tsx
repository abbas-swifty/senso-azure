'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Image from 'next/image'

import { Product, ProductsReview } from '../../../payload/payload-types'
import { AddToCartButton } from '../../_components/AddToCartButton'
import { Price } from '../../_components/Price'
import ProductImages from './ProductImages'
import classes from './index.module.scss'
import { fetchDocs } from '../../_api/fetchDocs'
import { SkeletonLoader } from './skeleton-loader'
import { ProductReviewsWrapper } from '../../_components/ProductReviewsWrapper'

export const ProductHero: React.FC<{
  product: Product
}> = ({ product }) => {
  const {
    id,
    stripeProductID,
    title,
    shortDescription,
    categories,
    productImages,
    meta: { image: metaImage, description } = {},
  } = product

  const [quantity, setQuantity] = useState(1)
  const [productReviews, setProductReviews] = useState<ProductsReview[] | null>(null)
  const [loadingReviews, setLoadingReviews] = useState(true)

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const fetchedReviews = await fetchDocs<ProductsReview>('productsReviews')

        const filteredReviews = fetchedReviews.filter(review =>
          typeof review?.product === 'string' ? review?.product : review?.product?.id === id,
        )

        setProductReviews(filteredReviews)
      } catch (err) {
        console.log(err)
      } finally {
        setLoadingReviews(false)
      }
    }

    void fetchReviews()
  }, [id])

  const decrementQty = () => {
    const updatedQty = quantity > 1 ? quantity - 1 : 1
    setQuantity(updatedQty)
  }

  const incrementQty = () => {
    const updatedQty = quantity + 1
    setQuantity(updatedQty)
  }

  const enterQty = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedQty = Number(e.target.value)
    setQuantity(updatedQty)
  }

  return (
    <Fragment>
      <section className="">
        <div className="container mx-auto lg:pt-[160px] pt-[130px] pb-0 px-4 lg:pb-0 lg:px-8 flex flex-col">
          <div className="flex flex-col gap-6 items-center w-full lg:flex-row lg:gap-16">
            <div className="w-full max-w-[696px] lg:max-h-[650px]">
              <ProductImages productImages={productImages} />
            </div>
            <div className="w-full flex flex-col gap-5 max-w-[648px]">
              <div className="flex flex-col gap-2">
                <div className={classes.categories}>
                  {categories?.map((category, index) => {
                    if (typeof category === 'object' && category !== null) {
                      const { title: categoryTitle } = category
                      const titleToUse = categoryTitle || 'Untitled category'
                      const isLast = index === categories.length - 1
                      return (
                        <Fragment key={index}>
                          <p className="text-b12 text-brand-dark leading-headingLH1 tracking-wide capitalize">
                            {categoryTitle}
                            {!isLast && <Fragment>, </Fragment>}
                          </p>
                        </Fragment>
                      )
                    }
                    return null
                  })}
                </div>
                <div className="flex flex-col gap-0">
                  <h4 className="text-h4 text-black leading-headingLH2">{title}</h4>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-brand-dark text-b16 leading-headingLH1 font-semibold">
                  Available
                </p>
                <div
                  className={`py-2 px-6 rounded-3xl w-fit ${
                    product.productStatus === 'outOfStock' ? 'bg-brand-red' : 'bg-brand-green'
                  }`}
                >
                  <p className="text-white text-16 leading-6 font-normal">
                    {product.productStatus === 'outOfStock' ? 'Out of Stock' : 'In Stock'}
                  </p>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-brand-dark text-b16 leading-headingLH1 font-semibold">Price</p>
                <Price product={product} button={false} />
              </div>
              <div className="flex flex-row w-full justify-between items-center">
                <div>
                  <p></p>
                </div>
                {product.productStatus !== 'outOfStock' && (
                  <div className="flex flex-row w-full justify-between items-center gap-4">
                    <div className={classes.quantity}>
                      <div className={classes.quantityBtn} onClick={decrementQty}>
                        <Image
                          src="/assets/icons/minus.svg"
                          alt="minus"
                          width={24}
                          height={24}
                          className={classes.qtnBt}
                        />
                      </div>
                      <input
                        type="text"
                        className={classes.quantityInput}
                        value={quantity}
                        onChange={enterQty}
                      />
                      <div className={classes.quantityBtn} onClick={incrementQty}>
                        <Image
                          src="/assets/icons/plus.svg"
                          alt="plus"
                          width={24}
                          height={24}
                          className={classes.qtnBt}
                        />
                      </div>
                    </div>
                    <AddToCartButton
                      quantity={quantity}
                      product={product}
                      className={classes.addToCartButton}
                    />
                  </div>
                )}
              </div>
              <div className="flex text-center justify-center">
                <p className={'text-b16 text-brand-dark leading-bodyLH font-normal text-center'}>
                  {shortDescription ? `${shortDescription} ` : ''}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-12">
            {loadingReviews ? (
              <div className="skeleton-loader">
                <SkeletonLoader />
              </div>
            ) : productReviews && productReviews.length > 0 ? (
              <ProductReviewsWrapper reviews={productReviews} />
            ) : (
              <></>
            )}
          </div>
        </div>
      </section>
    </Fragment>
  )
}
