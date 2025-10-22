import type { Field } from 'payload/types'

import linkGroup from './linkGroup'
import richText from './richText'
import label from './richText/label'
import largeBody from './richText/largeBody'

export const hero: Field = {
  name: 'hero',
  label: false,
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      required: true,
      defaultValue: 'lowImpact',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'High Impact',
          value: 'highImpact',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
        },
      ],
    },
    {
      name: 'heading',
      type: 'text',
    },
    {
      name: 'subHeading',
      type: 'text',
    },
    richText({
      hidden: true,
      required: false,
      admin: {
        elements: ['h1', largeBody, label, 'link'],
        leaves: [],
      },
    }),
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'bannerOption',
      type: 'select',
      label: 'Banner Options',
      defaultValue: 'singlePicture',
      admin: {
        condition: (_, {type} = {}) => ['highImpact'].includes(type),
      },
      options: [
        {
          label: 'Single Picture',
          value: 'singlePicture',
        },
        {
          label: 'Multiple Pictures',
          value: 'multiplePictures',
        }
      ]
    },
    {
      name: 'media',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        condition: (_, { bannerOption } = {}) => ['singlePicture'].includes(bannerOption),
      },
    },
    {
      name: 'heroBanners',
      type: 'array',
      label: 'Hero Banners',
      admin: {
        condition: (_, { bannerOption } = {}) => ['multiplePictures'].includes(bannerOption),
      },
      fields: [
        {
          name:'media',
          type: 'upload',
          relationTo:'media',
          required: true,
        }
      ]
    }
  ],
}
