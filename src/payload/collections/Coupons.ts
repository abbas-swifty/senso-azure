import { CollectionConfig } from 'payload/types'
import { anyone } from '../access/anyone'
import { admins } from '../access/admins'

const Coupons: CollectionConfig = {
  slug: 'coupons',
  access: {
    read: anyone,
    create: admins,
    update: anyone,
    delete: admins,
  },
  fields: [
    {
      name: 'code',
      type: 'text',
      required: true,
      unique: true,
      label: 'Coupon Code',
      maxLength: 10,
      minLength: 8,
    },
    {
      type: 'select',
      name: 'discountType',
      label: 'Discount Type',
      options: [
        {
          label: 'Fixed',
          value: 'fixed',
        },
        {
          label: 'Percentage',
          value: 'percentage',
        },
      ],
    },
    {
      name: 'discountAmount',
      type: 'number',
      required: true,
      label: 'Discount Amount',
      admin: {
        condition: (_, { discountType }) => Boolean(discountType),
      },
    },
    {
      name: 'appliesTo',
      type: 'relationship',
      relationTo: 'products',
      label: 'Coupons Applies To',
      hasMany: true,
    },
    {
      name: 'usageLimit',
      label: 'Coupon usage limit',
      type: 'number',
      min: 0,
    },
    {
      name: 'couponUsed',
      type: 'number',
      label: 'Coupon used times',
      min: 0,
    },
    {
      name: 'expirationDate',
      type: 'date',
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'active',
      options: [
        {
          label: 'Active',
          value: 'active',
        },
        {
          label: 'Inactive',
          value: 'inactive',
        },
      ],
    },
  ],
}
export default Coupons
