import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { Modal } from 'components/modal'
import { signupSession } from 'hooks/session'
import { useStore } from 'util/store'
import { useMutation } from '@tanstack/react-query'

export function SignupModal() {
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
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ),
  })
  const setModal = useStore((state) => state.setModal)

  const {
    mutate: signupUserMutation,
    isLoading,
    isError,
    error,
  } = useMutation({
    queryKey: ['signup'],
    mutationFn: signupSession,
    onSuccess: (data) => {
      console.log('Signup successful', data)
      setModal(null)
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Signup error', error)
      setError('notification', {
        type: 'manual',
        message: 'Invalid Signup details.',
      })
    },
  })

  const onSubmit = async (data) => {
    clearErrors()
    signupUserMutation(data)
  }

  return (
    <Modal variant="small">
      <h2>Signup</h2>
      {errors.notification && <strong>{errors.notification?.message}</strong>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder="Email" {...register('email')} />
        <br />
        {errors.email && (
          <div className="input-error">{errors.email?.message}</div>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register('password')}
        />
        <br />
        {errors.password && (
          <div className="input-error">{errors.password?.message}</div>
        )}

        <button type="submit" disabled={isSubmitting}>
          Signup
        </button>
      </form>
    </Modal>
  )
}
