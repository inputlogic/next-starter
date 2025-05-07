'use client'

import styles from './maintenance.module.scss'

const maintenanceMessage = process.env.NEXT_PUBLIC_MAINTENANCE_UPCOMING

export function Maintenance() {
  if (!maintenanceMessage) return null

  return (
    <div className={styles.container}>
      <div className={styles.message}>{maintenanceMessage}</div>
    </div>
  )
}
