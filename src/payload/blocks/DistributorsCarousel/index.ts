import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import link from '../../fields/link'

export const DistributorsCarousel: Block = {
  slug: 'distributorsCarousel',
  labels: {
    singular: 'Distributor Carousel',
    plural: 'Distributors Carousel',
  },
  fields: [
    richText({
      label: 'Distributors Carousel Heading',
      required: false,
    }),
  ],
}
