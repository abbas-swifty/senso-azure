import { PRODUCT_CATEGORIES } from './categories'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const CALL_TO_ACTION = `
...on Cta {
  blockType
  invertBackground
  richText
  links {
    link ${LINK_FIELDS()}
  }
}
`

export const NEWS_LETTER_BLOCK = `
...on NewsLetterBlock {
  blockType
  richText
}
`
export const ABOUT_BLOCK = `
...on AboutBlock {
  blockType
  richText
  link ${LINK_FIELDS()}
  ${MEDIA}
}
`

export const REVIEWS_BLOCK = `
...on ReviewsBlock {
  blockType
  title
}
`

export const CONTENT = `
...on Content {
  blockType
  invertBackground
  columns {
    size
    richText
    enableLink
    link ${LINK_FIELDS()}
  }
}
`

export const MEDIA_BLOCK = `
...on MediaBlock {
  blockType
  invertBackground
  position
  ${MEDIA}
}
`

export const ARCHIVE_BLOCK = `
...on Archive {
  blockType
  displayAs
  introContent
  populateBy
  relationTo
  ${PRODUCT_CATEGORIES}
  limit
  selectedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
        ${META}
      }
    }
  }
  populatedDocs {
    relationTo
    value {
      ...on Product {
        id
        slug
        title
        priceJSON
        ${PRODUCT_CATEGORIES}
        ${META}
      }
    }
  }
  populatedDocsTotal
}
`

export const TEXT_WITH_IMAGE_BLOCK = `
...on TextWithImageBlock {
  blockType
  imagePosition
  richText
  ${MEDIA}
}
`
export const OUR_BRANDS_BLOCK = `
...on OurBrandsBlock {
  blockType
  backgroundColor
  richText
  title
  brands {
    id
    ${MEDIA}
  }
}
`
export const RICH_TEXT_BLOCK = `
...on RichTextBlock {
  blockType
  richText
  contentAlignment
}
`
export const BRAND_PROCESS_BLOCK = `
...on BrandProcessBlock {
  blockType
  richText
  cardsHeading
  cards {
    id
    ${MEDIA}
    heading
    content
  }
  processHeading
  processContent
}
`

export const DISTRIBUTORS_CAROUSEL = `
...on DistributorsCarousel {
  blockType
  richText
}
`

export const BRAND_OVERVIEW = `
...on BrandOverview {
  blockType
  richText
  ${MEDIA}
  brandTimeLine {
    year
    shortInformation
    shortDescription
  }
}
`

export const PRODUCT_LONG_DESCRIPTION = `
...on ProductLongDescription {
  blockType
  richText
}
`

export const PRODUCT_REVIEWS_BLOCK = `
...on ProductReviewsBlock {
  blockType
  title
  productReviews {
    name
    rating
    review
  }
}
`

export const CONTACT_FORM_BLOCK = `
...on ContactformBlock {
  blockType
  richText
  ${MEDIA}
}
`
export const INSTA_FEED_BLOCK = `
...on InstaFeedBlock {
  blockType
  heading
  subHeading
}
`
