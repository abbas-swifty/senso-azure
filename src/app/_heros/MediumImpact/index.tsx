import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types'
import { Gutter } from '../../_components/Gutter'
import { CMSLink } from '../../_components/Link'
import { Media } from '../../_components/Media'
import RichText from '../../_components/RichText'

import classes from './index.module.scss'

export const MediumImpactHero: React.FC<Page['hero']> = ({ richText, media, links, heading, subHeading }) => {

  const fileName = media?.filename;
  const backgroundImageStyle = fileName ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` } : {};
  const overlayStyle: React.CSSProperties = {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    width: '100%',
    height: '100%',
  };
  return (
    <div style={fileName ? backgroundImageStyle : { backgroundColor: '#211709', }} className={`bg-cover bg-no-repeat min-h-[440px] bg-center flex flex-col justify-end items-center py-12 px-4
    lg:min-h-[650px] lg:py-24 lg:px-8 lg:justify-center
    `}>
      {/* <div style={overlayStyle}></div> */}
      <div className='flex flex-col container mx-auto text-white text-center w-full h-full justify-center items-center'>
        <h1 className='text-h2M leading-headingLH1 font-bold
          lg:text-h2
          '>{heading}</h1>
        <p className='text-b16 leading-headingLH2 mt-6 font-normal'>{subHeading}</p>
        {Array.isArray(links) && links.length > 0 && (
          <ul className="flex flex-row gap-6 pl-0 pt-6 list-none my-0 justify-center
            lg:justify-start
            ">
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
    </div>
  )
}
