import React, { useEffect } from 'react'

import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import { CMSLink } from '../../_components/Link'

type Props = Extract<Page['layout'][0], { blockType: 'aboutBlock' }>

export const AboutBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ richText, link, media }) => {
  const fileName = media?.filename
  const backgroundImageStyle = fileName
    ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` }
    : {}
  return (
    <section style={backgroundImageStyle} className="bg-cover bg-no-repeat bg-center">
      <div
        className="container mx-auto py-8 px-4 text-center
      md:max-w-[520px]
      lg:py-16 lg:px-8 lg:max-w-[720px]
      "
      >
        <RichText className="rich-text mb-5 text-white" content={richText} />
        <CMSLink className="mt-6" {...link} />
      </div>
    </section>
  )
}
