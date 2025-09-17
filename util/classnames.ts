type ClassValue = string | boolean | undefined | null | ClassValue[]

export const classnames = (...namesArray: ClassValue[]): string =>
  (Array.isArray(namesArray[0]) ? namesArray[0] : namesArray)
    .filter(Boolean)
    .join(' ')
    .trim()