import type { Metadata } from 'next'

const defaultOpenGraph: Metadata['openGraph'] = {
  type: 'website',
  siteName: 'Senso Coffee',
  title: 'Senso Coffee',
  description: 'Buy our signature roasted ground coffee, capsules and accessories.',
  images: [
    {
      url: '/assets/images/senso-hero-image.png', 
    },
  ],
}

export const mergeOpenGraph = (og?: Metadata['openGraph']): Metadata['openGraph'] => {
  return {
    ...defaultOpenGraph,
    ...og,
    images: og?.images ? og.images : defaultOpenGraph.images,
  }
}
