export const camelCaseToSnakeCase = (str) =>
  str.replace(/[A-Z]/g, (match) => `_${match.toLowerCase()}`)

export const camelCaseToTitleCase = (str) =>
  `${str[0].toUpperCase()}${str.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2')}`

export const kebabCaseToCamelCase = (str) =>
  str.replace(/-([a-z0-9])/gi, (match, letter) => letter.toUpperCase())

export const toTitleCase = (str) =>
  str
    .split(' ')
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(' ')

export const capitalize = (str) => str[0].toUpperCase() + str.slice(1)
