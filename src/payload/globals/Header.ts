import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Header: GlobalConfig = {
  slug: 'header',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      type: 'array',
      maxRows: 8,
      fields: [
        {
          name: 'enableSubMenu',
          type: 'checkbox',
        },
        link({
          appearances: false,
        }),
        {
          name: 'subMenuItems',
          label: 'Sub Menu Navigations',
          type: 'array',
          admin: {
            condition: (__, { enableSubMenu }) => Boolean(enableSubMenu),
          },
          fields: [
            {
              name: 'showAs',
              type: 'select',
              label: 'Show Submenu As',
              defaultValue: 'list',
              options: [
                {
                  label: 'List',
                  value: 'list',
                },
                {
                  label: 'Banner',
                  value: 'banner',
                },
              ],
            },
            {
              name: 'menuHeading',
              label: 'Menu Heading',
              type: 'text',
              required: true,
            },
            {
              name: 'subMenuLinks',
              label: 'Sub Menu Links',
              type: 'array',
              fields: [
                {
                  name: 'media',
                  label: 'Menu Item Banner',
                  type: 'upload',
                  relationTo: 'media',
                },
                link({ appearances: false }),
                {
                  name: 'enableSubMenuTwo',
                  type: 'checkbox',
                  label: 'Add Sub Menu Two',
                },
                {
                  name: 'subMenuTwo',
                  label: 'Sub Meny Level Two',
                  type: 'array',
                  admin: {
                    condition: (_, { enableSubMenuTwo }) => Boolean(enableSubMenuTwo),
                  },
                  fields: [
                    {
                      name: 'media',
                      label: 'Menu Item Banner',
                      type: 'upload',
                      relationTo: 'media',
                    },
                    link({ appearances: false }),
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
