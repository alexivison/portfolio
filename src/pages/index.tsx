import { useMenu } from "@/global/context/MenuContext"
import { useTheme } from "@/global/hooks/useTheme"
import type { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { FaBars } from "react-icons/fa"
import topImgLight from "../../public/images/top_1.jpg"
import topImgDark from "../../public/images/top_2.jpg"

export default function Home() {
  const theme = useTheme()
  const { isMenuOpen, toggleMenu } = useMenu()

  return (
    <div className="flex flex-col gap-4 lg:gap-8 container">
      {/* Mobile menu button only - no title or page number on home */}
      <div className="sticky top-0 flex justify-end w-full py-4 lg:py-0 bg-white dark:bg-black z-10 lg:hidden">
        {!isMenuOpen && (
          <button
            type="button"
            onClick={toggleMenu}
            className="p-2 -mr-2 text-black dark:text-white"
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>
        )}
      </div>
      <div className="relative flex flex-col p-4 lg:p-8 min-h-[calc(100vh-8rem)] lg:min-h-[70vh] border-double border-4 border-black dark:border-white">
        <div className="absolute z-10 bottom-8 left-8 lg:top-16 lg:bottom-auto lg:right-16 lg:left-auto">
          <h1 className="text-2xl lg:text-3xl">Aleksi Tuominen</h1>
          <h3>.development</h3>
          <h3>.design</h3>
        </div>
        <div className="relative flex-1 min-h-[200px] grayscale hover:grayscale-0 opacity-50 lg:opacity-100 transition ease-in-out duration-300">
          <Image alt="" src={theme === "dark" ? topImgDark : topImgLight} fill className="object-cover" />
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
})
