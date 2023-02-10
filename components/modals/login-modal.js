import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { useUser } from 'hooks/use-user'
import { Modal } from 'components/modals'
import { useStore } from 'util/store'

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
  const { loginUser } = useUser()
  const setModal = useStore((state) => state.setModal)

  const onSubmit = async (data) => {
    try {
      clearErrors()
      const login = await loginUser.mutateAsync(data)
      setModal(null)
      router.push('/account')
    } catch (error) {
      setError('notification', {
        type: 'manual',
        message: 'Invalid login details.',
      })
      if (error?.code !== 400) console.error(error)
    }
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
