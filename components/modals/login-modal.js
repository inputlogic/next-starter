import { useForm } from 'react-hook-form'

import { Modal } from '@/components/modals'
import { TextInput } from '@/components/text-input'

import { apiUrl } from '@/util/urls'
import { post } from '@/util/api'
import { useStore } from '@/util/store'

export function LoginModal () {
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm()
  const setToken = useStore(state => state.setToken)
  const setModal = useStore(state => state.setModal)

  console.log('errors', errors)

  const onSubmit = data => {
    return post(apiUrl('login'), data)
      .then((response) => response.json())
      .then((data) => {
        const { token, userId } = data
        setToken(token)
        setModal(null)
      })
      .catch((error) => {
        console.error('ERROR: ', error)
      })
  }

  return (
    <Modal variant='small'>
      <h2>Log in</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type='text' placeholder='email@email.com' label='Email address' name='email' {...register('email', { required: true })} /><br />
        {errors.email && <><span className='input-error'>Email is required</span><br /></>}
        <input type='password' placeholder='Enter a password' label='Password' name='password' {...register('password', { required: true, minLength: 5 })} /><br />
        {errors.password && <><span className='input-error'>Password is required and minimum 5 chars.</span><br /></>}
        <button type='submit' disabled={isSubmitting}>Login</button>
      </form>
    </Modal>
  )
}