import React, { createContext, useContext } from 'react'

export const EcommerceContext = createContext(null)

export function useEcommerce() {
  const context = useContext(EcommerceContext)
  if (!context) {
    throw new Error('useEcommerce must be used within an EcommerceProvider')
  }
  return context
}
