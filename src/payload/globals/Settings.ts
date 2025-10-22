import type { GlobalConfig } from 'payload/types'

import link from '../fields/link'

export const Settings: GlobalConfig = {
  slug: 'settings',
  typescript: {
    interface: 'Settings',
  },
  graphQL: {
    name: 'Settings',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'productsPage',
      type: 'relationship',
      relationTo: 'pages',
      label: 'Products page',
    },
    {
      name: 'siteLogo',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'siteCurrency',
      type: 'select',
      label: 'Select Currency',
      defaultValue: 'USD',
      required: true,
      options: [
        { label: 'LBP - Lebanese Pound', value: 'LBP' },
        { label: 'SAR - Saudi Riyal', value: 'SAR' },
        { label: 'AED - UAE Dirham', value: 'AED' },
        { label: 'BHD - Bahraini Dinar', value: 'BHD' },
        { label: 'KWD - Kuwaiti Dinar', value: 'KWD' },
        { label: 'OMR - Omani Rial', value: 'OMR' },
        { label: 'JOD - Jordanian Dinar', value: 'JOD' },
        { label: 'USD - US Dollar', value: 'USD' },
        { label: 'EUR - Euro', value: 'EUR' },
        { label: 'GBP - British Pound', value: 'GBP' },
        { label: 'JPY - Japanese Yen', value: 'JPY' },
        { label: 'AUD - Australian Dollar', value: 'AUD' },
        { label: 'CAD - Canadian Dollar', value: 'CAD' },
        { label: 'CHF - Swiss Franc', value: 'CHF' },
        { label: 'CNY - Chinese Yuan', value: 'CNY' },
        { label: 'SEK - Swedish Krona', value: 'SEK' },
        { label: 'NZD - New Zealand Dollar', value: 'NZD' },
      ],
    },
    {
      name: 'enableDelivery',
      type: 'checkbox',
      label: 'Enable Free Delivery',
    },
    {
      name: 'deliveryValue',
      label: 'Free Delivery Value',
      type: 'number',
      admin: {
        condition: (_, { enableDelivery }) => Boolean(enableDelivery),
      },
    },
    {
      name: 'socials',
      type: 'array',
      maxRows: 6,
      fields: [
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: 'createAccountBanner',
      label: 'Create Account Page Banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'loginBanner',
      label: 'Login Page Banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'recoverPasswordBanner',
      label: 'Recover Password Page Banner',
      type: 'upload',
      relationTo: 'media',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },
  ],
}
