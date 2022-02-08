import { useState } from 'react'
import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'

import { post } from 'util/api'

const ResetPassword = () => {
  const [showSuccess, setShowSuccess] = useState(false)
  const router = useRouter()
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(
      y.object().shape({
        pass1: y.string().min(8).required(),
        pass2: y
          .string()
          .oneOf([y.ref('pass1'), null], "Passwords don't match")
          .required(),
      })
    ),
  })

  const onSubmit = async (data) => {
    try {
      const {
        token: [resetToken, userId],
      } = router.query
      const resp = await post('resetPassword', {
        token: resetToken,
        user_id: userId,
        password: data.pass1,
      })
      setShowSuccess(true)
    } catch (error) {
      if (error.code === 400) alert('Invalid token')
      else alert('Unkown error')
      console.error(error)
    }
  }

  return (
    <>
      <h2>Reset Password</h2>

      {!showSuccess && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="password"
            placeholder="New password"
            {...register('pass1')}
          />
          <br />
          {errors.pass1 && (
            <div className="input-error">{errors.pass1?.message}</div>
          )}

          <input
            type="password"
            placeholder="Confirm new password"
            {...register('pass2')}
          />
          <br />
          {errors.pass2 && (
            <div className="input-error">{errors.pass2?.message}</div>
          )}

          <input
            type="submit"
            disabled={isSubmitting}
            value="Change password"
          />
        </form>
      )}

      {showSuccess && (
        <p>
          Your password has been reset! You may now login with your new
          password.
        </p>
      )}
    </>
  )
}

ResetPassword.Layouts = ['BaseLayout']
export default ResetPassword
