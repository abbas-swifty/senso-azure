import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import LoginForm from './LoginForm'

import classes from './index.module.scss'
import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'

export default async function Login() {
  let settings: Settings | null = null

  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent('You are already logged in.')}`,
  })

  try {
    settings = await fetchSettings()
  } catch (err) {
    console.log('Login page fetching settings: ', err)
  }

  const fileName = settings?.loginBanner?.filename || ''
  const backgroundImageStyle = fileName
    ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` }
    : {}

  return (
    <section className={`${classes.login}`}>
      <div style={backgroundImageStyle} className={`${classes.heroImg} hidden lg:flex`}></div>

      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3 className="text-h3 text-brand-dark leading-headingLH2 font-semibold">Welcome</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p className="text-b16 leading-headingLH2 text-brand-dark font-normal">
            Please login here
          </p>

          <LoginForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Login',
  description: 'Login or create an account to get started.',
  openGraph: mergeOpenGraph({
    title: 'Login',
    url: '/login',
  }),
}
