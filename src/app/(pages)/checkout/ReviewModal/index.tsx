'use client'

import React, { useState, useEffect } from 'react'
import Modal from 'react-modal'
import { Button } from '../../../_components/Button'
import { Message } from '../../../_components/Message'
import classes from './index.module.scss'
import { useForm, SubmitHandler } from 'react-hook-form'
import StarRatingComponent from 'react-star-rating-component'
import Image from 'next/image'

type ReviewFormData = {
  review: string
  name: string
  rating: number
}

export const ReviewModal: React.FC<{ productIds: string[] }> = ({ productIds }) => {
  const [modalIsOpen, setModalIsOpen] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [reviewSubmitted, setReviewSubmitted] = useState(false)
  const [rating, setRating] = useState<number>(5)
  const [authToken, setAuthToken] = useState<string | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReviewFormData>()

  useEffect(() => {
    const token = localStorage.getItem('authToken')
    setAuthToken(token ?? null)
  }, [])

  const closeModal = () => {
    setModalIsOpen(false)
  }

  const submitReview = async (data: ReviewFormData) => {
    try {
      for (const productId of productIds) {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/productsReviews`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
          },
          body: JSON.stringify({
            product: productId,
            text: data.review,
            name: data.name,
            rating: rating,
          }),
        })

        if (!response.ok) throw new Error(response.statusText || 'Something went wrong.')
      }

      setReviewSubmitted(true)
    } catch (err) {
      const msg = err instanceof Error ? err.message : 'Something went wrong.'
      setError(`Error while submitting review: ${msg}`)
    }
  }

  const onSubmit: SubmitHandler<ReviewFormData> = data => {
    closeModal()
    submitReview(data)
  }

  return (
    <div className="w-full max-w-[780px]">
      {!reviewSubmitted && (
        <div className="w-full flex justify-end mb-8 pl-0 pr-2">
          <button
            onClick={() => setModalIsOpen(true)}
            className="flex items-center gap-3 p-[8px] bg-white outline-none border-[0.3px] border-brand-dark/65-gray rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-pointer"
          >
            <div className="w-12 h-12 flex justify-center items-center bg-brand-dark rounded-full">
              <Image width={32} height={32} alt="Senso Logo Sign" src="/logoMark.svg" />
            </div>
            <span className="text-lg font-medium text-brand-dark">Review Us</span>
          </button>
        </div>
      )}
      {reviewSubmitted && (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-11 shadow-lg"
          role="alert"
        >
          <strong className="font-bold">Thank you for your review! </strong>
          <span className="block sm:inline">We appreciate your feedback and support.</span>
        </div>
      )}

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Submit Review"
        className={classes.modal}
        overlayClassName={classes.overlay}
        closeTimeoutMS={300}
      >
        <h2 className="text-lg font-semibold">Submit Your Review</h2>
        {error && <Message error={error} />}
        {reviewSubmitted && <p className="text-green-600">Thank you for your review!</p>}
        <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
          <div className="flex w-full mb-4">
            <StarRatingComponent
              name="rating"
              starCount={5}
              value={rating}
              starWidthAndHeight="40px"
              starSpacing="15px"
              onStarClick={nextValue => setRating(nextValue)}
            />
            {errors.rating && <p className="text-red-600 text-sm mt-2">Rating is required</p>}
          </div>

          <div className="flex flex-col w-full max-w-[780px] mb-4">
            <input
              id="name"
              {...register('name', { required: true })}
              type="text"
              className={classes.input}
              placeholder="Full Name"
            />
            {errors.name && <p className="text-red-600 text-sm mt-2">Name is required</p>}
          </div>

          <div className="flex flex-col w-full max-w-[780px] mb-4">
            <textarea
              id="review"
              {...register('review', { required: true })}
              rows={4}
              className={classes.input}
              placeholder="Review"
            />
            {errors.review && <p className="text-red-600 text-sm mt-2">Review is required</p>}
          </div>

          <div className={classes.actions}>
            <Button label="Submit Review" type="submit" appearance="primary" />
          </div>
        </form>
      </Modal>
    </div>
  )
}

export default ReviewModal
