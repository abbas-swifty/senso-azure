'use client'

import React, { useEffect, useState } from 'react'
import { Distributor, Page } from '../../../payload/payload-types'
import RichText from '../../_components/RichText'
import DistributorCarouselItem from './distributorCarouselItem'
import { fetchDocs } from '../../_api/fetchDocs'

type Props = Extract<Page['layout'][0], { blockType: 'distributorsCarousel' }>

const DistributorsCarousel: React.FC<Props & { id?: string }> = ({ richText }) => {
  const [distributors, setDistributors] = useState<Distributor[] | null>(null)

  useEffect(() => {
    const fetchDistributors = async () => {
      try {
        const fetchedDistributors = await fetchDocs<Distributor>('distributors')
        setDistributors(fetchedDistributors)
      } catch (err) {
        console.log(err)
      }
    }

    void fetchDistributors()
  }, [])

  return (
    <section className="bg-cover bg-no-repeat bg-center">
      <div className="container mx-auto py-8 px-4 text-center lg:py-16 lg:px-8">
        <RichText className="rich-text mb-5 text-brand-dark" content={richText} />
        <div className="pb-[80px] mt-7 lg:mt-12">
          {distributors != null && <DistributorCarouselItem distributors={distributors} />}
        </div>
      </div>
    </section>
  )
}

export default DistributorsCarousel
