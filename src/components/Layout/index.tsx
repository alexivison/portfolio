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
    <main className="fixed inset-0 flex flex-row gap-8 md:gap-16 py-6 pl-8 pr-6 md:py-32 md:px-0 justify-center bg-white dark:bg-black text-black dark:text-white font-mono">
      <Navigation />
      <div className="flex w-full max-w-screen-sm min-h-full">
        <Transition>{children}</Transition>
      </div>
    </main>
  )
}
