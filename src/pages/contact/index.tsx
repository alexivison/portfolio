import PageHeader from "@/components/PageHeader"
import type { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { FaLink, FaLinkedin } from "react-icons/fa"
import { useRoute } from "../../routes"

const contacts = [
  {
    title: ".linkedin",
    icon: <FaLinkedin />,
    link: "https://www.linkedin.com/in/aleksi-tuominen-6b806626b/",
  },
  {
    title: ".wantedly",
    icon: <FaLink />,
    link: "https://www.wantedly.com/id/aleksi_tuominen",
  },
  {
    title: ".tenshokudraft",
    icon: <FaLink />,
    link: "https://job-draft.jp/users/32825",
  },
] as const

export default function Contact() {
  const { route, pageNumber } = useRoute()
  const { t } = useTranslation()

  return (
    <div className="flex flex-col gap-4 md:gap-8 container h-full">
      <PageHeader
        title={route.title}
        subTitle={route.kanji}
        pageNumber={pageNumber}
      />
      <ul className="flex flex-col gap-4">
        {contacts.map(({ title, icon, link }) => (
          <li key={title} className="flex flex-row gap-4 items-center">
            {icon}
            <a href={link} target="_blank" rel="noopener noreferrer">
              {title}
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
