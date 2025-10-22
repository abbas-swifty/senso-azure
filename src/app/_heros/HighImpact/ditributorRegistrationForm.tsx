'use client'

import { usePathname, useRouter } from 'next/navigation'
import React, { useCallback, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Message } from '../../_components/Message'
import { Input } from '../../_components/Input'
import Image from 'next/image'
import classes from './index.module.scss'

type FormData = {
  fullName: string
  email: string
  address: string
  phoneNumber: string
  company: string
}

const DistributorRegistrationForm: React.FC = () => {
  const pathName = usePathname()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/distributors`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json',
        },
      })

      if (!response.ok) {
        const message = response.statusText || 'There was an error sending your information.'
        setError(message)
        setLoading(false)
        return
      }
      const timer = setTimeout(() => {
        setLoading(true)
      }, 1000)

      try {
        clearTimeout(timer)
      } catch (_) {
        clearTimeout(timer)
        setLoading(false)
        setError('There was an error with the information provided. Please try again.')
      }
      setLoading(false)
      setSubmitted(true)
    },
    [router],
  )

  if (pathName !== '/distributors') {
    return null
  }

  return (
    <div>
      {submitted ? (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-11 shadow-lg"
          role="alert"
        >
          <strong className="font-bold">Thank you! </strong>
          <span className="block sm:inline">we will get in touch with you soon.</span>
        </div>
      ) : (
        <div className="flex flex-col bg-brand-primary/25 backdrop-blur-md p-8 rounded-2xl gap-6 lg:w-fit w-full">
          <p className="text-b16 text-white leading-subHeadingLH2 font-normal lg:max-w-[340px]">
            Tell us a little about your business to get connected with the right supporting team.
          </p>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col justify-center gap-6">
            <div className="flex flex-col gap-3 lg:min-w-[340px]">
              <Message error={error} className="" />
              <Input
                name="fullName"
                label="Full Name*"
                required
                register={register}
                error={errors.fullName}
                type="text"
              />
              <Input
                name="email"
                label="Email address*"
                required
                register={register}
                error={errors.email}
                type="email"
              />
              <Input
                name="address"
                label="Full address*"
                required
                register={register}
                error={errors.address}
                type="text"
              />
              <Input
                name="phoneNumber"
                label="Phone number*"
                required
                register={register}
                error={errors.phoneNumber}
                type="tel"
              />
              <Input
                name="company"
                label="Company name*"
                required
                register={register}
                error={errors.company}
                type="text"
              />
            </div>
            <div>
              <button disabled={loading} type="submit" className={classes.button}>
                <span>{loading ? 'Processing' : 'Become a Distributors'}</span>
                <Image
                  alt="Arrow Up"
                  width={32}
                  height={32}
                  src={'/assets/icons/ArrowUpRight.svg'}
                />
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

export default DistributorRegistrationForm
