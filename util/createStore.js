import * as R from 'ramda'
import {useState, useEffect} from 'react'

export const createStore = buildInitialState => {
  let listeners = []
  const initial = buildInitialState ? buildInitialState() : {}
  let state = initial

  const store = {
    subscribe: (fn) => {
      listeners.push(fn)
      return () => { 
        listeners = listeners.filter(l => l != fn) 
      }
    },
    set: (path, value, noPublish) => {
      if (R.equals(store.get(path), value)) return
      let oldState = state
      state = R.assocPath(path, value, state)
      !noPublish && listeners.forEach(l => l(state, oldState, path))
    },
    get: (path) => R.path(path, state),
    use: (path, defaultValue, {override = false, cleanup = false} = {}) => {
      const [localState = defaultValue, setLocalState] = useState(override ? defaultValue : store.get(path))
      useEffect(() => () => cleanup && store.set(path, undefined), [])
      useEffect(() => {
        if (!override && store.get(path) !== undefined) return
        if (defaultValue === undefined) return
        store.set(path, defaultValue)
      }, [])
      useEffect(() => {
        const unsubscribe = store.subscribe(() => {
          const newLocalState = store.get(path)
          if (R.equals(localState, newLocalState)) return
          setLocalState(newLocalState)
        })
        return () => unsubscribe()
      }, [localState])
      return [localState, x => store.set(path, x)]
    },
    debug: () => console.log({
      listeners,
      state
    }),
    reset: () => store.set([], buildInitialState ? buildInitialState() : {})
  }

  return store
}
