import { CollectionConfig } from 'payload/types'
import { anyone } from '../access/anyone'
import { admins } from '../access/admins'

const Reviews: CollectionConfig = {
  slug: 'reviews',
  access: {
    read: anyone,
  },
  fields: [
    {
      type: 'text',
      name: 'text',
      label: 'Review',
    },
    {
      type: 'text',
      name: 'name',
      label: 'Person Name',
    },
  ],
}
export default Reviews
