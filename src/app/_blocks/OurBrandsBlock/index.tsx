import React, { useEffect } from 'react'
import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import { CMSLink } from '../../_components/Link'
import Image from 'next/image'
import { Button } from '../../_components/Button'
import { Brand } from '../../_components/Media/types'
import classes from './index.module.scss'
import RenderButtons from './renderButtons'

type Props = Extract<Page['layout'][0], { blockType: 'ourBrandsBlock' }>

const BrandMemoized: React.FC<{ brand: Brand }> = React.memo(({ brand }) => {
  if (!brand || !brand.media) return null
  const { id = '', media: { filename = '', alt = 'Brand Logo' } = {} } = brand
  return (
    <Image
      key={id}
      src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
      width={180}
      height={48}
      alt={alt || 'Brand Image'}
    />
  )
})

export const OurBrandsBlock: React.FC<Props & { id?: string }> = ({
  backgroundColor,
  richText,
  title,
  brands,
}) => {
  return (
    <section
      id='brands'
      className={`${
        backgroundColor === 'white'
          ? 'bg-white'
          : backgroundColor === 'brown'
          ? 'bg-brand-primary'
          : 'bg-brand-blue'
      }`}
    >
      <div
        className={`container mx-auto py-8 px-4 gap-4 flex flex-col items-center
            lg:py-16 lg:px-8
            `}
      >
        <div className="flex items-center text-center">
          <RichText
            className={`rich-text text-center ${
              backgroundColor === 'white' ? classes.content : 'text-white'
            }`}
            content={richText}
          />
        </div>
        <div className="flex flex-row gap-4 mt-4">
          <RenderButtons />
          {/* <Button href="#" appearance="default" label="Learn More" /> */}
        </div>
        <div className="flex flex-col mt-4 justify-center text-center">
          <p
            className={`text-b18 leading-headingLH2 font-semibold ${
              backgroundColor === 'white' ? 'text-brand-blue' : 'text-white'
            }`}
          >
            {title}
          </p>
          <div
            className="flex flex-row max-w-full w-full flex-wrap gap-3 mt-6 justify-center
                    lg:max-w-[980px]
                    "
          >
            {brands.length > 0 &&
              brands.map((brand, index) => <BrandMemoized key={index} brand={brand} />)}
          </div>
        </div>
      </div>
    </section>
  )
}
