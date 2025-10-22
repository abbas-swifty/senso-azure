import Link from 'next/link'

import { Media } from '../../../_components/Media'
import { Price } from '../../../_components/Price'

import classes from './index.module.scss'

export const CheckoutItem = ({ product, title, metaImage, quantity, index }) => {
  return (
    <li className={classes.item} key={index}>
      <Link href={`/products/${product.slug}`} className={classes.mediaWrapper}>
        {!metaImage && <span>No image</span>}
        {metaImage && typeof metaImage !== 'string' && (
          <Media className={classes.media} imgClassName={classes.image} resource={metaImage} fill />
        )}
      </Link>

      <div className={classes.itemDetails}>
        <div className={classes.titleWrapper}>
          <h6 className="text-h6 text-brand-dark font-medium leading-headingLH1">{title}</h6>
          <Price product={product} button={false} />
        </div>
        <p className={'text-b18 text-brand-dark leading-headingLH1 text-start lg:text-center'}>
          x{quantity}
        </p>
      </div>

      <div className={classes.subtotal}>
        <Price product={product} button={false} quantity={quantity} />
      </div>
    </li>
  )
}
