export const FormHelper = ({ example, reset }) => {
  return (
    <div>
      <button
        type="button"
        onClick={(ev) => {
          ev.preventDefault()
          reset(example)
        }}
      >
        Helper
      </button>
    </div>
  )
}
