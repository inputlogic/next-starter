import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from "yup"

import { Modal } from '@/components/modals'
import { TextInput } from '@/components/text-input'

import { apiUrl } from '@/util/urls'
import { post } from '@/util/api'
import { useStore } from '@/util/store'

export function LoginModal () {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(y.object().shape({
      email: y.string().email().required(),
      password: y.string().required()
    }))
  })
  const setToken = useStore(state => state.setToken)
  const setModal = useStore(state => state.setModal)

  const onSubmit = async data => {
    try {
      const result = await post('login', data)
      console.log(result)
      // setToken(token)
      // setModal(null)
    } catch (error) {
      console.log('ERROR:', error)
    }
  }

  return (
    <Modal variant='small'>
      <h2>Log in</h2>
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
