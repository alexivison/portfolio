import { useRouter } from "next/router"
import { useMemo } from "react"

const routes = [
  {
    path: "/",
    title: "Home",
    kanji: "",
  },
  {
    path: "/about",
    title: "About me",
    kanji: "私",
  },
  {
    path: "/skills",
    title: "Skills",
    kanji: "技",
  },
  {
    path: "/contact",
    title: "Contact",
    kanji: "便",
  },
] as const

export const useRoute = () => {
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const staticPath = useMemo(() => router.asPath, [])

  const route = routes.find((route) => route.path === staticPath) ?? routes[0]
  const pageNumber = routes.indexOf(route)

  return {
    route,
    pageNumber,
  }
}

export default routes
