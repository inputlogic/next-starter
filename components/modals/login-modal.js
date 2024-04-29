import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { Modal } from 'components/modal'
import { useStore } from 'util/store'
import { useMutation } from '@tanstack/react-query'
import { loginSession } from 'hooks/session'

export function LoginModal() {
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
    mutate: loginUser,
    isLoading,
    isError,
    error,
  } = useMutation({
    queryKey: ['login'],
    mutationFn: loginSession,
    onSuccess: (data) => {
      console.log('Login successful', data)
      setModal(null)
      router.push('/dashboard')
    },
    onError: (error) => {
      console.error('Login error', error)
      setError('notification', {
        type: 'manual',
        message: 'Invalid login details.',
      })
    },
  })

  const onSubmit = async (data) => {
    clearErrors()
    loginUser(data)
  }

  return (
    <Modal variant="small">
      <h2>Log in</h2>
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
          Login
        </button>
        <a href="#" onClick={() => setModal('ForgotPasswordModal')}>
          Forgot password?
        </a>
      </form>
    </Modal>
  )
}
