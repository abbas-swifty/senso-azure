import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const InstaFeedBlock: Block = {
  slug: 'instaFeedBlock',
  fields: [
    {
      name: 'heading',
      type: 'text',
      label: 'Instagram Username',
    },
    {
      name: 'subHeading',
      type: 'text',
      label: 'Short Description',
    },
  ],
}
