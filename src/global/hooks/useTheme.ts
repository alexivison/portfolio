import { useAtomValue, useSetAtom } from "jotai"
import { themeAtom } from "../atoms/theme"

export const useTheme = () => {
  return useAtomValue(themeAtom)
}

export const useToggleTheme = () => {
  const setTheme = useSetAtom(themeAtom)
  return () => setTheme(prev => prev === 'dark' ? 'light' : 'dark')
}