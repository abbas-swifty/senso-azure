'use client'

import React, { useCallback, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { Message } from '../../../_components/Message'
import { Input } from '../../../_components/Input'
import { Button } from '../../../_components/Button'

type FormData = {
  firstName: string
  lastName: string
  email: string
  phoneNumber: string
  message: string
}

const Form = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>()

  const onSubmit = useCallback(
    async (data: FormData) => {
      setLoading(true)
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/contact-us`, {
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
      setFormSubmitted(true)
    },
    [router],
  )
  return (
    <div className="flex w-full max-w-[450px]">
      {formSubmitted ? (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
          role="alert"
        >
          <strong className="font-bold">Thank you! </strong>
          <span className="block sm:inline">we will get in touch with you soon.</span>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 justify-center w-full"
        >
          <div className="flex flex-col gap-3 w-full md:max-w-[460px]">
            <Message error={error} className="" />
            <Input
              name="firstName"
              label="First Name"
              required
              register={register}
              error={errors.firstName}
              type="text"
            />
            <Input
              name="lastName"
              label="Last Name"
              required
              register={register}
              error={errors.lastName}
              type="text"
            />
            <Input
              name="email"
              label="Email"
              required
              register={register}
              error={errors.email}
              type="email"
            />
            <Input
              name="phoneNumber"
              label="Phone Number"
              required
              register={register}
              error={errors.phoneNumber}
              type="tel"
            />
            <Input
              name="message"
              label="Message"
              required
              register={register}
              error={errors.message}
              type="text"
            />
          </div>
          <div className="w-full md:w-fit">
            <Button
              type="submit"
              label={loading ? 'Processing' : 'Submit'}
              disabled={loading}
              appearance="primary"
              className="w-full"
            />
          </div>
        </form>
      )}
    </div>
  )
}

export default Form
