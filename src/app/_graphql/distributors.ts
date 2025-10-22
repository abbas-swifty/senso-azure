export const DISTRIBUTORS = `
  query Distributors {
    Distributors(limit: 300) {
      docs {
        id
        fullName
        email
        address
        phoneNumber
        company
      }
    }
  }
`
