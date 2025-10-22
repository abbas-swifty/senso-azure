import React, { useState, useRef, useEffect } from 'react'
import { Header, Settings } from '../../../../payload/payload-types'
import Link from 'next/link'
import Image from 'next/image'
import classes from './index.module.scss'
import { CMSLink } from '../../Link'

const MobileNav = ({ header, settings }: { header: Header; settings: Settings }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [openSubMenu, setOpenSubMenu] = useState<number | null>(null) // State to manage open submenus
  const navItems = header?.navItems || []
  const modalRef = useRef<HTMLDivElement>(null)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])

  useEffect(() => {
    const handleRouteChange = () => {
      setIsOpen(false)
    }

    window.addEventListener('hashchange', handleRouteChange)
    window.addEventListener('popstate', handleRouteChange)

    return () => {
      window.removeEventListener('hashchange', handleRouteChange)
      window.removeEventListener('popstate', handleRouteChange)
    }
  }, [])

  const toggleSubMenu = (index: number) => {
    setOpenSubMenu(openSubMenu === index ? null : index)
  }

  return (
    <>
      <button className={classes.menuButton} onClick={toggleMenu}>
        <Image src="/assets/icons/burger-icon.svg" alt="Menu Icon" width={24} height={24} />
      </button>
      <div
        className={`
          fixed bottom-0 left-0 right-0 rounded-br-3xl rounded-bl-3xl shadow-2xl top-0 z-[999999] flex flex-col items-end gap-4 bg-brand-dark pr-4 py-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden
          ${isOpen ? 'translate-x-0 h-fit' : 'translate-x-[100%]'}`}
        ref={modalRef}
      >
        <div className="flex flex-col w-full px-[12px]">
          <button className={classes.closeButton} onClick={toggleMenu}>
            &times;
          </button>
          <Link href="/">
            <Image
              className="object-contain object-center"
              height={48}
              width={240}
              alt={
                (settings?.siteLogo &&
                  typeof settings?.siteLogo !== 'string' &&
                  settings?.siteLogo?.alt) ||
                'Senso Coffee'
              }
              src={
                (settings?.siteLogo &&
                  typeof settings?.siteLogo !== 'string' &&
                  settings?.siteLogo?.url) ||
                ''
              }
            />
          </Link>
          <nav className="flex flex-col mt-[24px] text-start justify-start items-start w-full">
            {navItems.map(({ link, enableSubMenu, subMenuItems }, i) => {
              return (
                <div className="flex flex-col w-full" key={i}>
                  <div className="flex flex-row w-full items-center">
                    { !enableSubMenu ? <CMSLink
                      className="text-h6 group-hover:text-brand-orange w-full"
                      {...link}
                      appearance="none"
                    /> : <span className="text-h6 w-full flex justify-center items-center group-hover:text-brand-orange text-center bg-transparent text-white outline-none border-none h-[56px]" onClick={() => toggleSubMenu(i)}>{link.label} {openSubMenu === i ? '↑' : '↓'}</span>}
                  </div>
                  {enableSubMenu && openSubMenu === i && (
                    <div className="pl-[12px]">
                      {subMenuItems &&
                        subMenuItems.length > 0 &&
                        subMenuItems.map((menuItem, j) => {
                          return (
                            <div key={j}>
                              {menuItem.subMenuLinks.map((subItem, k) => {
                                return (
                                  <div key={k}>
                                    <CMSLink
                                      className="text-b16 group-hover:text-brand-orange text-center w-full mt-[-12px]"
                                      {...subItem.link}
                                      appearance="none"
                                    />
                                  </div>
                                )
                              })}
                            </div>
                          )
                        })}
                    </div>
                  )}
                </div>
              )
            })}
          </nav>
        </div>
      </div>
    </>
  )
}

export default MobileNav
