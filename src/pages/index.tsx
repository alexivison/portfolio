import { useTheme } from "@/global/hooks/useTheme"
import type { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import topImgLight from "../../public/images/top_1.jpg"
import topImgDark from "../../public/images/top_2.jpg"

export default function Home() {
  const theme = useTheme()

  return (
    <div className="relative flex flex-col p-4 md:p-8 h-full border-double border-4 border-black dark:border-white">
      <div className="absolute z-10 bottom-8 left-8 md:top-16 md:bottom-auto md:right-16 md:left-auto">
        <h1 className="text-3xl">Aleksi Tuominen</h1>
        <h3>.development</h3>
        <h3>.design</h3>
      </div>
      <div className="relative h-full grayscale hover:grayscale-0 opacity-50 md:opacity-100 transition ease-in-out duration-300">
        <Image alt="" src={theme === "dark" ? topImgDark : topImgLight} fill />
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
})
