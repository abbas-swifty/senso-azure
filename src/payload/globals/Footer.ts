import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Footer: GlobalConfig = {
  slug: 'footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'copyright',
      type: 'text',
      label: 'Copyright',
    },
    {
      name: 'navItemParent',
      type: 'array',
      fields: [
        {
          name: 'navTitle',
          type: 'text',
          required: true,
        },
        {
          name: 'navItems',
          type: 'array',
          maxRows: 6,
          fields: [
            link({
              appearances: false,
            }),
          ],
        }
      ]
    },
  ],
}
