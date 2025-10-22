import type { Block } from 'payload/types'
import richText from '../../fields/richText'

export const ProductLongDescription: Block = {
  slug: 'productLongDescription',
  labels: {
    singular: 'Product Long Description',
    plural: 'Products Long Description',
  },
  fields: [richText()],
}
