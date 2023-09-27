import Link from 'next/link'
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons'

import styles from './pagination.module.scss'

const Spacer = () => (
  <div>
    <span>...</span>
  </div>
)

export const Pagination = ({ pageCount, page, hrefForPage }) => {
  page = parseInt(page)
  pageCount = parseInt(pageCount)

  const PageLink = ({ page, children, disabled }) => (
    <Link
      href={hrefForPage?.(page) || '#'}
      onClick={(ev) => disabled && ev.preventDefault()}
      className={disabled && styles.disabled}
      replace
    >
      {children || page}
    </Link>
  )

  if (pageCount < 2) return
  return (
    <div className={styles.pagination}>
      <PageLink page={page - 1} disabled={page === 1}>
        <ChevronLeftIcon />
      </PageLink>
      {page > 1 && <PageLink page={1} />}
      {page > 3 && <Spacer />}
      {page - 1 > 1 && <PageLink page={page - 1} />}
      <a className={styles.paginationActive}>{page}</a>
      {page + 1 < pageCount && <PageLink page={page + 1} />}
      {page < pageCount - 2 && <Spacer />}
      {page !== pageCount && <PageLink page={pageCount} />}
      <PageLink page={page + 1} disabled={page === pageCount}>
        <ChevronRightIcon />
      </PageLink>
    </div>
  )
}
