import { useTheme } from "@/global/hooks/useTheme"
import type { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import topImgLight from "../../public/images/top_1.jpg"
import topImgDark from "../../public/images/top_2.jpg"

export default function Home() {
  const theme = useTheme()

  return (
    <div className="relative flex flex-col p-4 lg:p-8 min-h-[calc(100vh-5rem)] lg:min-h-[70vh] border-double border-4 border-black dark:border-white">
      <div className="absolute z-10 bottom-8 left-8 lg:top-16 lg:bottom-auto lg:right-16 lg:left-auto">
        <h1 className="text-2xl lg:text-3xl">Aleksi Tuominen</h1>
        <h3>.development</h3>
        <h3>.design</h3>
      </div>
      <div className="relative flex-1 min-h-[200px] grayscale hover:grayscale-0 opacity-50 lg:opacity-100 transition ease-in-out duration-300">
        <Image alt="" src={theme === "dark" ? topImgDark : topImgLight} fill className="object-cover" />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
})
