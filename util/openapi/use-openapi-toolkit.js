import { useState, useEffect } from 'react'
import { buildOpenApiToolkit } from 'util/openapi/build-openapi-toolkit'
import { config as defaultConfig } from 'util/openapi/config'

export const useOpenapiToolkit = ({
  openapiUrl = process.env.NEXT_PUBLIC_OPENAPI_URL,
  config = defaultConfig,
  cacheString = '',
} = {}) => {
  const [openapi, setOpenapi] = useState(null)
  useEffect(() => {
    setOpenapi(null)
    const buildToolkit = async () => {
      const res = await fetch(openapiUrl, {
        headers: { 'Content-Type': 'application/json' },
      })
      const json = await res.json()
      setOpenapi(buildOpenApiToolkit(json, config))
    }
    if (openapiUrl) {
      buildToolkit()
    }
  }, [openapiUrl, cacheString])
  return openapi
}
