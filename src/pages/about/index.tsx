import PageHeader from "@/components/PageHeader"
import type { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useMemo } from "react"
import { FaGithub, FaSoundcloud } from "react-icons/fa"
import aboutImg from "../../res/images/top.png"
import { useRoute } from "../routes"

export default function About() {
  const { t } = useTranslation("about")
  const { route, pageNumber } = useRoute()

  const intro = useMemo(() => t("introduction"), [])
  const detail = useMemo(() => t("details"), [])
  const introParagraphs = useMemo(() => intro.split(/\r?\n/), [intro])
  const detailParagraphs = useMemo(() => detail.split(/\r?\n/), [detail])

  return (
    <div className="flex flex-col gap-8 container h-full">
      <PageHeader
        title={route.title}
        subTitle={route.kanji}
        pageNumber={pageNumber}
      />
      <div className="grid gap-8 grid-cols-2 auto-rows-auto items-start">
        <div className="flex flex-col gap-4">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm">
              {paragraph}
            </p>
          ))}
          <hr className="my-4 border-subtext-light dark:border-subtext-dark" />
          {detailParagraphs.map((paragraph) => (
            <p key={paragraph} className="text-sm">
              {paragraph}
            </p>
          ))}
        </div>
        <div className="relative flex flex-col p-4 border-double border-4 border-black dark:border-white">
          <Image alt="" src={aboutImg} width={300} height={300} />
        </div>
        <div className="flex flex-row gap-8">
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
