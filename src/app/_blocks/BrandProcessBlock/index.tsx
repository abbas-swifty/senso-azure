import React from 'react'
import { Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import classes from './index.module.scss'
import Card from './card' // Importing Card component from its separate file
import RenderButtons from './renderButtons'

type Props = Extract<Page['layout'][0], { blockType: 'brandProcessBlock' }>

export const BrandProcessBlock: React.FC<
  Props & {
    id?: string
  }
> = ({ richText, cardsHeading, cards, processHeading, processContent }) => {
  return (
    <section id="about-senso-distributors" className="bg-cover bg-no-repeat bg-center">
      <div className="container mx-auto py-8 px-4 flex-col flex lg:py-16 lg:px-8 lg:flex-row items-center">
        <div className="flex flex-col w-full lg:max-w-[490px] lg:w-full gap-4 lg:pb-0 pb-7">
          <RichText className={`rich-text text-white ${classes.content}`} content={richText} />
          <RenderButtons />
        </div>
        <div className="flex flex-col">
          <span className="font-medium text-h4M leading-headingLH2 tracking-tight text-brand-orange">
            {cardsHeading || ''}
          </span>
          <div className="flex flex-col my-4 lg:flex-row gap-3">
            {cards.map((card, index) => (
              <Card key={index} card={card} />
            ))}
          </div>
          <div className="flex flex-col mt-10">
            <span className="font-medium text-h4M leading-headingLH2 tracking-tight text-brand-orange">
              {processHeading || ''}
            </span>
            <div className="mt-4 text-brand-dark-gray">
              <RichText className={`rich-text`} content={processContent} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BrandProcessBlock
