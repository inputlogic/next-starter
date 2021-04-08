import { useForm } from 'react-hook-form'

import { Modal } from '@/components/modals'
import { TextInput } from '@/components/text-input'

import { apiUrl } from '@/util/urls'
import { useStore } from '@/util/store'

export function LoginModal () {
  const { register, handleSubmit, watch, errors, formState: { isSubmitting } } = useForm()
  const setToken = useStore(state => state.setToken)
  const setModal = useStore(state => state.setModal)

  const onSubmit = data => {
    return post(apiUrl('login'), JSON.stringify(data))
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
        <input type='text' placeholder='email@email.com' label='Email address' name='email' {...register({ required: true })} /><br />
        <input type='password' placeholder='Enter a password' label='Password' name='password' /><br />
        <button type='submit' disabled={isSubmitting}>Login</button>
      </form>
    </Modal>
  )
}