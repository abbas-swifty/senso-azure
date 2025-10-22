import React from 'react'
import { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'

import { Gutter } from '../../_components/Gutter'
import { RenderParams } from '../../_components/RenderParams'
import { getMeUser } from '../../_utilities/getMeUser'
import { mergeOpenGraph } from '../../_utilities/mergeOpenGraph'
import CreateAccountForm from './CreateAccountForm'

import classes from './index.module.scss'
import { Settings } from '../../../payload/payload-types'
import { fetchSettings } from '../../_api/fetchGlobals'

export default async function CreateAccount() {
  let settings: Settings | null = null

  await getMeUser({
    validUserRedirect: `/account?warning=${encodeURIComponent(
      'Cannot create a new account while logged in, please log out and try again.',
    )}`,
  })

  try {
    settings = await fetchSettings()
  } catch (err) {
    console.log('Login page fetching settings: ', err)
  }

  const fileName = settings?.createAccountBanner?.filename || ''
  const backgroundImageStyle = fileName
    ? { backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/media/${fileName})` }
    : {}

  return (
    <section className={classes.createAccount}>
      <div style={backgroundImageStyle} className={classes.heroImg}></div>
      <div className={classes.formWrapper}>
        <div className={classes.formContainer}>
          <RenderParams className={classes.params} />

          <div className={classes.formTitle}>
            <h3 className="text-h3 text-brand-dark leading-headingLH2 ">Create Account</h3>
            <Image src="/assets/icons/hand.png" alt="hand" width={30} height={30} />
          </div>

          <p className="text-b18 text-brand-dark leading-headingLH2">Please enter details</p>

          <CreateAccountForm />
        </div>
      </div>
    </section>
  )
}

export const metadata: Metadata = {
  title: 'Account',
  description: 'Create an account or log in to your existing account.',
  openGraph: mergeOpenGraph({
    title: 'Account',
    url: '/account',
  }),
}
