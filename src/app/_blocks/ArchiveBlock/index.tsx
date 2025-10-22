import React from 'react'

import { CollectionArchive } from '../../_components/CollectionArchive'
import { Gutter } from '../../_components/Gutter'
import RichText from '../../_components/RichText'
import { ArchiveBlockProps } from './types'

import classes from './index.module.scss'
import Link from 'next/link'
import Image from 'next/image'

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = props => {
  const {
    introContent,
    id,
    relationTo,
    populateBy,
    limit,
    populatedDocs,
    populatedDocsTotal,
    selectedDocs,
    categories,
    displayAs,
  } = props

  return (
    <section id={`block-${id}`} className={classes.archiveBlock}>
      <div className={['container mx-auto py-8 px-6 lg:py-16 lg:px-8'].filter(Boolean).join(' ')}>
        {introContent && (
          <div className="flex flex-col gap-[32px]">
            <div className="flex items-center text-center flex-col">
              <RichText className="rich-text text-balance" content={introContent} />
              <Link className={classes.button} href={'/products'}>
                <span>Online Store</span>
                <Image
                  alt="Arrow Up"
                  width={32}
                  height={32}
                  src={'/assets/icons/ArrowUpRightDark.svg'}
                />
              </Link>
            </div>
            <CollectionArchive
              populateBy={populateBy}
              relationTo={relationTo}
              populatedDocs={populatedDocs}
              populatedDocsTotal={populatedDocsTotal}
              selectedDocs={selectedDocs}
              categories={categories}
              limit={limit}
              sort="-publishedOn"
              displayAs={displayAs}
            />
          </div>
        )}
      </div>
    </section>
  )
}
