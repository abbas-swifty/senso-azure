import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { profileNavItems } from '../../_constants/'
import { UserInfo } from './UserInfo'

import classes from './index.module.scss'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <div className="container lg:pt-32 pb-8 px-4 mx-auto justify-center flex">
        <div className="flex flex-col gap-4 lg:flex-row lg:gap-7 w-full justify-center lg:mt-0 mt-32">
          <div className="flex flex-col h-fit lg:max-w-[460px] w-full">
            <UserInfo />
            <ul className="list-none p-0">
              {profileNavItems.map(item => (
                <li key={item.title}>
                  <Link
                    href={item.url}
                    className={
                      'flex gap-3 p-5 no-underline text-h6 rounded-2xl text-brand-dark hover:bg-brand-primary/25 duration-500'
                    }
                  >
                    <Image src={item.icon} alt={item.title} width={24} height={24} />
                    <p>{item.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          {children}
        </div>
      </div>
    </section>
  )
}
