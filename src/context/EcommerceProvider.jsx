import { useEffect, useReducer } from 'react'
import { EcommerceContext } from '../hooks/useEcommerce'
import { ecommerceReducer, initialState, ACTIONS } from './ecommerceReducer'

const STORAGE_KEY = 'ecommerce_state_v1'

function loadPersistedState() {
  if (typeof window === 'undefined') return null
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    return parsed
  } catch {
    return null
  }
}

export function EcommerceProvider({ children, persist = true }) {
  const [state, dispatch] = useReducer(
    ecommerceReducer,
    undefined,
    () => {
      if (persist) {
        const persisted = loadPersistedState()
        if (persisted) {
          return {
            ...initialState,
            ...persisted,
          }
        }
      }
      return initialState
    },
  )

  useEffect(() => {
    if (!persist) return
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    } catch {
      
    }
  }, [state, persist])

  const actions = {
    login: (user) => dispatch({ type: ACTIONS.LOGIN, payload: user }),
    logout: () => dispatch({ type: ACTIONS.LOGOUT }),
    addCategory: (name) => dispatch({ type: ACTIONS.ADD_CATEGORY, payload: { name } }),
    editCategory: (id, name) =>
      dispatch({ type: ACTIONS.EDIT_CATEGORY, payload: { id, name } }),
    deleteCategory: (categoryId) =>
      dispatch({ type: ACTIONS.DELETE_CATEGORY, payload: categoryId }),
    addProduct: (product) => dispatch({ type: ACTIONS.ADD_PRODUCT, payload: product }),
    editProduct: (product) =>
      dispatch({ type: ACTIONS.EDIT_PRODUCT, payload: product }),
    deleteProduct: (productId) =>
      dispatch({ type: ACTIONS.DELETE_PRODUCT, payload: productId }),
    toggleWishlist: (productId) =>
      dispatch({ type: ACTIONS.TOGGLE_WISHLIST, payload: productId }),
    setSearch: (search) => dispatch({ type: ACTIONS.SET_SEARCH, payload: search }),
    setSelectedCategory: (categoryId) =>
      dispatch({ type: ACTIONS.SET_SELECTED_CATEGORY, payload: categoryId }),
  }

  const value = { state, actions }

  return (
    <EcommerceContext.Provider value={value}>
      {children}
    </EcommerceContext.Provider>
  )
}
