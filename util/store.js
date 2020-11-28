import { createStore } from './createStore'
import { createStoreDevTools } from './createStoreDevTools'
export const store = createStoreDevTools(createStore(() => ({
  erik: {mom: 5}
})))
