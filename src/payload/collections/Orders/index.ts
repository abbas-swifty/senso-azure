import type { CollectionConfig } from 'payload/types'

import { admins } from '../../access/admins'
import { adminsOrLoggedIn } from '../../access/adminsOrLoggedIn'
import { adminsOrOrderedBy } from './access/adminsOrOrderedBy'
import { clearUserCart } from './hooks/clearUserCart'
import { populateOrderedBy } from './hooks/populateOrderedBy'
import { updateUserPurchases } from './hooks/updateUserPurchases'
import { LinkToPaymentIntent } from './ui/LinkToPaymentIntent'
import { sendEmail } from './hooks/sendEmail'

export const Orders: CollectionConfig = {
  slug: 'orders',
  admin: {
    useAsTitle: 'customerName',
    defaultColumns: ['createdAt', 'orderedBy'],
    preview: doc => `${process.env.PAYLOAD_PUBLIC_SERVER_URL}/orders/${doc.id}`,
  },
  hooks: {
    afterChange: [updateUserPurchases, clearUserCart, sendEmail],
  },
  access: {
    read: adminsOrOrderedBy,
    update: admins,
    create: () => true,
    // create: adminsOrLoggedIn,
    delete: admins,
  },
  fields: [
    {
      name: 'orderedBy',
      type: 'relationship',
      relationTo: 'users',
      hooks: {
        beforeChange: [populateOrderedBy],
      },
    },
    {
      name: 'customerName',
      type: 'text',
      label: 'Customer Name',
    },
    {
      name: 'customerContactNumber',
      type: 'number',
      label: 'Customer Contact Number',
    },
    {
      name: 'customerEmail',
      type: 'email',
      label: 'Customer Email Address',
    },
    {
      name: 'customerAddress',
      type: 'text',
      label: 'Customer Address',
    },
    {
      name: 'homeAddress',
      type: 'text',
      label: 'Home Address (optional)',
    },
    {
      name: 'streetNo',
      type: 'text',
      label: 'Street No',
    },
    {
      name: 'descrptiveAddress',
      type: 'text',
      label: 'Apartment, suite, etc. (optional)',
    },
    {
      name: 'city',
      type: 'text',
      label: 'City',
      required: true,
    },
    {
      name: 'postalCode',
      type: 'number',
      label: 'Postal Code',
      required: true,
    },
    {
      name: 'stripePaymentIntentID',
      label: 'Stripe Payment Intent ID',
      type: 'text',
      hidden: true,
      admin: {
        position: 'sidebar',
        components: {
          Field: LinkToPaymentIntent,
        },
      },
    },
    {
      name: 'total',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'items',
      type: 'array',
      fields: [
        {
          name: 'product',
          type: 'relationship',
          relationTo: 'products',
          required: true,
        },
        {
          name: 'price',
          type: 'number',
          min: 0,
        },
        {
          name: 'quantity',
          type: 'number',
          min: 0,
        },
      ],
    },
  ],
}
