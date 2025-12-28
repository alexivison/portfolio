import { useTranslation } from "next-i18next"
import { useRouter } from "next/router"
import { useMemo } from "react"

export const routes = [
  {
    path: "/",
    titleKey: "routes.home",
    kanji: "",
  },
  {
    path: "/about",
    titleKey: "routes.about",
    kanji: "私",
  },
  {
    path: "/skills",
    titleKey: "routes.skills",
    kanji: "技",
  },
  {
    path: "/contact",
    titleKey: "routes.contact",
    kanji: "便",
  },
] as const

export const useRoutes = () => {
  const { t } = useTranslation("common")

  return useMemo(
    () =>
      routes.map((route) => ({
        ...route,
        title: t(route.titleKey),
      })),
    [t]
  )
}

export const useRoute = () => {
  const router = useRouter()
  const { t } = useTranslation("common")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const staticPath = useMemo(() => router.asPath, [])

  const baseRoute = routes.find((route) => route.path === staticPath) ?? routes[0]
  const pageNumber = routes.indexOf(baseRoute)

  const route = {
    ...baseRoute,
    title: t(baseRoute.titleKey),
  }

  return {
    route,
    pageNumber,
  }
}
