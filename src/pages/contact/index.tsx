import PageHeader from "@/components/PageHeader"
import type { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaLink } from "react-icons/fa"
import { useRoute } from "../../routes"

const contacts = [
  {
    titleKey: "contact.wantedly",
    icon: <FaLink />,
    link: "https://www.wantedly.com/id/aleksi_tuominen",
  },
  {
    titleKey: "contact.tenshokudraft",
    icon: <FaLink />,
    link: "https://job-draft.jp/users/32825",
  },
] as const

export default function Contact() {
  const { route, pageNumber } = useRoute()
  const { t } = useTranslation("common")

  return (
    <div className="flex flex-col gap-4 md:gap-8 container min-h-[calc(100vh-5rem)] md:min-h-0">
      <PageHeader
        title={route.title}
        subTitle={route.kanji}
        pageNumber={pageNumber}
      />
      <ul className="flex flex-col gap-2">
        {contacts.map(({ titleKey, icon, link }) => (
          <li key={titleKey}>
            <a 
              href={link} 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex flex-row gap-4 items-center py-3 -mx-2 px-2"
            >
              {icon}
              {t(titleKey)}
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? "en", ["common"])),
  },
})
