import { routes, useRoutes } from "@/routes"
import { AnimatePresence, motion, Variants } from "framer-motion"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useEffect, useMemo, useRef, useState } from "react"
import { FaBars } from "react-icons/fa"
import DarkModeToggleButton from "../DarkModeToggleButton"
import LanguageSwitcher from "../LanguageSwitcher"

const duration = 0.25

const variants: Variants = {
  in: {
    opacity: 1,
    transition: {
      duration,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration,
    },
  },
}

function Link({ to, children }: { to: string; children: string }) {
  const { asPath } = useRouter()
  const isActive = useMemo(() => asPath === to, [asPath, to])

  return (
    <NextLink
      href={to}
      className={`
        relative flex items-center h-full hover:text-black hover:dark:text-white
        ${
          isActive
            ? "text-black dark:text-white"
            : "text-subtext-light dark:text-subtext-dark"
        }
      `}
    >
      {/* On mobile: always show text. On desktop: hide text when active (show dot instead) */}
      <span className={isActive ? "md:invisible" : ""}>{children}</span>
      {/* Dot indicator - only visible on desktop when active */}
      <AnimatePresence initial={false}>
        {isActive && (
          <motion.span
            key="active-dot"
            variants={variants}
            animate="in"
            initial="out"
            exit="out"
            className="hidden md:block absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-black dark:bg-white rounded"
          />
        )}
      </AnimatePresence>
    </NextLink>
  )
}

export default function Navigation() {
  const { asPath } = useRouter()
  const translatedRoutes = useRoutes()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  const currentRouteIndex = useMemo(
    () =>
      routes.indexOf(
        routes.find((route) => route.path === asPath) ?? routes[0]
      ),
    [asPath]
  )

  const routeStyles = ["top-0", "top-12", "top-24", "top-36"]

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false)
  }, [asPath])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.body.style.overflow = ""
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <>
      {/* Hamburger button - visible on mobile, positioned top-right */}
      {!isMenuOpen && (
        <button
          type="button"
          onClick={toggleMenu}
          className="md:hidden fixed top-4 right-4 z-50 p-3 text-black dark:text-white"
          aria-label="Toggle menu"
        >
          <FaBars size={24} />
        </button>
      )}

      {/* Overlay - visible on mobile when menu is open */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/80 dark:bg-black/90 backdrop-blur-sm z-40" />
      )}

      {/* Navigation sidebar */}
      <aside
        ref={menuRef}
        className={`
          fixed md:relative
          top-0 left-0
          h-full md:h-auto
          w-64 md:w-36 md:shrink-0
          bg-white dark:bg-black
          md:bg-transparent
          z-50 md:z-auto
          flex flex-col gap-4 justify-between text-sm
          pt-8 pb-6 px-6 md:pt-0 md:pb-0 md:px-0
          overflow-y-auto md:overflow-visible
          transform transition-transform duration-300 ease-in-out
          ${isMenuOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
        `}
      >
        <div className="relative flex flex-col gap-4 md:gap-6">
          {translatedRoutes.map(({ path, title }, index) => (
            <div
              key={path}
              className={`
                flex items-center 
                h-10 md:h-6
                md:transition-left md:ease-in-out md:duration-500
                ${
                  currentRouteIndex < index
                    ? `md:absolute ${routeStyles[index]} md:left-4`
                    : "relative left-0"
                }
              `}
            >
              <Link to={path}>{title}</Link>
            </div>
          ))}
        </div>
        <motion.span
          className="hidden md:block h-full w-0.5 bg-black dark:bg-white rounded"
          layout
          transition={{
            layout: {
              duration: 0.5,
            },
          }}
        />
        <div className="flex gap-4 items-center shrink-0">
          <LanguageSwitcher />
          <DarkModeToggleButton />
        </div>
      </aside>
    </>
  )
}
