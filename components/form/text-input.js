export const TextInput = ({
  type = 'text',
  name,
  value,
  label,
  placeholder,
  variant,
  register,
  ...props
}) => (
  <div className={`input-component ${variant || ''}`}>
    {label && <label htmlFor={name}>{label}</label>}
    <input
      type={type}
      name={name}
      value={value}
      autoComplete="off"
      placeholder={placeholder}
      ref={register}
      {...props}
    />
  </div>
)
