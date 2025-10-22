import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import linkGroup from '../../fields/linkGroup'

export const OurBrandsBlock: Block = {
  slug: 'ourBrandsBlock',
  fields: [
    {
      name: 'backgroundColor',
      label: 'Select background Color',
      type: 'select',
      defaultValue: 'blue',
      options: [
        {
          label: 'Blue',
          value: 'blue',
        },
        {
          label: 'White',
          value: 'white',
        },
        {
          label: 'Brown',
          value: 'brown',
        },
      ],
    },
    richText(),
    {
      name: 'title',
      type: 'text',
      label: 'Our brands list title',
    },
    {
      name: 'brands',
      label: 'Brands we helped',
      type: 'array',
      fields: [
        {
          name: 'media',
          type: 'upload',
          label: 'Brand Logo',
          relationTo: 'media',
          required: true,
        },
      ],
    },
  ],
}
