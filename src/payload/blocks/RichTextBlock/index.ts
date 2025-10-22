import { Block } from 'payload/types'
import richText from '../../fields/richText'

export const RichTextBlock: Block = {
  slug: 'richTextBlock',
  labels: {
    singular: 'Rich Text Block',
    plural: 'Rich Text Blocks',
  },
  fields: [
    richText(),
    {
      name: 'contentAlignment',
      type: 'select',
      label: 'Content Alignment',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Center',
          value: 'center',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
  ],
}
