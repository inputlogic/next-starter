import { useState } from 'react'
import { useForm } from 'react-hook-form'

// Use for delaying submit
function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

export default function TaraForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset
  } = useForm()

  const onError = (errors, e) => {
    console.log('keys', Object.keys(errors))
  }

  const onSubmit = async (data) => {
    await timeout(2000)
    console.log('submitted data:', data)
    reset()
  }

  const errorLength = Object.entries(errors).length
  const errorMessages = Object.entries(errors).map((arr) => (
    <li className="errorMsg">{arr[1].message}</li>
  ))

  return (
    <div className="container">
      
      <div className="errorsBox">
        {errorLength > 0 ? (
          <ul>Please fix the following errors:{errorMessages}</ul>
        ) : null}
      </div>
      <form onSubmit={handleSubmit(onSubmit, onError)}>
        <label htmlFor="name">Name </label>
        <input
          className={errors.name?.message ? 'error' : ''}
          {...register('name', {
            required: 'Name is required',
            minLength: {
              value: 2,
              message: 'Name must be at least 2 characters'
            }
          })}
        />
        {errors.name?.message}
        <br />
        <label htmlFor="email">
          Email{' '}
          <input
            className={errors.email?.message ? 'error' : ''}
            {...register('email', { required: 'Email is required' })}
            type="email"
          />
          {errors.email?.message}
        </label>
        <br />
        <label htmlFor="age">Age </label>
        <input
          className={errors.age?.message ? 'error' : ''}
          type="number"
          {...register('age', {
            min: { value: 5, message: 'Please input valid age' },
            max: { value: 150, message: 'Please input valid age' }
          })}
        />
        {errors.age?.message}
        <br />
        <input type="submit" value="Submit" disabled={isSubmitting} />
      </form>
      <style jsx>{`
        .container {
          margin: 0 auto;
          width: 500px;
          margin-top: 50px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .errorsBox {
          height: 130px;
          display: flex;
          align-items: center;
        }
        .errorMsg {

        }
        .error {
          border: 2px solid red;
        }
      `}</style>
    </div>
  )
}
