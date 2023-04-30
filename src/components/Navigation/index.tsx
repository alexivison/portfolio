import { motion } from "framer-motion"
import NextLink from "next/link"
import { useRouter } from "next/router"
import { useMemo } from "react"
import DarkModeToggleButton from "../DarkModeToggleButton"

const routes = [
  {
    path: "/",
    title: "Home",
  },
  {
    path: "/about",
    title: "About",
  },
  {
    path: "/skills",
    title: "Skills",
  },
  {
    path: "/contact",
    title: "Contact",
  },
] as const

function Link({ to, children }: { to: string; children: string }) {
  const { asPath } = useRouter()
  const isActive = useMemo(() => asPath === to, [asPath, to])

  return (
    <NextLink
      href={to}
      className={`
        transition ease-in-out duration-400
        ${
          isActive
            ? "text-gray-900 dark:text-gray-50"
            : "text-gray-300 dark:text-gray-500"
        }
      `}
    >
      {children}
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
    <aside className="flex flex-col gap-4 justify-between w-14">
      <div className="relative flex flex-col gap-6">
        {routes.map(({ path, title }, index) => (
          <div
            key={path}
            className={`transition-all ease-in-out duration-500 ${
              currentRouteIndex < index
                ? `absolute ${routeStyles[index]} left-4`
                : "relative left-0"
            }`}
          >
            <Link to={path}>{title}</Link>
          </div>
        ))}
      </div>
      <motion.span
        className="h-full w-0.5 bg-gray-900 dark:bg-gray-50 rounded"
        layout
        transition={{
          layout: {
            duration: 0.5,
          },
        }}
      />
      <div className="flex ">
        <DarkModeToggleButton />
      </div>
    </aside>
  )
}
