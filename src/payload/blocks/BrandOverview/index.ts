import type { Block } from 'payload/types'
import richText from '../../fields/richText'
import link from '../../fields/link'

export const BrandOverview: Block = {
  slug: 'brandOverview',
  labels: {
    singular: 'Brand Overview',
    plural: 'Brands Overview',
  },
  fields: [
    richText(),
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'brandTimeLine',
      type: 'array',
      label: 'Brand Time Line',
      fields: [
        {
          name: 'year',
          label: 'Year',
          type: 'text',
          required: true,
        },
        {
          name: 'shortInformation',
          label: 'Short Information',
          type: 'text',
          required: true,
        },
        {
          name: 'shortDescription',
          label: 'Short Description',
          type: 'text',
          required: true,
        },
      ],
    },
  ],
}
