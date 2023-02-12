export const classnames = (...names) => {
  return (Array.isArray(names[0]) ? names[0] : names)
    .filter(Boolean)
    .join(' ')
    .trim()
}
