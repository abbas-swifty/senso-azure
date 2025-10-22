export const REVIEWS_QUERY = `
  query Reviews {
    Reviews(limit: 300) {
      docs {
        text
        name
      }
    }
  }
`
