import { Pagination as BasePagination } from 'components/pagination'
import { useListContext } from 'components/list/list-provider'

interface PaginationProps {
  className?: string
  scroll?: boolean
}

export const Pagination = ({ className, scroll = true }: PaginationProps = {}) => {
  const { setParam, params, count } = useListContext()

  if (count === undefined) {
    return null
  }

  const limit = parseInt(params.limit as string)
  const offset = parseInt((params.offset as string) || '0')
  const totalPages = Math.ceil(count / limit)
  const currentPage = Math.floor(offset / limit) + 1

  return (
    <BasePagination
      totalPages={totalPages}
      currentPage={currentPage}
      hrefForPage={(page: number) => setParam('offset', String((page - 1) * limit))}
      className={className}
      scroll={scroll}
    />
  )
}