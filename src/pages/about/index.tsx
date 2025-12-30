import PageHeader from "@/components/PageHeader"
import type { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import Image from "next/image"
import { useEffect, useMemo, useState } from "react"
import { FaGithub, FaSoundcloud } from "react-icons/fa"
import aboutImg from "../../../public/images/about.jpg"
import { useRoute } from "../../routes"

export default function About() {
  const { t, ready } = useTranslation("about")
  const { route, pageNumber } = useRoute()

  const introTranslation = t("introduction")
  const detailTranslation = t("details")
  
  const [intro, setIntro] = useState(() => 
    introTranslation !== "introduction" ? introTranslation : ""
  )
  const [detail, setDetail] = useState(() => 
    detailTranslation !== "details" ? detailTranslation : ""
  )

  useEffect(() => {
    if (ready && introTranslation !== "introduction") {
      setIntro(introTranslation)
    }
    if (ready && detailTranslation !== "details") {
      setDetail(detailTranslation)
    }
  }, [t, ready, introTranslation, detailTranslation])

  const introParagraphs = useMemo(() => intro.split(/\r?\n/).filter(Boolean), [intro])
  const detailParagraphs = useMemo(() => detail.split(/\r?\n/).filter(Boolean), [detail])

  return (
    <div className="flex flex-col gap-4 lg:gap-8 container">
      <PageHeader
        title={route.title}
        subTitle={route.kanji}
        pageNumber={pageNumber}
      />
      <div className="grid gap-4 lg:gap-8 lg:grid-cols-2 auto-rows-auto items-start text-xs lg:text-sm pb-6">
        <div className="flex flex-col gap-4 order-2 lg:order-1">
          {introParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
          <hr className="my-2 lg:my-4 border-subtext-light dark:border-subtext-dark" />
          {detailParagraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className="relative flex flex-col p-2 lg:p-4 border-double border-4 border-black dark:border-white order-1 lg:order-2">
          {/* Mobile: cropped aspect ratio */}
          <div className="relative aspect-[3/2] w-full overflow-hidden lg:hidden">
            <Image alt="" src={aboutImg} fill className="object-cover object-top" />
          </div>
          {/* Desktop: full image */}
          <Image alt="" src={aboutImg} width={300} height={300} className="hidden lg:block w-full h-auto" />
        </div>
        <div className="flex flex-row gap-4 lg:gap-8 text-sm order-3">
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/alexivison"
            className="flex flex-row gap-2 lg:gap-4 items-center py-2"
          >
            <FaGithub />
            <span>.github</span>
          </a>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://soundcloud.com/alex_ivison"
            className="flex flex-row gap-2 lg:gap-4 items-center py-2"
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
