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
    <main className="min-h-screen lg:h-screen flex flex-col lg:flex-row gap-4 lg:gap-16 pt-16 px-4 pb-4 lg:py-32 lg:px-0 items-center lg:items-start justify-center bg-white dark:bg-black text-black dark:text-white font-mono lg:overflow-hidden">
      <Navigation />
      <div className="flex w-full max-w-screen-sm lg:overflow-y-auto lg:overflow-x-hidden hide-scrollbar">
        <Transition>{children}</Transition>
      </div>
    </main>
  )
}
