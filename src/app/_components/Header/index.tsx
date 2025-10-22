{
  /* eslint-disable @next/next/no-img-element */
}

import React from 'react'
import { fetchHeader, fetchSettings } from '../../_api/fetchGlobals'
import { Header, Settings } from '../../../payload/payload-types'
import classes from './index.module.scss'
import HeaderComponent from './HeaderComponent'

export async function Header() {
  let header: Header | null = null
  let settings: Settings | null = null

  try {
    header = await fetchHeader()
    settings = await fetchSettings()

  } catch (error) {
    console.log("Header: ", error);

  }

  return (
    <>
      <header className={`${classes.header} absolute z-[1] w-full`}>
        <HeaderComponent header={header} settings={settings} />
      </header>
    </>
  )
}
