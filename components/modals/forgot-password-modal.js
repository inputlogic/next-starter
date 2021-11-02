import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup/dist/yup'
import * as y from 'yup'

import { Modal } from '@/components/modals'

import { post } from '@/util/api'
import { useStore } from '@/util/store'

export function ForgotPasswordModal() {
  const [showSuccess, setShowSuccess] = useState(false)
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
      })
    ),
  })
  const setModal = useStore((state) => state.setModal)

  const onSubmit = async (data) => {
    try {
      clearErrors()
      await post('forgotPassword', data)
      setShowSuccess(true)
    } catch (error) {
      setError('notification', {
        type: 'manual',
        message: 'Invalid login details.',
      })
      if (error?.code !== 400) console.error(error)
    }
  }

  return (
    <Modal variant='small'>
      <h2>Forgot Password</h2>

      {!showSuccess && (
        <>
          {errors.notification && (
            <strong>{errors.notification?.message}</strong>
          )}
          <form onSubmit={handleSubmit(onSubmit)}>
            <input placeholder='Email' {...register('email')} />
            <br />
            {errors.email && (
              <div className='input-error'>{errors.email?.message}</div>
            )}
            <button type='submit' disabled={isSubmitting}>
              Reset password
            </button>
          </form>
        </>
      )}

      {showSuccess && (
        <p>Your password has been reset. Please check your inbox.</p>
      )}
    </Modal>
  )
}
