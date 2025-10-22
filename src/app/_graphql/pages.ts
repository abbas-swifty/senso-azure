import {
  ABOUT_BLOCK,
  ARCHIVE_BLOCK,
  BRAND_PROCESS_BLOCK,
  CALL_TO_ACTION,
  CONTENT,
  MEDIA_BLOCK,
  NEWS_LETTER_BLOCK,
  OUR_BRANDS_BLOCK,
  REVIEWS_BLOCK,
  RICH_TEXT_BLOCK,
  TEXT_WITH_IMAGE_BLOCK,
  DISTRIBUTORS_CAROUSEL,
  BRAND_OVERVIEW,
  CONTACT_FORM_BLOCK,
  INSTA_FEED_BLOCK,
} from './blocks'
import { LINK_FIELDS } from './link'
import { MEDIA } from './media'
import { META } from './meta'

export const PAGES = `
  query Pages {
    Pages(limit: 300, where: { slug: { not_equals: "cart" } })  {
      docs {
        slug
      }
    }
  }
`

export const PAGE = `
  query Page($slug: String, $draft: Boolean) {
    Pages(where: { AND: [{ slug: { equals: $slug }}] }, limit: 1, draft: $draft) {
      docs {
        id
        title
        hero {
          heading
          subHeading
          type
          richText
          links {
            link ${LINK_FIELDS()}
          }
          bannerOption
          ${MEDIA}
          heroBanners {
          ${MEDIA}
          }
        }
        layout {
          ${CONTENT}
          ${CALL_TO_ACTION}
          ${CONTENT}
          ${MEDIA_BLOCK}
          ${ARCHIVE_BLOCK}
          ${NEWS_LETTER_BLOCK}
          ${ABOUT_BLOCK}
          ${REVIEWS_BLOCK}
          ${TEXT_WITH_IMAGE_BLOCK}
          ${OUR_BRANDS_BLOCK}
          ${RICH_TEXT_BLOCK}
          ${BRAND_PROCESS_BLOCK}
          ${DISTRIBUTORS_CAROUSEL}
          ${BRAND_OVERVIEW}
          ${CONTACT_FORM_BLOCK}
          ${INSTA_FEED_BLOCK}
        }
        ${META}
      }
    }
  }
`
