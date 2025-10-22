import React from 'react'

import { Footer, Settings } from '../../../payload/payload-types'
import { fetchFooter, fetchSettings } from '../../_api/fetchGlobals'
import FooterComponent from './FooterComponent'

export async function Footer() {
  let footer: Footer | null = null
  let settings: Settings | null = null
  // let reviews: Review | null = null

  try {
    footer = await fetchFooter()
    settings = await fetchSettings()
  } catch (error) {
    console.log('Footer:', error)
  }

  return <FooterComponent footer={footer} settings={settings} />
}
