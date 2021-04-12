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
  } = useForm({
    reValidateMode: 'onBlur',
    defaultValues: { name: '', email: '', age: '' }
  })

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
        <label htmlFor="name">
          Name
          <input
            className={errors.name?.message ? 'error' : ''}
            aria-invalid={errors.name ? 'true' : 'false'}
            {...register('name', {
              required: 'Name is required',
              minLength: {
                value: 2,
                message: 'Name must be at least 2 characters'
              }
            })}
          />
          {errors.name?.type === 'required' && (
            <span role="alert">Name is required</span>
          )}
          {errors.name?.type === 'minLength' && (
            <span role="alert">Name must be at least 2 characters</span>
          )}
        </label>
        <br />
        <label htmlFor="email">
          Email{' '}
          <input
            className={errors.email?.message ? 'error' : ''}
            aria-invalid={errors.email ? 'true' : 'false'}
            {...register('email', {
              required: 'Email is required'
            })}
            type="email"
          />
          {errors.email?.type === 'required' && (
            <span role="alert">Email is required</span>
          )}
        </label>
        <br />
        <label htmlFor="age">
          Age
          <input
            className={errors.age?.message ? 'error' : ''}
            aria-invalid={errors.age ? 'true' : 'false'}
            type="number"
            {...register('age', {
              min: { value: 5, message: 'Please input valid age' },
              max: { value: 150, message: 'Please input valid age' }
            })}
          />
          {errors.age?.message && (
            <span role="alert">Please input valid age</span>
          )}
        </label>
        <br />
        <input
          className="submitBtn"
          type="submit"
          value="Submit"
          disabled={isSubmitting}
        />
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
        .error {
          border: 2px solid red;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        input {
          margin-left: 5px;
        }
        .submitBtn {
          align-self: center;
        }
      `}</style>
    </div>
  )
}
