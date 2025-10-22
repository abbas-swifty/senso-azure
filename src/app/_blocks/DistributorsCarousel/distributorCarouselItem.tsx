import Carousel from 'react-multi-carousel'
import { Distributor } from '../../../payload/payload-types'
import React from 'react'

const DistributorCarouselItem: React.FC<{ distributors: Distributor[] }> = ({ distributors }) => {
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 4,
      slidesToSlide: 1,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 1,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  }

  return (
    <div>
      <Carousel
        autoPlay={true}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        removeArrowOnDeviceType={['tablet', 'mobile']}
        infinite={true}
        showDots={false}
        responsive={responsive}
        containerClass="carousel-container"
      >
        {distributors?.map((distributor, index) => (
          <div
            key={index}
            className="border-r border-[#E0DBD6] border-solid border-0 p-4 text-left mx-[16px]"
          >
            <div className="mb-2">
              <p className="text-brand-dark text-h4M leading-headingLH1 font-medium">
                {distributor.fullName}
              </p>
            </div>
            <div className="flex flex-row gap-6">
              <div className="flex flex-col gap-2">
                <span className="whitespace-nowrap text-brand-dark text-b18 leading-headingLH1 font-normal">
                  Company
                </span>
                <span className="whitespace-nowrap text-brand-dark text-b18 leading-headingLH1 font-normal">
                  Phone Number
                </span>
                <span className="whitespace-nowrap text-brand-dark text-b18 leading-headingLH1 font-normal">
                  Address
                </span>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-brand-dark text-b18 leading-headingLH1 font-normal">
                  {distributor.company}
                </span>
                <span className="text-brand-dark text-b18 leading-headingLH1 font-normal">
                  {distributor.phoneNumber}
                </span>
                <span className="text-brand-dark text-b18 leading-headingLH1 font-normal">
                  {distributor.address}
                </span>
              </div>
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default DistributorCarouselItem
