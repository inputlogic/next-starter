export const Avatar = ({
  src,
  firstName = '',
  lastName = '',
  className = '',
  size = '100',
}) => (
  <div style={{ fontSize: `${size}%` }} className={`avatar-wrap ${className}`}>
    <div className={`avatar ${src && 'hasImage'}`}>
      {src ? (
        <img src={src} alt={firstName} />
      ) : (
        <div className="initial">{firstName[0]}</div>
      )}
    </div>
  </div>
)
