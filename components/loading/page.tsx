import styles from './page.module.scss'

interface PageLoaderProps {
  text?: string
}

export const PageLoader = ({ text }: PageLoaderProps) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loader}>
        {text ? <p className={styles.text}>{text}</p> : null}
      </div>
    </div>
  )
}