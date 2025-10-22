// HighImpactHero.tsx
import React from 'react'
import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import DitributorRegistrationForm from './ditributorRegistrationForm'
import classes from './index.module.scss'
import HeroBannerCarousel from '../../_components/HeroBanners'

export const HighImpactHero: React.FC<Page['hero']> = ({
  richText,
  media,
  links,
  heading,
  subHeading,
  bannerOption,
  heroBanners,
}) => {
  const fileName = media && typeof media !== 'string' && media?.filename
  const singlePictureStyle = fileName
    ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` }
    : {}

  return (
    <div
      id="top"
      style={bannerOption === 'singlePicture' ? singlePictureStyle : undefined}
      className={`bg-cover bg-no-repeat min-h-[520px] bg-center flex flex-col justify-end lg:min-h-[720px] bg-brand-dark`}
    >
      {bannerOption === 'multiplePictures' && heroBanners.length > 0 && (
        <div className="absolute w-full left-0 top-0 h-full lg:min-h-[730px] lg:max-h-[732px] max-h-[520px]">
          <HeroBannerCarousel heroBanners={heroBanners} />
        </div>
      )}
      <div className="flex flex-col mt-[110px] lg:mt-0 lg:flex-row container mx-auto justify-between lg:items-end items-start gap-4">
        <div
          className={`${classes.blur} flex p-[24px] flex-col max-w-full text-center md:text-left h-fit rounded-2xl w-full
          md:max-w-[520px]
        lg:max-w-[600px] lg:text-left lg:py-[64px] lg:px-[42px]
        `}
        >
          <h1
            className="text-h2M text-brand-black leading-headingLH1 font-bold
          lg:text-h2"
          >
            {heading}
          </h1>
          <p className="text-b16 leading-headingLH1 text-brand-black/80 mt-6 font-normal">{subHeading}</p>
          {Array.isArray(links) && links.length > 0 && (
            <ul
              className="flex flex-row gap-6 pl-0 pt-6 list-none my-0 justify-center
              md:justify-start
            lg:justify-start"
            >
              {links.map(({ link }, i) => (
                <li key={i}>
                  <CMSLink {...link} />
                </li>
              ))}
            </ul>
          )}
        </div>
        <DitributorRegistrationForm />
      </div>
    </div>
  )
}
