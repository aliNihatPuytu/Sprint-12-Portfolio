import React, { createContext, useContext, useState } from 'react'
const UIContext = createContext()

export function UIProvider({ children }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const value = { isMenuOpen, setIsMenuOpen }
  return <UIContext.Provider value={value}>{children}</UIContext.Provider>
}
export function useUI(){ return useContext(UIContext) }
