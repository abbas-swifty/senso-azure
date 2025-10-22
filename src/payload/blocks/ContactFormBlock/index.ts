import type { Block } from 'payload/types'
import richText from '../../fields/richText'

export const ContactFormBlock: Block = {
  slug: 'contactformBlock',
  labels: {
    singular: 'Contact',
    plural: 'Contacts',
  },
  fields: [
    richText(),
    {
      name: 'media',
      type: 'upload',
      label: 'Contact Form Banner',
      relationTo: 'media',
      required: true,
    },
  ],
}
