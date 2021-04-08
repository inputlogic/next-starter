import { useState, useEffect } from 'react'

// TODO
//import { useStorePath } from '/store/hooks'
//import { request } from '@app-elements/use-request/request'

export function paginationRange (current, numPages, delta = 1) {
  if (numPages <= 1) return [1]

  const left = current - delta
  const right = current + delta + 1
  const range = []
  const rangeWithDots = []

  range.push(1)

  for (let i = current - delta; i <= current + delta; i++) {
    if (i >= left && i < right && i < numPages && i > 1) {
      range.push(i)
    }
  }

  range.push(numPages)

  let count
  for (const i of range) {
    if (count) {
      if (i - count === delta - 1) {
        rangeWithDots.push(count + 1)
      } else if (i - count !== 1) {
        rangeWithDots.push(null)
      }
    }
    rangeWithDots.push(i)
    count = i
  }

  // if at first or last page, pad range so there are at least 4 options
  // if `numPages` permits it.
  if (numPages >= 4 && rangeWithDots.length === 4) {
    if (current === numPages) {
      return [
        ...rangeWithDots.slice(0, 2),
        ...[numPages - 2],
        ...rangeWithDots.slice(-2)
      ]
    } else if (current === 1) {
      return [
        ...rangeWithDots.slice(0, 2),
        ...[current + 2],
        ...rangeWithDots.slice(-2)
      ]
    }
  }

  return rangeWithDots
}

export const Pagination = ({
  resultsCount,
  setLoading,
  setOrgData,
  scrollRef,
}) => {
  const [activePage, setActivePage] = useState(1)
  const [pages, setPages] = useState(null)
  const [nextRoute, setNextRoute] = useStorePath('detailListingsNextRoute')
  const [prevRoute, setPrevRoute] = useStorePath('detailListingsPrevRoute')

  const onPagingClicked = isNext => {
    scrollRef.current.scrollTo(0, 0)
    onPageBtnClicked(isNext)
  }

  const onPageBtnClicked = isNext => {
    setLoading(true)
    const { promise } = request({
      endpoint: isNext ? nextRoute : prevRoute,
    })
    promise
      .then(companies => {
        setActivePage(isNext ? activePage + 1 : activePage - 1)
        setNextRoute(companies.next)
        setPrevRoute(companies.previous)
        setOrgData(companies.results)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  const onPagingNumberClicked = numberClicked => {
    setLoading(true)
    scrollRef.current.scrollTo(0, 0)
    const offset = numberClicked > 1 ? (numberClicked - 1) * 50 : 0
    const url = new URL(nextRoute || prevRoute)
    const searchParams = url.searchParams
    searchParams.set('offset', offset)
    const searchUrl = `${url.origin}${url.pathname}?${searchParams.toString()}`
    const { promise } = request({
      endpoint: searchUrl,
    })
    promise
      .then(companies => {
        setActivePage(numberClicked)
        setNextRoute(companies.next)
        setPrevRoute(companies.previous)
        setOrgData(companies.results)
        setLoading(false)
      })
      .catch(err => {
        console.error(err)
        setLoading(false)
      })
  }

  useEffect(() => {
    setPages(paginationRange(activePage, Math.ceil(resultsCount / 50)))
  }, [resultsCount, activePage])

  return (
    (!!prevRoute || !!nextRoute) &&
    pages !== null && (
      <div className='listing-pagination'>
        <button
          className={`btn btn-small btn-secondary ${
            prevRoute === null && 'disabled'
          }`}
          onClick={() => onPagingClicked(false)}
          disabled={prevRoute === null}>
          Previous
        </button>
        <ul>
          {pages.map((page, index) =>
            page ? (
              <li key={`page-${page}`}>
                <a
                  onClick={
                    activePage === page
                      ? null
                      : () => onPagingNumberClicked(page)
                  }
                  className={activePage === page ? 'active' : ''}>
                  {page}
                </a>
              </li>
            ) : (
              <li key={`break-${index}`}>&hellip;</li>
            ),
          )}
        </ul>
        <button
          className={`btn btn-small btn-secondary ${
            nextRoute === null && 'disabled'
          }`}
          onClick={() => onPagingClicked(true)}
          disabled={nextRoute === null}>
          Next
        </button>
      </div>
    )
  )
}
