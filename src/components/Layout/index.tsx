import { useTheme } from "@/global/hooks/useTheme"
import { ReactNode, useEffect } from "react"
import Navigation from "../Navigation"
import Transition from "./Transition"
// import { Inter } from "next/font/google"

// const inter = Inter({ subsets: ["latin"] })

export default function Layout({ children }: { children: ReactNode }) {
  const theme = useTheme()

  useEffect(() => {
    if (
      theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [theme])

  return (
    <main className="flex min-h-screen flex-row gap-24 p-32 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-50 font-mono">
      <Navigation />
      <div className="flex container min-h-full">
        <Transition>{children}</Transition>
      </div>
    </main>
  )
}
