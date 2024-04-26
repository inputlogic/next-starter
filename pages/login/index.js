import { useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'
import * as y from 'yup'
import { useForm as useFormBase, FormProvider, useFormContext } from 'react-hook-form'
import {TextInput as TextInputBase} from '/components/form/text-input'

const useForm = ({onSubmit, ...rest}) => {
  const methods = useFormBase(rest)
  const Form = useMemo(() => {
    return (props) => <FormProvider {...methods} >
      <form onSubmit={methods.handleSubmit(onSubmit)} {...props} />
    </FormProvider>
  }, [])
  return {Form, ...methods}
}

const connector = (Component, {defaultPropsBuilder}) => ({name, ...props}) => {
  const { register, formState } = useFormContext()
  const error = formState?.errors?.[name]?.message
  console.log('yo', name, error)
  return <Component
    name={name}
    error={error}
    {...defaultPropsBuilder?.({name})}
    {...register(name)}
    {...props}
  />
}

const TextInput = connector(TextInputBase, {defaultPropsBuilder: ({name}) => ({label: name})})

const SubmitButton = (props) => {
  return <button {...props} />
}

const Login = () => {
  const {Form} = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ),
    onSubmit: async (data) => {
      console.log('yoooo submit', data)
    }
  })
  return (
    <>
      <h2>Login</h2>
      <p>You should see this page only if you're not logged in</p>
      <Form>
        <TextInput name='email' type='email' />
        <TextInput name='password' type='password' />
        <SubmitButton>Submit</SubmitButton>
      </Form>
    </>
  )
}

const LoginForm = () => {
  const {Form} = useForm({
    resolver: yupResolver(
      y.object().shape({
        email: y.string().email().required(),
        password: y.string().required(),
      })
    ),
    onSubmit: async (data) => {
      console.log('yoooo submit', data)
    }
  })
  return (
    <Form>
      <TextInput name='email' type='email' />
      <TextInput name='password' type='password' />
      <SubmitButton>Submit</SubmitButton>
    </Form>
  )
}

Login.Layouts = ['BaseLayout']
export default Login
