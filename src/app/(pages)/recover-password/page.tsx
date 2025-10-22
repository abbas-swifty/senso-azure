import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import { RecoverPasswordForm } from './RecoverPasswordForm'

import classes from './index.module.scss'
import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'

export default async function RecoverPassword() {
  let settings: Settings | null = null

  try {
    settings = await fetchSettings()
  } catch (err) {
    console.log(err)
  }

  const fileName = settings?.recoverPasswordBanner?.filename || ''
  const backgroundImageStyle = fileName
    ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` }
    : {}

  return (
    <section className={classes.recoverPassword}>
      <div style={backgroundImageStyle} className={classes.heroImg}></div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <Link href="/login" className={classes.backLink}>
            <Image src="/assets/icons/arrow-left.svg" alt="left arrow" width={24} height={24} />
            <p className="text-b18 text-brand-dark font-medium leading-headingLH2">Back</p>
          </Link>
          <div className={classes.formTitle}>
            <h3 className="text-h3 text-brand-dark leading-headingLH2">Forgot Password</h3>
          </div>
          <RecoverPasswordForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Recover Password',
  description: 'Enter your email address to recover your password.',
  openGraph: mergeOpenGraph({
    title: 'Recover Password',
    url: '/recover-password',
  }),
}
