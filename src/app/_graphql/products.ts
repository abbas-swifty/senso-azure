import {
  ARCHIVE_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  MEDIA_BLOCK,
  PRODUCT_LONG_DESCRIPTION,
  PRODUCT_REVIEWS_BLOCK,
} from './blocks'
import { PRODUCT_CATEGORIES } from './categories'
import { MEDIA } from './media'
import { META } from './meta'

export const PRODUCTS = `
  query Products {
    Products(limit: 300) {
      docs {
        slug
      }
    }
  }
`

export const PRODUCT = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        id
        title
        shortDescription
        stripeProductID
        ${PRODUCT_CATEGORIES}
        layout {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
          ${PRODUCT_LONG_DESCRIPTION}
          ${PRODUCT_REVIEWS_BLOCK}
        }
        productStatus
        priceJSON
        productImages {
          ${MEDIA}
        }
        enablePaywall
        relatedProducts {
          id
          slug
          title
          productStatus
          priceJSON
          ${META}
        }
        ${META}
      }
    }
  }
`

export const PRODUCT_PAYWALL = `
  query Product($slug: String, $draft: Boolean) {
    Products(where: { slug: { equals: $slug}}, limit: 1, draft: $draft) {
      docs {
        paywall {
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
        }
      }
    }
  }
`
