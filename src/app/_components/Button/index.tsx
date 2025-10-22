'use client'

import React, { ElementType } from 'react'
import Link from 'next/link'

import classes from './index.module.scss'
import Image from 'next/image'

export type Props = {
  label?: string
  appearance?: 'default' | 'primary' | 'secondary' | 'none'
  el?: 'button' | 'link' | 'a'
  onClick?: () => void
  href?: string
  newTab?: boolean
  className?: string
  type?: 'submit' | 'button'
  disabled?: boolean
  invert?: boolean
  children?: React.ReactNode
}

export const Button: React.FC<Props> = ({
  el: elFromProps = 'link',
  label,
  newTab,
  href,
  appearance,
  className: classNameFromProps,
  onClick,
  type = 'button',
  disabled,
  invert,
  children,
}) => {
  let el = elFromProps

  const newTabProps = newTab ? { target: '_blank', rel: 'noopener noreferrer' } : {}

  const className = [
    classes.button,
    classNameFromProps,
    classes[`appearance--${appearance}`],
    invert && classes[`${appearance}--invert`],
  ]
    .filter(Boolean)
    .join(' ')

  const content = (
    <div className={classes.content}>
      <span style={{ color: 'white' }} className={classes.D}>{label}</span>
      {appearance === 'primary' && (
        <Image alt="Arrow Up" width={32} height={32} src={'/assets/icons/ArrowUpRight.svg'} />
      )}
      {children}
    </div>
  )

  if (onClick || type === 'submit') el = 'button'

  if (el === 'link') {
    return (
      <Link href={href || ''} className={className} {...newTabProps} onClick={onClick}>
        {content}
      </Link>
    )
  }

  const Element: ElementType = el

  return (
    <Element
      href={href}
      className={className}
      type={type}
      {...newTabProps}
      onClick={onClick}
      disabled={disabled}
    >
      {content}
    </Element>
  )
}
