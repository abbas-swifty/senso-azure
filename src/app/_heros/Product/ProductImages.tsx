'use client'

import React from 'react'
import ImageGallery from 'react-image-gallery'
import { Media } from '../../../payload/payload-types'
import 'react-image-gallery/styles/css/image-gallery.css'
import Image from 'next/image'

interface ProductImagesProps {
  productImages: Media[]
}

const ProductImages: React.FC<ProductImagesProps> = ({ productImages }) => {
  const images = productImages.map(image => {
    const fileName = image?.media?.filename || ''
    const url = `${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`
    return {
      original: url,
      thumbnail: url,
    }
  })

  const renderImage = (item, index) => (
    <div className="image-gallery-image w-full h-full max-w-full flex justify-center max-h-[380px]">
      <Image
        className="object-cover rounded-2xl"
        src={item.original}
        width={420}
        height={380}
        alt={`Product Image ${index}`}
      />
    </div>
  )

  const renderThumnailImage = (item, index) => (
    <div className="image-gallery-image  w-full h-full max-w-[100px] max-h-[100px]">
      <Image
        className="max-h-[100px] object-cover rounded-2xl"
        src={item.thumbnail}
        width={100}
        height={100}
        alt={`Product Image ${index}`}
      />
    </div>
  )

  return (
    <ImageGallery
      showThumbnails={true}
      showPlayButton={false}
      showFullscreenButton={true}
      showNav={true}
      slideDuration={450}
      slideInterval={2000}
      autoPlay={false}
      items={images}
      renderItem={renderImage}
      renderThumbInner={renderThumnailImage}
    />
  )
}

export default ProductImages
