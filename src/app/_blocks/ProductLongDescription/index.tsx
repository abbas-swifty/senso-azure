import React, { useEffect } from 'react'

import { Page } from '../../../payload/payload-types'
import { CMSLink } from '../../_components/Link'
import RichText from '../../_components/RichText'

type Props = Extract<Page['layout'][0], { blockType: 'productLongDescription' }>

export const ProductLongDescription: React.FC<
  Props & {
    id?: string
  }
> = ({ richText }) => {
  return (
    <section className="bg-cover bg-no-repeat bg-center">
      <div className="container mx-auto py-8 px-4 text-center flex justify-center">
        <div
          className="md:max-w-[520px] lg:pt-[18px] lg:max-w-[840px]"
        >
          <RichText className="rich-text mb-5 text-brand-dark leading-bodyLH" content={richText} />
        </div>
      </div>
    </section>
  )
}
