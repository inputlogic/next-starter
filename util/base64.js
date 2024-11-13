export const base64FromJson = json => {
  const jsonString = JSON.stringify(json)
  return Buffer.from(jsonString).toString('base64')
}

export const base64ToJson = base64 => {
  const jsonString = Buffer.from(base64, 'base64').toString()
  return JSON.parse(jsonString)
}
