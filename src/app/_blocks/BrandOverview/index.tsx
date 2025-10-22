import React from 'react'
import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import Image from 'next/image'
import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'brandOverview' }>

const BrandOverview: React.FC<Props & { id?: string }> = ({ richText, media, brandTimeLine }) => {
  const fileName = media && typeof media !== 'string' && media?.filename
  const altText = media && typeof media !== 'string' && media?.alt

  return (
    <section className="bg-brand-light-brown">
      <div className="container mx-auto py-8 px-4 text-center justify-center flex flex-col items-center lg:py-16 lg:px-8">
        <div className="text-center md:max-w-[520px] lg:max-w-[720px]">
          <RichText className="rich-text mb-5 text-brand-dark" content={richText} />
        </div>
        <Image
          width={670}
          height={320}
          alt={altText || 'Image'}
          className="hidden lg:flex object-contain object-center"
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
        />
        <Image
          width={280}
          height={220}
          alt={altText || 'Image'}
          className="flex lg:hidden object-contain object-center"
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
        />
        <div className="flex flex-col pt-[80px] w-full overflow-hidden">
          <div
            className={`${classes.animateMarquee} flex flex-row w-full whitespace-nowrap gap-[80px]`}
          >
            {[...brandTimeLine, ...brandTimeLine].map((item, index) => {
              if (index % 2 !== 0) return null
              return (
                <div className="flex flex-row mr-4" key={index}>
                  <div className="flex flex-col justify-center items-center">
                    <div className="flex flex-row items-center">
                      <div className="flex flex-col justify-center items-center gap-1 py-4 rounded-2xl max-w-[188px] min-w-[188px] w-full h-full max-h-[66px] bg-[#F8F5EC] border border-solid border-[#DACEC7]">
                        <h5 className="font-bold text-b18 text-brand-black tracking-tight leading-[100%] m-0">
                          {item?.year || 'year'}
                        </h5>
                        <span className="font-semibold text-b14 text-brand-dark text-center leading-[100%] m-0">
                          {item?.shortInformation || 'event'}
                        </span>
                      </div>
                      <div className="border border-dashed border-brand-black min-w-[26px]"></div>
                    </div>
                    <div className="w-[1px] min-h-[60px] h-full bg-[#B9B6AF] translate-x-[-14px]"></div>
                  </div>
                  <div className="py-4 px-1 flex justify-center items-center rounded-2xl bg-[#FBF9F4] max-w-[324px] min-w-[320px] w-full h-full min-h-[110px] max-h-[110px]">
                    <p className="font-semibold text-b14 text-[#787167] text-center leading-[120%] text-ellipsis line-clamp-2 m-0 w-full whitespace-normal text-wrap">
                      {item?.shortDescription || 'event description'}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
          <div className="w-full h-[1px] bg-[#B9B6AF]"></div>
          <div
            className={`${classes.animateMarquee} flex flex-row w-full whitespace-nowrap gap-[80px]`}
          >
            {[...brandTimeLine, ...brandTimeLine].map((item, index) => {
              if (index % 2 === 0) return null
              return (
                <div className="flex flex-row mr-4" key={index}>
                  <div className="mt-4 py-4 px-1 flex justify-center items-center rounded-2xl bg-[#FBF9F4] max-w-[324px] min-w-[320px] w-full h-full min-h-[110px] max-h-[110px]">
                    <p className="font-semibold text-b14 text-[#787167] text-center leading-[120%] text-ellipsis line-clamp-2 m-0 w-full whitespace-normal text-wrap">
                      {item?.shortDescription || 'event description'}
                    </p>
                  </div>
                  <div className="flex flex-col justify-center items-center">
                    <div className="w-[1px] min-h-[60px] h-full bg-[#B9B6AF] translate-x-[14px]"></div>
                    <div className="flex flex-row items-center">
                      <div className="border border-dashed border-brand-black min-w-[26px]"></div>
                      <div className="flex flex-col justify-center items-center gap-1 py-4 rounded-2xl max-w-[188px] min-w-[188px] w-full h-full max-h-[66px] bg-[#F8F5EC] border border-solid border-[#DACEC7]">
                        <h5 className="font-bold text-b18 text-brand-black tracking-tight leading-[100%] m-0">
                          {item?.year || 'year'}
                        </h5>
                        <span className="font-semibold text-b14 text-brand-dark text-center leading-[100%] m-0">
                          {item?.shortInformation || 'event'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandOverview
