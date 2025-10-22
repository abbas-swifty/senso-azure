import { CollectionConfig } from 'payload/types'

const Distributors: CollectionConfig = {
  slug: 'distributors',
  fields: [
    {
      type: 'text',
      name: 'fullName',
      label: 'Full Name',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'email',
      label: 'Email',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'address',
      label: 'Address',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'number',
      name: 'phoneNumber',
      label: 'Phone number',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'company',
      label: 'Company Name',
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default Distributors
