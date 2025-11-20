const DEFAULT_INTERNAL_URL = `http://127.0.0.1:${process.env.PORT || 5000}`

const isServer = typeof window === 'undefined'

export const GRAPHQL_API_URL =
  process.env.NEXT_BUILD || isServer ? DEFAULT_INTERNAL_URL : process.env.NEXT_PUBLIC_SERVER_URL
