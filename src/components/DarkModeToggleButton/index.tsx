import { useTheme, useToggleTheme } from "@/global/hooks/useTheme"
import { useMemo } from "react"
import { FaMoon, FaSun } from "react-icons/fa"

export default function DarkModeToggleButton() {
  const theme = useTheme()
  const toggleTheme = useToggleTheme()

  const Icon = useMemo(() => {
    const commonProps = {
      size: 20,
      color: "inherit",
    }

    switch (theme) {
      case "dark":
        return () => <FaSun {...commonProps} />
      case "light":
        return () => <FaMoon {...commonProps} />
    }
  }, [theme])

  return (
    <button type="button" onClick={toggleTheme}>
      <Icon />
    </button>
  )
}
