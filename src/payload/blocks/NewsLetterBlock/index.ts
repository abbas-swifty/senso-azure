import type { Block } from 'payload/types'
import richText from '../../fields/richText'

export const NewsLetterBlock: Block = {
  slug: 'newsLetterBlock',
  labels: {
    singular: 'News Letter',
    plural: 'News Letters',
  },
  fields: [
    richText(),
  ],
}