import React from 'react'
import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import classes from './index.module.scss'

type Props = Extract<Page['layout'][0], { blockType: 'richTextBlock' }>

export const RichTextBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ richText, contentAlignment }) => {
  return (
    <section className="">
      <div
        className={`container mx-auto py-8 px-4 ${
          contentAlignment === 'center'
            ? 'text-center'
            : contentAlignment === 'right'
            ? 'text-right'
            : ''
        }
      lg:py-16 lg:px-8
      `}
      >
        <RichText className={classes.content} content={richText} />
      </div>
    </section>
  )
}
