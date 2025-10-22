import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const BrandProcessBlock: Block = {
  slug: 'brandProcessBlock',
  fields: [
    richText(),
    {
      name: 'cardsHeading',
      type: 'text',
      label: 'Cards Heading',
    },
    {
      name: 'cards',
      label: 'Cards',
      type: 'array',
      maxRows: 3,
      fields: [
        {
          name: 'media',
          type: 'upload',
          relationTo: 'media',
          label: 'Select Card Icon',
        },
        {
          name: 'heading',
          type: 'text',
          label: 'Card Title',
        },
        {
          name: 'content',
          type: 'textarea',
          label: 'Card Description',
        },
      ],
    },
    {
      name: 'processHeading',
      type: 'text',
      label: 'Process Heading',
    },
    richText({
      name: 'processContent',
      label: 'Steps in your process',
      required: false,
    }),
  ],
}
