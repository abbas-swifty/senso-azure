import React from 'react'
import { IconCard } from './cardInterface'
import Image from 'next/image'

const Card: React.FC<{ card: IconCard }> = ({ card }) => {
  const filename = card?.media?.filename || ''

  return (
    <div className="flex flex-row w-full gap-3">
      <div className="flex w-6 h-6">
        <Image
          width={32}
          height={32}
          objectFit="contain"
          objectPosition="center"
          alt={card?.media?.alt || ''}
          src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
        />
      </div>
      <div className="flex flex-col flex-1">
        <p className="text-b18 font-semibold text-brand-dark-gray leading-headingLH1 tracking-tight">
          {card?.heading || ''}
        </p>
        <p className="text-b14 font-normal text-brand-dark-gray leading-subHeadingLH2 mt-2">
          {card?.content || ''}
        </p>
      </div>
    </div>
  )
}

export default Card
