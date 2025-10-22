import React, { useEffect } from 'react'

import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import Form from './Form'
import Image from 'next/image'

type Props = Extract<Page['layout'][0], { blockType: 'contactFormBlock' }>

export const ContactFormBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ richText, media }) => {
  const fileName = media?.filename

  return (
    <section>
      <div
        className="container mx-auto py-8 px-4 text-center
        lg:py-16 lg:px-8"
      >
        <RichText className="rich-text mb-5" content={richText} />
        <div className="flex flex-col justify-center gap-14 py-5 items-center w-full lg:flex-row">
          <div
            className="flex justify-center
        "
          >
            <Image
              width={500}
              height={500}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
              className="object-cover object-center rounded-[42px] hidden lg:flex"
              alt={media?.alt || 'image'}
            />
            <Image
              width={320}
              height={320}
              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName}`}
              className="object-cover object-center rounded-[42px] flex lg:hidden"
              alt={media?.alt || 'image'}
            />
          </div>
          <Form />
        </div>
      </div>
    </section>
  )
}
