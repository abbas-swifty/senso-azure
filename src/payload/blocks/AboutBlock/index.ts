import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import link from '../../fields/link'

export const AboutBlock: Block = {
  slug: 'aboutBlock',
  labels: {
    singular: 'About Block',
    plural: 'About Blocks',
  },
  fields: [
    richText(),
    link(),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
