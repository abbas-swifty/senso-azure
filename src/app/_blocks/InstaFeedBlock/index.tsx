'use client'

import React, { useEffect, useState } from 'react'
import { Page } from '../../../payload/payload-types'
import Image from 'next/image'
import Link from 'next/link'
import { LoadingShimmer } from '../../_components/LoadingShimmer'

type Props = Extract<Page['layout'][0], { blockType: 'instaFeedBlock' }> & {
  id?: string
}

type InstagramPost = {
  id: string
  caption: string
  media_url: string
  media_type: string
  timestamp: string
  permalink: string
}

type InstagramPaging = {
  cursors: {
    before: string
    after: string
  }
}

type InstagramFeed = {
  data: InstagramPost[]
  paging?: InstagramPaging
}

export const InstaFeedBlock: React.FC<Props> = ({ heading, subHeading }) => {
  const [instagramFeed, setInstagramFeed] = useState<InstagramFeed | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  // const fetchFeed = async () => {
  //   try {
  //     const url = new URL('https://graph.instagram.com/me/media')
  //     url.searchParams.append('scope', 'user_profile,user_media,instagram_graph_user_profile')
  //     url.searchParams.append('fields', 'id,caption,media_url,media_type,timestamp,permalink')
  //     url.searchParams.append(
  //       'access_token',
  //       'IGQWRNbE5iM05kUjU2MEZAnd0EwbUdUaTJ2aTFfZAW5na29qaDZACbnMzSmNaZAHhqX1pIWU9LaWFDalF3SmVxWTNkUDdvWlk4eHRNM1EzaTJrbk9pLW8wMzFVY2xNUEZACRVFOSHJZANC1MWkRZAMmdpODZA1XzRUaVhqd0kZD',
  //     )

  //     const response = await fetch(url.toString())
  //     const result = await response.json()

  //     if (response.ok) {
  //       setInstagramFeed(result)
  //     } else {
  //       setError(result.error.message)
  //     }
  //   } catch (err: any) {
  //     console.error('Error fetching Instagram feed:', err.message)
  //     setError(err.message)
  //   } finally {
  //     setLoading(false) // Set loading to false once the data is fetched
  //   }
  // }

  useEffect(() => {
    // fetchFeed()
  }, [])

  return (
    <>
      {error && <p className="text-red-500 hidden">{error}</p>}

      <section id="instagram-feeds" className="bg-brand-light-bg hidden">
        <div className="container mx-auto py-8 px-4 flex-col flex lg:py-16 lg:px-8 items-center">
          <h4 className="text-h4 font-normal text-brand-dark tracking-tight">{heading || ''}</h4>
          <p className="text-b16 font-normal text-brand-dark mt-3">{subHeading || ''}</p>
          {loading ? (
            <LoadingShimmer number={6} height={210} />
          ) : (
            <div className="w-full grid grid-cols-1 lg:grid-cols-6 gap-6 min-h-[240px] mt-8">
              {/* {instagramFeed?.data?.slice(0, 6).map((post: InstagramPost) => (
                <div
                  key={post.id}
                  className="relative group w-full max-w-[210px] max-h-[210px] h-full"
                >
                  <Link
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative flex"
                  >
                    {post.media_type === 'VIDEO' ? (
                      <video
                        src={post.media_url}
                        controls={false}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image
                        src={post.media_url}
                        alt={post.caption ?? 'Post Caption'}
                        className="w-full h-full max-h-[210px] max-w-[210px] object-cover"
                        width={210}
                        height={210}
                      />
                    )}

                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-300 bg-black bg-opacity-50 flex items-center justify-center p-4 w-full max-w-[210px] h-full max-h-[210px]">
                      <p className="text-white text-center text-xs truncate">{post.caption}</p>
                    </div>
                  </Link>
                </div>
              ))} */}
            </div>
          )}
        </div>
      </section>
    </>
  )
}

export default InstaFeedBlock
