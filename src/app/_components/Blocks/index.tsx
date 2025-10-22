import React, { Fragment } from 'react'

import { Page } from '../../../payload/payload-types.js'
import { AboutBlock } from '../../_blocks/AboutBlock'
import { ArchiveBlock } from '../../_blocks/ArchiveBlock'
import BrandOverview from '../../_blocks/BrandOverview'
import { BrandProcessBlock } from '../../_blocks/BrandProcessBlock'
import { CallToActionBlock } from '../../_blocks/CallToAction'
import { ContentBlock } from '../../_blocks/Content'
import DistributorsCarousel from '../../_blocks/DistributorsCarousel'
import { MediaBlock } from '../../_blocks/MediaBlock'
import { NewsLetterBlock } from '../../_blocks/NewsLetterBlock'
import { OurBrandsBlock } from '../../_blocks/OurBrandsBlock'
import { RelatedProducts, type RelatedProductsProps } from '../../_blocks/RelatedProducts'
import { ReviewsBlock } from '../../_blocks/ReviewsBlock'
import { RichTextBlock } from '../../_blocks/RichTextBlock'
import { TextWithImageBlock } from '../../_blocks/TextWithImageBlock'
import { toKebabCase } from '../../_utilities/toKebabCase'
import { BackgroundColor } from '../BackgroundColor/index'
import { VerticalPadding, VerticalPaddingOptions } from '../VerticalPadding/index'
import { ProductLongDescription } from '../../_blocks/ProductLongDescription'
import { ProductReviewsBlock } from '../../_blocks/ProductReviewsBlock'
import { ContactFormBlock } from '../../_blocks/ContactFormBlock'
import InstaFeedBlock from '../../_blocks/InstaFeedBlock'

const blockComponents = {
  cta: CallToActionBlock,
  content: ContentBlock,
  mediaBlock: MediaBlock,
  archive: ArchiveBlock,
  relatedProducts: RelatedProducts,
  newsLetterBlock: NewsLetterBlock,
  aboutBlock: AboutBlock,
  reviewsBlock: ReviewsBlock,
  textWithImageBlock: TextWithImageBlock,
  ourBrandsBlock: OurBrandsBlock,
  richTextBlock: RichTextBlock,
  brandProcessBlock: BrandProcessBlock,
  distributorsCarousel: DistributorsCarousel,
  brandOverview: BrandOverview,
  productLongDescription: ProductLongDescription,
  productReviewsBlock: ProductReviewsBlock,
  contactformBlock: ContactFormBlock,
  instaFeedBlock: InstaFeedBlock,
}

export const Blocks: React.FC<{
  blocks: (Page['layout'][0] | RelatedProductsProps)[]
  disableTopPadding?: boolean
}> = props => {
  const { disableTopPadding, blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockName, blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            // the cta block is containerized, so we don't consider it to be inverted at the block-level
            const blockIsInverted =
              'invertBackground' in block && blockType !== 'cta' ? block.invertBackground : false
            const prevBlock = blocks[index - 1]

            const prevBlockInverted =
              prevBlock && 'invertBackground' in prevBlock && prevBlock?.invertBackground

            const isPrevSame = Boolean(blockIsInverted) === Boolean(prevBlockInverted)

            let paddingTop: VerticalPaddingOptions = 'large'
            let paddingBottom: VerticalPaddingOptions = 'large'

            if (prevBlock && isPrevSame) {
              paddingTop = 'none'
            }

            if (index === blocks.length - 1) {
              paddingBottom = 'large'
            }

            if (disableTopPadding && index === 0) {
              paddingTop = 'none'
            }

            if (Block) {
              return (
                <BackgroundColor key={index} invert={blockIsInverted}>
                  <VerticalPadding top={'none'} bottom={'none'}>
                    <Block id={toKebabCase(blockName)} {...block} />
                  </VerticalPadding>
                </BackgroundColor>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
