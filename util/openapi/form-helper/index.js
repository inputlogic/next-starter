export const FormHelper = ({ example, reset }) => {
  return (
    <div>
      <button
        type="button"
        onClick={(ev) => {
          ev.preventDefault()
          reset(example)
          //const values = Object.entries(example).map(([field, value]) => ({
          //  name: field,
          //  value,
          //}))
          // console.log('values', values)
          //setValue(
          //  Object.entries(example).map(([field, value]) => ({
          //    name: field,
          //    value,
          //  }))
          //)
        }}
      >
        Helper
      </button>
    </div>
  )
}
