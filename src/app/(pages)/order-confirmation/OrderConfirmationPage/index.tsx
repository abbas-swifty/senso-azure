'use client'

import React, { Fragment, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'

import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { useCart } from '../../../_providers/Cart'

import classes from './index.module.scss'

export const OrderConfirmationPage: React.FC<{}> = () => {
  const searchParams = useSearchParams()
  const orderID = searchParams.get('order_id')
  const error = searchParams.get('error')

  const { clearCart } = useCart()

  useEffect(() => {
    clearCart()
  }, [clearCart])

  return (
    <div>
      {error ? (
        <Fragment>
          <Message error={error} />
          <p>
            {`Your payment was successful but there was an error processing your order. Please contact us to resolve this issue.`}
          </p>
          <div className={classes.actions}>
            <Button href="/account" label="View account" appearance="primary" />
            <Button
              href={`${process.env.NEXT_PUBLIC_SERVER_URL}/orders`}
              label="View all orders"
              appearance="primary"
            />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="flex flex-col gap-3 justify-center items-center">
            <h1 className="text-h3 lg:text-h1 text-brand-primary font-bold leading-headingLH1">
              Thank you for your order!
            </h1>
            <p className="lg:text-b16 text-b14 text-center text-brand-dark font-normal leading-subHeadingLH2 max-w-[620px]">
              {`Your order has been confirmed. We will get in touch with you soon. Your order ID is ${orderID}.`}
              {/* You will receive an email confirmation shortly */}
            </p>
            <div className={classes.actions}>
              <Button href={`/account/orders/${orderID}`} label="View order" appearance="primary" />
              <Button
                href={`${process.env.NEXT_PUBLIC_SERVER_URL}/account/orders`}
                label="View all orders"
                appearance="primary"
              />
            </div>
          </div>
        </Fragment>
      )}
    </div>
  )
}
