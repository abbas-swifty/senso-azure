import React, { useEffect } from 'react'

import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import Form from './Form'


type Props = Extract<Page['layout'][0], { blockType: 'newsLetterBlock' }>

export const NewsLetterBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ richText }) => {

  return (
    <section>
      <div className='container mx-auto py-8 px-4 text-center
        lg:py-16 lg:px-8'>
        <RichText className="rich-text mb-5" content={richText} />
        <Form />
      </div>
    </section>
  )
}