'use client'

import React, { useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Order } from '../../../../payload/payload-types'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import { priceFromJSON } from '../../../_components/Price'
import { useCart } from '../../../_providers/Cart'
import { useCurrency } from '../../../_providers/CurrencyContext'
import classes from './index.module.scss'
import { Input } from '../../../_components/Input'
import ReviewModal from '../ReviewModal'

type FormData = {
  customerName: string
  customerContactNumber: string
  customerEmail: string
  customerAddress: string
  homeAddress: string
  streetNo: string
  descriptiveAddress: string
  city: string
  postalCode: string
}

export const CheckoutForm: React.FC<{}> = () => {
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const router = useRouter()
  const { cart, cartTotal } = useCart()
  const { currency } = useCurrency()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      setIsLoading(true)

      try {
        const orderReq = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/orders`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            total: cartTotal.raw,
            stripePaymentIntentID: null,
            items: (cart?.items || [])?.map(({ product, quantity }) => ({
              product: typeof product === 'string' ? product : product.id,
              quantity,
              price:
                typeof product === 'object'
                  ? priceFromJSON(product.priceJSON, 1, currency)
                  : undefined,
            })),
            customerName: data.customerName,
            customerContactNumber: data.customerContactNumber,
            customerEmail: data.customerEmail,
            customerAddress: data.customerAddress,
            homeAddress: data.homeAddress,
            streetNo: data.streetNo,
            descriptiveAddress: data.descriptiveAddress,
            city: data.city,
            postalCode: data.postalCode,
          }),
        })

        if (!orderReq.ok) throw new Error(orderReq.statusText || 'Something went wrong.')

        const {
          error: errorFromRes,
          doc,
        }: {
          message?: string
          error?: string
          doc: Order
        } = await orderReq.json()

        if (errorFromRes) throw new Error(errorFromRes)

        router.push(`/order-confirmation?order_id=${doc.id}`)
      } catch (err) {
        const msg = err instanceof Error ? err.message : 'Something went wrong.'
        setError(`Error while submitting payment: ${msg}`)
        setIsLoading(false)
      }
    },
    [router, cart, cartTotal, currency],
  )

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
      {error && <Message error={error} />}
      {cart && cart?.items?.length > 0 && (
        <ReviewModal
          productIds={(cart?.items || []).map(item =>
            typeof item.product === 'string' ? item.product : item.product.id,
          )}
        />
      )}
      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[780px]">
        <Input
          name="customerName"
          label="Full Name*"
          required
          register={register}
          disabled={isLoading}
          error={errors.customerName}
          type="text"
        />
        <Input
          name="customerContactNumber"
          label="Contact Number*"
          required
          register={register}
          disabled={isLoading}
          error={errors.customerContactNumber}
          type="tel"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[780px]">
        <Input
          name="customerEmail"
          label="Email Address*"
          required
          disabled={isLoading}
          register={register}
          error={errors.customerEmail}
          type="email"
        />
        <Input
          name="customerAddress"
          label="Full Address*"
          required
          disabled={isLoading}
          register={register}
          error={errors.customerAddress}
          type="text"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[780px]">
        <Input
          name="homeAddress"
          label="Home Address (optional)"
          disabled={isLoading}
          register={register}
          error={errors.homeAddress}
          type="text"
        />
        <Input
          name="postalCode"
          label="Postal Code*"
          required
          disabled={isLoading}
          register={register}
          error={errors.postalCode}
          type="text"
        />
      </div>

      <div className="flex flex-col lg:flex-row gap-6 w-full max-w-[780px]">
        <Input
          name="descriptiveAddress"
          label="Apartment, suite, etc. (optional)"
          disabled={isLoading}
          register={register}
          error={errors.descriptiveAddress}
          type="text"
        />
        <Input
          name="streetNo"
          label="Street Number"
          disabled={isLoading}
          register={register}
          error={errors.streetNo}
          type="text"
        />
        <Input
          name="city"
          label="City"
          disabled={isLoading}
          register={register}
          error={errors.city}
          type="text"
        />
      </div>
      <div className={classes.actions}>
        <Button label="Back to cart" href="/cart" appearance="primary" />
        <Button
          label={isLoading ? 'Loading...' : 'Checkout'}
          type="submit"
          appearance="primary"
          disabled={isLoading}
        />
      </div>
    </form>
  )
}

export default CheckoutForm
