export const RadioButton = ({
  id,
  name,
  value,
  formName,
  variant,
  text,
  ...props
}) => (
  <div className={`radio-component-button ${variant || ''}`}>
    <input type="radio" name={name} value={value} id={id} {...props} />
    <label for={id}>
      <span className="content">
        {text && <span className="text">{text}</span>}
      </span>
    </label>
  </div>
)
