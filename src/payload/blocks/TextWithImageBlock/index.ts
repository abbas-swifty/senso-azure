import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'
import link from '../../fields/link'

export const TextWithImageBlock: Block = {
  slug: 'textWithImageBlock',
  fields: [
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'left',
      options: [
        {
          label: 'Left',
          value: 'left',
        },
        {
          label: 'Right',
          value: 'right',
        },
      ],
    },
    richText(),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
}
