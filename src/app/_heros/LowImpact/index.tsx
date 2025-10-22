'use client'

import React, { Fragment } from 'react'
import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

export const LowImpactHero: React.FC<Page['hero']> = ({
  richText,
  media,
  links,
  heading,
  subHeading,
}) => {
  const fileName = media?.filename
  const pathName = usePathname()

  return (
    <div
      className={`bg-cover bg-no-repeat min-h-[440px] bg-center flex justify-center ${
        pathName === '/products' ? 'bg-brand-dark' : 'bg-brand-blue'
      }
    lg:min-h-[540px]
    `}
    >
      <div className="flex flex-col container mx-auto lg:flex-row justify-end lg:justify-between">
        <div
          className={`flex px-[32px] pb-[32px] pt-32 flex-col max-w-full w-full text-center justify-end
        lg:max-w-[820px] lg:text-left lg:py-[64px] lg:pt-0 lg:px-[42px]
        `}
        >
          {/* <RichText content={richText} /> */}
          <h1
            className="text-h2M text-white leading-headingLH1 font-bold
          lg:text-h2
          "
          >
            {heading}
          </h1>
          <p className="text-b14 lg:text-b16 leading-subHeadingLH2 text-white mt-6 font-normal">
            {subHeading}
          </p>
          {Array.isArray(links) && links.length > 0 && (
            <ul
              className="flex flex-row gap-6 pl-0 pt-6 list-none my-0 justify-center
            lg:justify-start
            "
            >
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
        <div
          className="flex justify-end items-end w-full
        lg:min-w-[475px] lg:max-w-[475px]
        "
        >
          <Image
            className="object-contain object-bottom hidden lg:block"
            width={475}
            height={400}
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
            alt={media?.alt || ''}
          />
          <Image
            className="object-contain object-bottom block lg:hidden"
            width={280}
            height={220}
            src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
            alt={media?.alt || ''}
          />
        </div>
      </div>
    </div>
  )
}
