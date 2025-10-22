'use client'

import React from 'react'
import Image from 'next/image'

import { useAuth } from '../../../_providers/Auth'

import classes from './index.module.scss'

export const UserInfo = () => {
  const { user } = useAuth()

  return (
    <div className="flex gap-3 items-center py-6 px-5 border-0 border-b border-brand-light-gray border-solid">
      <Image src="/assets/icons/profile.svg" alt="profile" width={50} height={50} />
      <div className="flex flex-col justify-center pb-1 overflow-hidden">
        <p className="overflow-hidden text-ellipsis line-clamp-1 font-bold text-b18 text-brand-dark leading-headingLH2">
          {user?.name}
        </p>
        <p className="text-b16 text-brand-dark font-normal leading-headingLH2">{user?.email}</p>
      </div>
    </div>
  )
}
