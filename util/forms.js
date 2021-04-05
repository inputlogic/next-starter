import router from 'next/router'
import { useStore } from '@/util/store'
import { url } from '@/util/urls'

/**
 * Takes a form submit event and collects all input fields, returning them as a key=>value object.
 *
 * asArray is used to get a form field (usually a checkbox) as an array of values.
 */
export function getFormData(e, asArray=[]) {
  e.preventDefault()
  const formData = new FormData(e.target)
  const data = {}

  for (const field of formData.entries()) {
    if (!asArray.includes(field)) data[field[0]] = field[1]
  }

  for (const field of asArray) {
    data[field] = formData.getAll(field)
  }

  return data
}

/**
 * DEPRECATED!!!!
 *
 * asArray is used to get a form field (usually a checkbox) as an array of values
 */
export function formHandler(e, redirect, asArray=[]) {
  e.preventDefault()
  const setForm = useStore.getState().setForm
  const formData = new FormData(e.target)
  const data = {}

  for (const field of formData.entries()) {
    if (!asArray.includes(field)) data[field[0]] = field[1]
  }

  for (const field of asArray) {
    data[field] = formData.getAll(field)
  }

  setForm(data)
  router.push(url(redirect))
}
