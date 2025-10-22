'use client'

import React, { useEffect, useState } from 'react'
import { Product } from '../../../payload/payload-types'
import { AddToCartButton } from '../AddToCartButton'
import { RemoveFromCartButton } from '../RemoveFromCartButton'
import classes from './index.module.scss'
import { useCurrency } from '../../_providers/CurrencyContext'

export const priceFromJSON = (priceJSON: string, quantity: number = 1, currency: string): string => {
  let price = ''

  if (priceJSON) {
    try {
      const parsedPrice = parseFloat(priceJSON) * quantity
      price = parsedPrice.toLocaleString('en-US', {
        style: 'decimal',
      })
    } catch (e) {
      console.error('Cannot parse priceJSON')
    }
  }

  return price
}

export const Price: React.FC<{
  product: Product
  quantity?: number
  button?: 'addToCart' | 'removeFromCart' | false
}> = props => {
  const { product, product: { priceJSON } = {}, button = 'addToCart', quantity } = props
  const { currency } = useCurrency()

  const [price, setPrice] = useState<{
    actualPrice: string
    withQuantity: string
  }>({
    actualPrice: '',
    withQuantity: '',
  })

  useEffect(() => {
    const updatePrices = () => {
      setPrice({
        actualPrice: priceFromJSON(priceJSON, 1, currency),
        withQuantity: priceFromJSON(priceJSON, quantity || 1, currency),
      })
    }

    updatePrices()
  }, [priceJSON, quantity, currency])

  return (
    <div className='flex flex-col flex-wrap w-full gap-[12px]'>
      {price?.actualPrice && price?.withQuantity && (
        <div className={classes.price}>
          <p className="text-b16 text-brand-dark leading-headingLH2">{price?.withQuantity} {currency}</p>
          {quantity && quantity > 1 && (
            <small className="text-b16 text-brand-dark leading-headingLH2">{`${price.actualPrice} x ${quantity} ${currency}`}</small>
          )}
        </div>
      )}
      {product.productStatus === 'inStock' ? (
        button === 'addToCart' ? (
          <AddToCartButton product={product} appearance="primary" />
        ) : button === 'removeFromCart' ? (
          <RemoveFromCartButton product={product} />
        ) : null
      ) : (
        button && (
          <div className="text-brand-dark text-b16 leading-headingLH2 font-normal rounded-xl">
            Out of Stock
          </div>
        )
      )}
    </div>
  )
}
