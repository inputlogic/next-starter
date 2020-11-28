import Link from 'next/link'
import { store } from '@/util/store'

const Input = ({form, name, defaultValue, cleanup, ...props}) => {
  const [value, setValue] = store.use([form, name], defaultValue, {cleanup})
  return (
    <input
      name={name}
      onChange={ev => setValue(ev.target.value)}
      value={value || ''}
      {...props}
    />
  )
}

const Login = () => {
  const onSubmit = (ev) => {
    ev.preventDefault()
    console.log('submit the login data', store.get(['login']))
  }

  return (
    <div>
      <Link href='/'>Home</Link>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <Input form='login' placeholder='email' name='email' cleanup={true} type='email' />
        <Input form='login' placeholder='password' name='password' cleanup={true} type='password' />
        <input type='submit' value='Log in' />
      </form>
    </div>
  )
}

export default Login
