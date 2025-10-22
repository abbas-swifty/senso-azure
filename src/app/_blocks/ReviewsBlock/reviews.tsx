import React from 'react';
import { Review } from '../../../payload/payload-types';
import Carousel from 'react-multi-carousel';

interface ReviewsWrapperProps {
    title?: string;
    reviews?: Review[];
}

export const ReviewsWrapper: React.FC<ReviewsWrapperProps> = ({ title, reviews }) => {

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1,
            slidesToSlide: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1,
            slidesToSlide: 1
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1,
            slidesToSlide: 1
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1
        }
    };

    return (
        <div className='container mx-auto py-8 px-4 text-center
        lg:py-16 lg:px-8
        '>
            <h3 className='text-h3M text-brand-primary leading-headingLH2
            lg:text-h3
            '>{title}</h3>
            <div className='my-6'>
                <Carousel
                    autoPlay={true}
                    autoPlaySpeed={3000}
                    keyBoardControl={true}
                    infinite={true}
                    showDots={true}
                    arrows={false}
                    containerClass='carousel-container'
                    responsive={responsive}>
                    {reviews?.map((review, index) => (
                        <div key={index}  className='flex justify-center mx-[16px]'>
                            <div className='text-brand-dark flex flex-col max-w-[640px] w-full' key={review.id}>
                                <p className='text-b18 leading-headingLH2 font-normal
                            lg:text-h6
                            '>{review.text}</p>
                                <p className='text-b16 leading-headingLH2 font-normal mt-3'>{review.name}</p>
                            </div>
                        </div>
                    ))}
                </Carousel>
            </div>
        </div>
    );
};
