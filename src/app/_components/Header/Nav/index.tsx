import React, { useState } from 'react'
import { Header as HeaderType } from '../../../../payload/payload-types'
import { useAuth } from '../../../_providers/Auth'
import { CMSLink } from '../../Link'
import classes from './index.module.scss' // Assuming you integrate Tailwind CSS classes here
import Image from 'next/image'

export const HeaderNav: React.FC<{ header: HeaderType }> = ({ header }) => {
  const navItems = header?.navItems || []
  const { user } = useAuth()
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const [hoveredSubMenuIndex, setHoveredSubMenuIndex] = useState<number | null>(null)

  const handleMouseEnter = (index: number) => {
    setActiveIndex(index)
  }

  const handleMouseLeave = () => {
    setActiveIndex(null)
    setHoveredSubMenuIndex(null)
  }

  return (
    <nav
      className={[classes.nav, user === undefined && classes.hide, 'lg:flex hidden flex-1']
        .filter(Boolean)
        .join(' ')}
    >
      {navItems.map(({ link, enableSubMenu, subMenuItems }, i) => (
        <div
          key={i}
          className="relative group"
          onMouseEnter={() => handleMouseEnter(i)}
          onMouseLeave={handleMouseLeave}
        >
          <CMSLink className="text-[14px] font-semibold text-brand-dark group-hover:text-brand-orange px-[8px] min-h-[54px] no-underline" label='' {...link} />
          {enableSubMenu && (
            <div
              className={[
                'fixed left-0 z-10 translate-y-[-6px] translate-x-[-12px] backdrop-blur-md filter bg-custom-gradient rounded-lg shadow-nav-shadow overflow-hidden container mx-auto right-0 max-w-[95%]',
                activeIndex === i
                  ? 'h-auto opacity-100 max-h-[1000px] w-full min-h-[280px] transition-all duration-1000 ease-in-out'
                  : 'h-0 opacity-0 w-0 transition-all duration-1000 ease-in-out',
              ].join(' ')}
              style={{ maxHeight: activeIndex === i ? '1000px' : '0' }}
            >
              <div className="flex flex-row flex-wrap gap-4 p-4">
                {subMenuItems?.map((menuItem, j) => (
                  <div
                    key={j}
                    className="relative flex flex-col text-start max-w-[240px]"
                    onMouseEnter={() => setHoveredSubMenuIndex(j)}
                    onMouseLeave={() => setHoveredSubMenuIndex(null)}
                  >
                    <h6 className="text-b18 font-medium text-brand-dark text-ellipsis line-clamp-1">
                      {menuItem.menuHeading}
                    </h6>
                    <div className="mt-2 flex flex-col gap-[8px]">
                      {menuItem.subMenuLinks?.map((subItem, k) => {
                        const filename =
                          subItem?.media &&
                          typeof subItem?.media !== 'string' &&
                          subItem?.media?.filename
                        const alt =
                          (subItem?.media &&
                            typeof subItem?.media !== 'string' &&
                            subItem?.media?.alt) ||
                          'Menu Item Image'
                        if (menuItem?.showAs === 'banner')
                          return (
                            <CMSLink
                              key={k}
                              label=""
                              className="text-brand-black text-b12 hover:text-brand-orange w-full h-full flex items-center justify-center flex-col no-underline text-ellipsis line-clamp-1"
                              {...subItem.link}
                            >
                              {subItem?.media && (
                                <picture className="w-full max-w-[180px] max-h-[180px] h-full">
                                  <Image
                                    loading="lazy"
                                    width={180}
                                    height={180}
                                    className="aspect-square object-cover object-center rounded-lg w-full h-full min-h-[180px] min-w-full max-h-[180px] max-w-[180px]"
                                    alt={alt}
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
                                  />
                                </picture>
                              )}
                            </CMSLink>
                          )
                        else
                          return (
                            <div key={k} className="flex flex-col">
                              <CMSLink
                                className="text-brand-black text-b16 hover:text-brand-orange w-full h-full flex items-center justify-start gap-[12px] no-underline leading-[120%] text-ellipsis line-clamp-1"
                                {...subItem.link}
                              >
                                {subItem?.media && (
                                  <Image
                                    loading="lazy"
                                    width={60}
                                    height={60}
                                    className="object-cover object-center rounded-full w-full h-full max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] -order-1"
                                    alt={alt}
                                    src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
                                  />
                                )}
                                <p className="">
                                  {subItem?.subMenuTwo && subItem?.subMenuTwo.length > 0 && '↓'}
                                </p>
                              </CMSLink>
                              {subItem?.subMenuTwo && subItem?.subMenuTwo.length > 0 && (
                                <div
                                  className={[
                                    'mt-[24px]',
                                    hoveredSubMenuIndex === j
                                      ? 'opacity-100 visible transition-all duration-300 h-fit'
                                      : 'opacity-0 invisible transition-all duration-300 h-0',
                                  ].join(' ')}
                                >
                                  <div className="grid grid-cols-1 gap-4 pl-4">
                                    {subItem.subMenuTwo.map((subMenuItemTwo, index) => {
                                      const filename =
                                        subMenuItemTwo?.media &&
                                        typeof subMenuItemTwo?.media !== 'string' &&
                                        subMenuItemTwo?.media?.filename
                                      const alt =
                                        (subMenuItemTwo?.media &&
                                          typeof subMenuItemTwo?.media !== 'string' &&
                                          subMenuItemTwo?.media?.alt) ||
                                        'Menu Item Image Two'

                                      return (
                                        <CMSLink
                                          key={index}
                                          className="text-brand-black text-b14 hover:text-brand-orange w-full h-full flex items-center justify-start gap-[12px] no-underline leading-[120%] line-clamp-3 text-ellipsis"
                                          {...subMenuItemTwo.link}
                                        >
                                          {subMenuItemTwo?.media && (
                                            <Image
                                              loading="lazy"
                                              width={60}
                                              height={60}
                                              className="object-cover object-center rounded-full shadow-md w-full h-full max-w-[60px] max-h-[60px] min-w-[60px] min-h-[60px] -order-1"
                                              alt={alt}
                                              src={`${process.env.NEXT_PUBLIC_SERVER_URL}/media/${filename}`}
                                            />
                                          )}
                                        </CMSLink>
                                      )
                                    })}
                                  </div>
                                </div>
                              )}
                            </div>
                          )
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </nav>
  )
}
