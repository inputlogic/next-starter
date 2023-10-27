import { buildOpenApiToolkit } from 'util/openapi/build-openapi-toolkit'
import { config } from './config'
import doc from './openapi-doc.json'

/**
 * This openapi object has a bunch of helpful network tools
 * Do a global search of openapi to see examples.
 * It can also be useful to console.log this to see
 * everything that is available.
 * - url builder
 * - http methods
 * - react-query hooks and mutations
 */
export const openapi = buildOpenApiToolkit(doc, config)
