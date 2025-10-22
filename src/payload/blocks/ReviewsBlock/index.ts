import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import link from '../../fields/link'

export const ReviewsBlock: Block = {
  slug: 'reviewsBlock',
  labels: {
    singular: 'Review Block',
    plural: 'Reviews Block',
  },
  fields: [
    {
      type: "text",
      name: "title",
      label: "Reviews section title",
    }
  ],
}