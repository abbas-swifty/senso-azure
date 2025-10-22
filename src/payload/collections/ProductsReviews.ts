import { CollectionConfig } from 'payload/types'

const ProductsReviews: CollectionConfig = {
  slug: 'productsReviews',
  fields: [
    {
      type: 'textarea',
      name: 'text',
      label: 'Review',
    },
    {
      type: 'text',
      name: 'rating',
      label: 'Rating',
    },
    {
      type: 'text',
      name: 'name',
      label: 'Person Name',
    },
    {
      type: 'relationship',
      name: 'product',
      label: 'Product',
      relationTo: 'products',
    },
  ],
}
export default ProductsReviews
