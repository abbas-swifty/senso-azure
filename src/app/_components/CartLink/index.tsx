'use client'

import React, { Fragment, useEffect, useState } from 'react'
import Link from 'next/link'
import NextImage from 'next/image'
import { useCart } from '../../_providers/Cart'

import classes from './index.module.scss'

export const CartLink: React.FC<{
  className?: string
}> = props => {
  const { className } = props
  const { cart } = useCart()
  const [length, setLength] = useState<number>()

  useEffect(() => {
    setLength(cart?.items?.length || 0)
  }, [cart])

  return (
    <Link className={[classes.cartLink, className].filter(Boolean).join(' ')} href="/cart">
      <Fragment>
        {/* Cart */}
        <NextImage className="invert" width={24} height={24} src={'/cart-icon.svg'} alt={'Cart'}></NextImage>
        {typeof length === 'number' && length > 0 && (
          <small className="flex px-1 text-white font-semibold text-b14 text-whtie top-[-2px]">
            ({length})
          </small>
        )}
      </Fragment>
    </Link>
  )
}
