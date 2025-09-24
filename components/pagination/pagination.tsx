import Link from 'next/link'
import { Icon } from 'components/icon'
import styles from './pagination.module.scss'
import { classnames } from 'util/classnames'
import { ReactNode } from 'react'

export interface PaginationProps {
  totalPages: number
  currentPage: number | string
  hrefForPage?: (page: number) => string
  className?: string
  scroll?: boolean
}

interface PageLinkProps {
  page: number
  children?: ReactNode
  disabled?: boolean
  className?: string
  scroll?: boolean
  hrefForPage?: (page: number) => string
}

export const Pagination = ({
  totalPages,
  currentPage,
  hrefForPage,
  className,
  scroll = true,
}: PaginationProps) => {
  const parsedCurrentPage = parseInt(currentPage as string)
  const parsedTotalPages = parseInt(totalPages as unknown as string)

  const PageLink = ({ page, children, disabled, className, scroll }: PageLinkProps) => (
    <Link
      scroll={scroll}
      href={hrefForPage?.(page) || '#'}
      onClick={(ev) => disabled && ev.preventDefault()}
      className={classnames(
        !children && styles.page,
        disabled && styles.disabled,
        className,
      )}
      replace
    >
      {children || page}
    </Link>
  )

  if (parsedTotalPages < 2) return null

  return (
    <div className={classnames([styles.pagination, className])}>
      <PageLink
        page={parsedCurrentPage - 1}
        className={styles.prev}
        disabled={parsedCurrentPage === 1}
        scroll={scroll}
        hrefForPage={hrefForPage}
      >
        <Icon name="chevron-left" />
      </PageLink>
      {parsedCurrentPage > 1 && <PageLink page={1} scroll={scroll} hrefForPage={hrefForPage} />}
      {parsedCurrentPage > 3 && <Spacer />}
      {parsedCurrentPage - 1 > 1 && (
        <PageLink page={parsedCurrentPage - 1} scroll={scroll} hrefForPage={hrefForPage} />
      )}
      <PageLink
        page={parsedCurrentPage}
        disabled
        className={classnames(styles.page, styles.active)}
        scroll={scroll}
        hrefForPage={hrefForPage}
      >
        {parsedCurrentPage}
      </PageLink>
      {parsedCurrentPage + 1 < parsedTotalPages && (
        <PageLink page={parsedCurrentPage + 1} scroll={scroll} hrefForPage={hrefForPage} />
      )}
      {parsedCurrentPage < parsedTotalPages - 2 && <Spacer />}
      {parsedCurrentPage !== parsedTotalPages && (
        <PageLink page={parsedTotalPages} scroll={scroll} hrefForPage={hrefForPage} />
      )}
      <PageLink
        className={styles.next}
        disabled={parsedCurrentPage === parsedTotalPages}
        page={parsedCurrentPage + 1}
        scroll={scroll}
        hrefForPage={hrefForPage}
      >
        <Icon name="chevron-right" />
      </PageLink>
    </div>
  )
}

const Spacer = () => <div className={styles.spacer}>...</div>