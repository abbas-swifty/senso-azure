import React, { Suspense } from 'react'
import { Metadata } from 'next'
import { DM_Serif_Display, Inter } from 'next/font/google'
import { AdminBar } from './_components/AdminBar'
import { Footer } from './_components/Footer'
import { Header } from './_components/Header'
import { Providers } from './_providers'
import { InitTheme } from './_providers/Theme/InitTheme'
import { mergeOpenGraph } from './_utilities/mergeOpenGraph'

import './_css/app.scss'
import '../../tailwind.css'
import Loading from './loading'
import Head from 'next/head'

const dmSerifDisplay = DM_Serif_Display({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-dm-serif-display',
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-inter',
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <InitTheme />
        {/* <link rel="icon" href="/favicon.ico" sizes="32x32" /> */}
        <link rel="icon" href="/logoMark.svg" type="image/svg+xml" />
        <title>Senso Coffee</title>
      </head>
      <body
        className={`${(dmSerifDisplay.variable, inter.variable)} ${dmSerifDisplay.className} ${inter.className} flex flex-col min-h-screen`}> 
        
        <Suspense fallback={<Loading />}> 
          <Providers>
            {/* <AdminBar /> */}
            {/* @ts-expect-error */}
            <Header />
            <div className="flex-grow">{children}</div>
            {/* @ts-expect-error */}
            <Footer />
          </Providers>
        </Suspense>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SERVER_URL || 'https://payloadcms.com'),
  twitter: {
    card: 'summary_large_image',
    creator: '@sensocoffee',
  },
  openGraph: mergeOpenGraph(),
}
