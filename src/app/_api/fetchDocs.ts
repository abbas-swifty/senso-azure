import type { RequestCookie } from 'next/dist/compiled/@edge-runtime/cookies'

import type { Config } from '../../payload/payload-types'
import { ORDERS } from '../_graphql/orders'
import { PAGES } from '../_graphql/pages'
import { PRODUCTS } from '../_graphql/products'
import { GRAPHQL_API_URL } from './shared'
import { payloadToken } from './token'
import { CATEGORIES } from '../_graphql/categories'
import { DISTRIBUTORS } from '../_graphql/distributors'
import { REVIEWS_QUERY } from '../_graphql/reviews'
import { PRODUCTS_REVIEWS_QUERY } from '../_graphql/products-reviews'
import { COUPONS } from '../_graphql/coupons'

const queryMap = {
  pages: {
    query: PAGES,
    key: 'Pages',
  },
  products: {
    query: PRODUCTS,
    key: 'Products',
  },
  orders: {
    query: ORDERS,
    key: 'Orders',
  },
  categories: {
    query: CATEGORIES,
    key: 'Categories',
  },
  distributors: {
    query: DISTRIBUTORS,
    key: 'Distributors',
  },
  reviews: {
    query: REVIEWS_QUERY,
    key: 'Reviews',
  },
  productsReviews: {
    query: PRODUCTS_REVIEWS_QUERY,
    key: 'ProductsReviews',
  },
  coupons: {
    query: COUPONS,
    key: 'Coupons',
  }
}

export const fetchDocs = async <T>(
  collection: keyof Config['collections'],
  draft?: boolean,
): Promise<T[]> => {
  if (!queryMap[collection]) throw new Error(`Collection ${collection} not found`)

  let token: RequestCookie | undefined

  if (draft) {
    const { cookies } = await import('next/headers')
    token = cookies().get(payloadToken)
  }

  const docs: T[] = await fetch(`${GRAPHQL_API_URL}/api/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(token?.value && draft ? { Authorization: `JWT ${token.value}` } : {}),
    },
    cache: 'no-store',
    next: { tags: [collection] },
    body: JSON.stringify({
      query: queryMap[collection].query,
    }),
  })
    ?.then(res => res.json())
    ?.then(res => {
      if (res.errors) throw new Error(res?.errors?.[0]?.message ?? 'Error fetching docs')

      return res?.data?.[queryMap[collection].key]?.docs
    })

  return docs
}
