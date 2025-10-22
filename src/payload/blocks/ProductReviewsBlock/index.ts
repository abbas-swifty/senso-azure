import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import link from '../../fields/link'

export const ProductReviewsBlock: Block = {
  slug: 'productReviewsBlock',
  labels: {
    singular: 'Product Review Block',
    plural: 'Product Reviews Block',
  },
  fields: [
    {
      type: "text",
      name: "title",
      label: "Reviews section title",
    },
    {
      type: 'array',
      name: 'productReviews',
      label: 'Product Reviews',
      fields: [
        {
          type: "text",
          name: "name",
          label: "Person Name",
        },
        {
          type: 'select',
          name: "rating",
          label: "Rating",
          options: [
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
            {
              label: '4',
              value: '4',
            },
            {
              label: '5',
              value: '5',
            },
          ]
        },
        {
          type: "textarea",
          name: "review",
          label: "Review",
        }
      ]
    }
  ],
}