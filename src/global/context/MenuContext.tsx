import { createContext, useContext, useState, ReactNode, useCallback, useMemo } from "react"

type MenuContextType = {
  isMenuOpen: boolean
  toggleMenu: () => void
  closeMenu: () => void
}

const MenuContext = createContext<MenuContextType | null>(null)

export function MenuProvider({ children }: { children: ReactNode }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = useCallback(() => setIsMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setIsMenuOpen(false), [])

  const value = useMemo(
    () => ({ isMenuOpen, toggleMenu, closeMenu }),
    [isMenuOpen, toggleMenu, closeMenu]
  )

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  )
}

export function useMenu() {
  const context = useContext(MenuContext)
  if (!context) {
    throw new Error("useMenu must be used within a MenuProvider")
  }
  return context
}

