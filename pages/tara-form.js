import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Use for delaying submit
function timeout(ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export default function TaraForm() {
  const [ isSubmitting, setIsSubmitting ] = useState(false)
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  
  const onError = (errors, e) => {
    console.log('keys', Object.keys(errors))
  }

  const onSubmit = async(data) => {
    setIsSubmitting(true)
    await timeout(2000)
    setIsSubmitting(false)
    console.log('submitted data:', data)
    reset()
  }

  const errorLength = Object.entries(errors).length;
  const errorMessages = Object.entries(errors).map(arr => <p>{arr[1].message}</p>);

  return (
    <>
      {errorLength > 0 ? <div>Please fix the following errors:{errorMessages}</div> : null}
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label htmlFor="name">
          Name{' '}
            <input {...register("name", {required: 'Name is required', minLength: {value: 2, message: 'Name must be at least 2 characters'}})} />
            {errors.name && errors.name.message}
        </label>
        <br />
        <label htmlFor="email">
          Email{' '}
          <input {...register("email", {required: 'Email is required'})} type="email" />
        </label>
        <br />
        <label htmlFor="age">
          Age{' '}
          {/* might be a way to set a single message for both errors? */}
          <input type="number" {...register("age", { min: {value: 5, message: 'Please input valid age'}, max: {value: 150, message: 'Please input valid age'} })} />
        </label>
        <br />
        <label htmlFor="gender">
          Gender{' '}
          <select {...register("gender")}>
            <option value="female">female</option>
            <option value="male">male</option>
            <option value="other">other</option>
          </select>
        </label>
        <br />
        <input type="submit" value="Submit" disabled={isSubmitting} />
      </form>
    </>
  );
}