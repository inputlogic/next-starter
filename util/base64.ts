type JsonSerializable =
  | string
  | number
  | boolean
  | null
  | JsonSerializable[]
  | { [key: string]: JsonSerializable }

export const base64FromJson = <T extends JsonSerializable>(json: T): string => {
  const jsonString = JSON.stringify(json)
  return Buffer.from(jsonString).toString('base64')
}

export const base64ToJson = <T = unknown>(base64: string): T => {
  const jsonString = Buffer.from(base64, 'base64').toString()
  return JSON.parse(jsonString) as T
}