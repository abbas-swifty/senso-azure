'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

import { Settings } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { useCart } from '../../../_providers/Cart'
import { CheckoutForm } from '../CheckoutForm'
import { CheckoutItem } from '../CheckoutItem'

import classes from './index.module.scss'
import { applyCoupon } from '../../../_api/couponUtils'

export const CheckoutPage: React.FC<{
  settings: Settings
}> = props => {
  const {
    settings: { productsPage, enableDelivery, deliveryValue },
  } = props

  const { user } = useAuth()
  const router = useRouter()
  const { cart, cartIsEmpty, cartTotal } = useCart()
  const cartTotalAmount = parseFloat(cartTotal.formatted.replace(/[^0-9.-]+/g, ''))
  const deliveryAmount = deliveryValue
  const [couponCode, setCouponCode] = useState<string>('')
  const [discount, setDiscount] = useState<number>(0)
  const [loading, setLoading] = useState<Boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (user !== null && cartIsEmpty) {
      router.push('/cart')
    }
  }, [router, user, cartIsEmpty])

  const handleApplyCoupon = async () => {
    setLoading(true)
    setError(null)
    try {
      const discountAmount = await applyCoupon(couponCode, cart, cartTotal.raw);
      setDiscount(discountAmount)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('An error occurred while applying the coupon.')
      }
    } finally {
      setLoading(false)
    }
  }

  const finalTotal = cartTotalAmount - discount
  cartTotal.raw = finalTotal;
  return (
    <Fragment>
      {cartIsEmpty && (
        <div>
          {'Your '}
          <Link href="/cart">cart</Link>
          {' is empty.'}
          {typeof productsPage === 'object' && productsPage?.slug && (
            <Fragment>
              {' '}
              <Link href={`/${productsPage.slug}`}>Continue shopping?</Link>
            </Fragment>
          )}
        </div>
      )}
      {!cartIsEmpty && (
        <div className="flex flex-col lg:flex-row lg:gap-[64px] px-[32px]">
          <div className={[classes.item, 'flex-1'].filter(Boolean).join(' ')}>
            <div className={classes.header}>
              <p>Products</p>
              <div className={classes.headerItemDetails}>
                <p></p>
                <p className={classes.quantity}>Quantity</p>
              </div>
              <p className={classes.subtotal}>Subtotal</p>
            </div>

            <ul className="p-0">
              {cart?.items?.map((item, index) => {
                if (typeof item.product === 'object') {
                  const {
                    quantity,
                    product,
                    product: { title, meta },
                  } = item

                  if (!quantity) return null

                  const metaImage = meta?.image

                  return (
                    <Fragment key={index}>
                      <CheckoutItem
                        product={product}
                        title={title}
                        metaImage={metaImage}
                        quantity={quantity}
                        index={index}
                      />
                    </Fragment>
                  )
                }
                return null
              })}
              {enableDelivery && cartTotal.formatted && (
                <div className="mt-[24px]">
                  {cartTotalAmount >= deliveryAmount ? (
                    <div className="flex items-center gap-[12px] justify-center">
                      <h6
                        className={`text-gradient-delivery text-transparent bg-clip-text text-h5 font-semibold leading-[120%] ${classes.textGradientDelivery}`}
                      >
                        Congratulations! You’ve Earned Free Delivery!
                      </h6>
                    </div>
                  ) : (
                    <div>
                      {/* <p className='text-h6 font-medium leading-[120%] text-brand-red'>Spend ${deliveryAmount - cartTotalAmount} more for free delivery.</p> */}
                    </div>
                  )}
                </div>
              )}
              <div className={classes.orderTotal}>
                <p className="text-b18 font-semibold leading-headingLH1 text-brand-dark">
                  Order Total
                </p>
                <p className="text-b18 font-semibold leading-headingLH1 text-brand-dark">
                  LBP {cartTotal.raw.toFixed(2)}
                </p>
              </div>
            </ul>
          </div>
          <div className="p-[16px] bg-white shadow-xl rounded-xl flex flex-col h-fit gap-[12px] max-w-[350px] w-full">
            <input
              type="text"
              value={couponCode}
              onChange={e => setCouponCode(e.target.value)}
              placeholder="Enter coupon code"
              className="appearance-none outline-none border-none px-[14px] py-[14px] bg-brand-orange/15 rounded-lg
              focus:outline focus:outline-brand-orange focus:outline-[0.5px] duration-300 ease-in-out"
            />
            <button
              className="appearance-none outline-none border-none bg-brand-orange text-white rounded-lg 
            py-[12px] px-[12px] cursor-pointer hover:bg-brand-orange/85 duration-300 ease-in-out"
              onClick={handleApplyCoupon}
              disabled={loading ? true : false}
            >
              {loading ? 'Applying...' : 'Apply Coupon'}
            </button>
            {discount > 0 && (
              <p className="text-b12 text-green-400 leading-[120%]">
                Discount Applied: ${discount.toFixed(2)}
              </p>
            )}
            {error && <p className="text-b12 text-red-400 leading-[120%]">{error}</p>}
          </div>
        </div>
      )}
      {!cartIsEmpty && <CheckoutForm />}
    </Fragment>
  )
}
