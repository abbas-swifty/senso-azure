'use client'
import React from 'react'
import { Footer, Media, Settings } from '../../../../payload/payload-types'
import { usePathname } from 'next/navigation'
import { useAuth } from '../../../_providers/Auth'
import { noHeaderFooterUrls } from '../../../_constants'
import classes from './index.module.scss'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '../../Button'

const FooterComponent = ({ footer, settings }: { footer: Footer; settings: Settings }) => {
  const pathName = usePathname()
  const { user } = useAuth()
  const icon = settings?.siteLogo as Media
  const navItemParent = footer?.navItemParent || []
  const socials = settings?.socials || []

  return (
    <footer
      className={`${
        noHeaderFooterUrls.includes(pathName) ? classes.hide : ''
      } bg-[#727272] flex flex-col lg:min-h-[450px] text-white`}
    >
      <div
        className="container mx-auto p-8 flex w-full h-full justify-between pb-4 flex-col gap-6
            lg:px-[64px] lg:pt-[64px] lg:flex-row
            "
      >
        <div
          className="flex flex-col items-center gap-3
        lg:justify-between lg:h-full lg:min-w-[320px] lg:items-start
        "
        >
          <Image alt={icon?.alt} src={icon?.url} width={190} height={80}></Image>
          <div className="flex flex-row items-center gap-[12px]">
            {socials.map(item => {
              // const icon = item?.link?.icon as Media

              return (
                <Button
                  key={item?.id}
                  newTab={item?.link?.newTab}
                  href={item?.link?.url}
                  el="link"
                  appearance="none"
                  className='text-white'
                >
                  {item?.link?.label || 'Social Media Link'}
                  {/* <Image src={icon?.url} alt={icon?.alt || 'Button Icon'} width={28} height={28} /> */}
                </Button>
              )
            })}
          </div>
        </div>
        <div
          className="flex flex-col gap-6 :
        lg:flex-row 
        "
        >
          {navItemParent.map(parent => (
            <div key={parent?.id} className="flex flex-col gap-4 min-w-[252px]">
              <h6
                className="text-h6 leading-headingLH2 text-center
              lg:text-left
              "
              >
                {parent.navTitle}
              </h6>
              <div className="flex flex-col gap-3">
                {parent.navItems.map(item => (
                  <Link
                    className="text-white no-underline text-b16 leading-headingLH2 text-center hover:text-white/70 duration-300
                    lg:text-left"
                    key={item.id}
                    href={item.link.url}
                  >
                    {item.link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div
        className="container mx-auto px-8 flex w-full flex-col gap-[12px] items-center justify-center pt-4 pb-8 text-white border-t border-solid border-x-0 border-b-0 border-brand-border-gray/20
            lg:justify-between lg:px-[64px] lg:flex-row
            "
      >
        <p className="text-b12 font-normal leading-headingLH2">{footer?.copyright || ''}</p>
        {user && (
              <Link
                onClick={() => {
                  window.location.href = '/account'
                }}
                href="/account"
                className="flex items-center cursor-pointer text-white no-underline text-b16 leading-headingLH2 text-center hover:text-white/70 duration-300"
              >
                Account
              </Link>
            )}
            {!user && (
              <Link
                onClick={() => {
                  window.location.href = '/login'
                }}
                href="/login"
                className="flex items-center cursor-pointer text-white no-underline text-b16 leading-headingLH2 text-center hover:text-white/70 duration-300"
              >
                Login
              </Link>
            )}
      </div>
    </footer>
  )
}

export default FooterComponent
