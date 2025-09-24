import styles from './style.module.scss'

interface AvatarProps {
  src?: string
  firstName?: string
  className?: string
  size?: string | number
}

export const Avatar = ({
  src,
  firstName = '',
  className = '',
  size = '100',
}: AvatarProps) => (
  <div
    style={{ fontSize: `${size}%` }}
    className={`${styles.avatarWrap} ${className}`}
  >
    <div className={`${styles.avatar} ${src && 'hasImage'}`}>
      {src ? (
        <img src={src} alt={firstName} />
      ) : (
        <div className={styles.initial}>{firstName[0]}</div>
      )}
    </div>
  </div>
)
