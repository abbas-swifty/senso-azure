export const PRODUCTS_REVIEWS_QUERY = `
  query ProductsReviews {
    ProductsReviews(limit: 300) {
      docs {
        text
        name
        rating
        product {
        id
        title
        }
      }
    }
  }
`
