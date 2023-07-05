import PageHeader from "@/components/PageHeader"
import type { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useMemo } from "react"
import { FaGithub, FaSoundcloud } from "react-icons/fa"
import aboutImg from "../../../public/images/about.jpg"
import { useRoute } from "../../routes"

export default function About() {
  const { t } = useTranslation("about")
  const { route, pageNumber } = useRoute()

  const intro = useMemo(() => t("introduction"), [])
  const detail = useMemo(() => t("details"), [])
  const introParagraphs = useMemo(() => intro.split(/\r?\n/), [intro])
  const detailParagraphs = useMemo(() => detail.split(/\r?\n/), [detail])

  return (
    <div className="flex flex-col gap-4 md:gap-8 container h-full">
      <PageHeader
        title={route.title}
        subTitle={route.kanji}
        pageNumber={pageNumber}
      />
      <div className="grid gap-4 md:gap-8 md:grid-cols-2 auto-rows-auto items-start text-xs md:text-sm pb-6 overflow-auto">
        <div className="flex flex-col gap-4 order-2 md:order-1">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <hr className="my-2 md:my-4 border-subtext-light dark:border-subtext-dark" />
          {detailParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="relative flex flex-col p-2 md:p-4 border-double border-4 border-black dark:border-white grayscale hover:grayscale-0 order-1 md:order-2">
          <Image alt="" src={aboutImg} width={300} height={300} />
        </div>
        <div className="flex flex-row gap-8 text-sm order-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/alexivison"
            className="flex flex-row gap-4 items-center"
          >
            <FaGithub />
            <span>.github</span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://soundcloud.com/alex_ivison"
            className="flex flex-row gap-4 items-center"
          >
            <FaSoundcloud />
            <span>.soundcloud</span>
          </a>
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common", "about"])),
  },
})
