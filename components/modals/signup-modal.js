import { useRouter } from 'next/router'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from "yup"

import { Modal } from '@/components/modals'

import { post } from '@/util/api'
import { useStore } from '@/util/store'

export function SignupModal () {
  const router = useRouter()
  const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(y.object().shape({
      email: y.string().email().required(),
      password: y.string().required()
    }))
  })
  const setUserAndToken = useStore(state => state.setUserAndToken)
  const setModal = useStore(state => state.setModal)

  const onSubmit = async data => {
    try {
      clearErrors()
      const { token, user } = await post('/api/signup', data)
      setUserAndToken(user, token)
      setModal(null)
      router.push('/admin')
    } catch (error) {
      setError('notification', {type: 'manual', message: 'User already exists.'})
      if (error?.code !== 400) console.error(error)
    }
  }

  return (
    <Modal variant='small'>
      <h2>Signup</h2>
      {errors.notification && <strong>{errors.notification?.message}</strong>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input placeholder='Email' {...register('email')} /><br />
        {errors.email && <div className='input-error'>{errors.email?.message}</div>}

        <input type='password' placeholder='Password' {...register('password')} /><br />
        {errors.password && <div className='input-error'>{errors.password?.message}</div>}

        <button type='submit' disabled={isSubmitting}>Login</button>
      </form>
    </Modal>
  )
}
