import { CollectionConfig } from 'payload/types'

const ContactUs: CollectionConfig = {
  slug: 'contact-us',
  labels: {
    singular: 'Contact Lead',
    plural: "Contact Leads",
  },
  fields: [
    {
      type: 'text',
      name: 'firstName',
      label: 'First Name',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'text',
      name: 'lastName',
      label: 'Last Name',
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
      type: 'number',
      name: 'phoneNumber',
      label: 'Phone Number',
      required: true,
      admin: {
        readOnly: true,
      },
    },
    {
      type: 'textarea',
      name: 'message',
      label: 'Message',
      required: true,
      admin: {
        readOnly: true,
      },
    },
  ],
}

export default ContactUs
