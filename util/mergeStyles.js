import { classnames } from 'util/classnames'

/**
 * This function provides a standardized way
 * to override default styling on a component.
 */
export const mergeStyles = (defaultStyles, customStyles) => {
  if (!customStyles) return defaultStyles
  if (typeof customStyles === 'function') return customStyles(defaultStyles)
  const keys = Array.from(
    new Set([...Object.keys(defaultStyles), ...Object.keys(customStyles)])
  )
  return keys.reduce((acc, k) => {
    acc[k] = classnames(defaultStyles[k], customStyles[k])
    return acc
  }, {})
}
