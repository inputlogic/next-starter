export const debounce = <T extends (...args: any[]) => any>(
  fn: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => fn(...args), wait)
  }
}