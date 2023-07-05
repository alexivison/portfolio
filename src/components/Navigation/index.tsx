import { routes } from "@/routes"
import { AnimatePresence, motion, Variants } from "framer-motion"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useMemo } from "react"
import DarkModeToggleButton from "../DarkModeToggleButton"

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
        flex hover:text-black hover:dark:text-white
        ${
          isActive
            ? "text-black dark:text-white"
            : "text-subtext-light dark:text-subtext-dark"
        }
      `}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={String(isActive)}
          variants={variants}
          animate="in"
          initial="out"
          exit="out"
        >
          {isActive ? (
            <span className="absolute m-auto left-0 top-2 flex w-2 h-2 -ml-0.5 bg-black dark:bg-white rounded" />
          ) : (
            children
          )}
        </motion.div>
      </AnimatePresence>
    </NextLink>
  )
}

export default function Navigation() {
  const { asPath } = useRouter()

  const currentRouteIndex = useMemo(
    () =>
      routes.indexOf(
        routes.find((route) => route.path === asPath) ?? routes[0]
      ),
    [asPath]
  )

  const routeStyles = ["top-0", "top-12", "top-24", "top-36"]

  return (
    <aside className="flex flex-col gap-4 justify-between text-xs md:text-sm w-24">
      <div className="relative flex flex-col gap-6">
        {routes.map(({ path, title }, index) => (
          <div
            key={path}
            className={`flex items-center transition-left ease-in-out duration-500 h-6 ${
              currentRouteIndex < index
                ? `absolute ${routeStyles[index]} md:left-4`
                : "relative left-0"
            }`}
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
      <div className="flex -ml-2">
        <DarkModeToggleButton />
      </div>
    </aside>
  )
}
