import PageHeader from "@/components/PageHeader"
import type { GetStaticProps } from "next"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useRouter } from "next/router"
import CSSLogo from "../../../public/images/css.png"
import FigmaLogo from "../../../public/images/figma.png"
import HTMLLogo from "../../../public/images/html.png"
import JSLogo from "../../../public/images/js.png"
import ReactNativeLogo from "../../../public/images/react-native.png"
import ReactLogo from "../../../public/images/react.png"
import RxLogo from "../../../public/images/rx.png"
import SketchLogo from "../../../public/images/sketch.png"
import SwiftLogo from "../../../public/images/swift.png"
import TypescriptLogo from "../../../public/images/typescript.png"
import VaporLogo from "../../../public/images/vapor.png"
import VueLogo from "../../../public/images/vue.png"
import { useRoute } from "../../routes"
import SkillItem from "./parts/Skill"

const skills = [
  { title: "React", image: ReactLogo, category: "web", level: 5 },
  { title: "Typescript", image: TypescriptLogo, category: "web", level: 4 },
  { title: "Vue", image: VueLogo, category: "web", level: 2 },
  { title: "JavaScript", image: JSLogo, category: "web", level: 3 },
  { title: "HTML", image: HTMLLogo, category: "web", level: 4 },
  { title: "CSS", image: CSSLogo, category: "web", level: 4 },
  {
    title: "React Native",
    image: ReactNativeLogo,
    category: "native",
    level: 3,
  },
  { title: "Swift", image: SwiftLogo, category: "native", level: 2 },
  { title: "RxSwift", image: RxLogo, category: "native", level: 2 },
  { title: "Vapor", image: VaporLogo, category: "native", level: 1 },
  { title: "Figma", image: FigmaLogo, category: "design", level: 4 },
  { title: "Sketch", image: SketchLogo, category: "design", level: 2 },
] as const

const languageSkills = [
  { languageKey: "skills.languages.finnish", levelKey: "skills.languages.levels.native", locale: "fi" },
  { languageKey: "skills.languages.english", levelKey: "skills.languages.levels.business", locale: "en" },
  { languageKey: "skills.languages.japanese", levelKey: "skills.languages.levels.business", locale: "ja" },
] as const

type Skill = (typeof skills)[number]

export default function Skills() {
  const { route, pageNumber } = useRoute()
  const { t } = useTranslation("common")
  const router = useRouter()

  const handleLanguageClick = (newLocale: string) => {
    router.replace(router.asPath, router.asPath, { locale: newLocale, shallow: false })
  }

  const categoryGroupedSkills = skills.reduce<{
    web: Skill[]
    design: Skill[]
    native: Skill[]
  }>(
    (result, skill) => {
      return {
        ...result,
        [skill.category]: [...(result[skill.category] || []), skill],
      }
    },
    { web: [], design: [], native: [] }
  )

  return (
    <div className="flex flex-col gap-4 lg:gap-8 container">
      <PageHeader
        title={route.title}
        subTitle={route.kanji}
        pageNumber={pageNumber}
      />
      <div className="flex flex-col justify-between gap-8 pb-6 lg:pb-8">
        <ul className="flex flex-col lg:flex-row lg:justify-between gap-6 lg:gap-8 w-full">
          {Object.entries(categoryGroupedSkills).map(([category, skills]) => (
            <li key={category} className="flex flex-col gap-4 flex-1 min-w-0">
              <h3>{`.${t(`skills.categories.${category}`)}`}</h3>
              {skills
                .sort((a, b) => b.level - a.level)
                .map(({ title, image, level }) => (
                  <SkillItem key={title} image={image} level={level} />
                ))}
            </li>
          ))}
        </ul>
        <div className="flex flex-col gap-4 w-full">
          <h3>.{t("skills.languages.label")}</h3>
          <ul className="flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-8 text-xs lg:text-sm w-full">
            {languageSkills.map(({ languageKey, levelKey, locale }) => (
              <li key={languageKey} className="flex flex-row gap-2 lg:gap-4 py-1">
                <button
                  type="button"
                  onClick={() => handleLanguageClick(locale)}
                  className="hover:underline cursor-pointer"
                >
                  <h3>{t(languageKey)}</h3>
                </button>
                -<span>{t(levelKey)}</span>
              </li>
            ))}
          </ul>
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
