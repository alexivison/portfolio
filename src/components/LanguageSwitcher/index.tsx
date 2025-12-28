import { useRouter } from "next/router"
import { useTranslation } from "next-i18next"
import { useEffect, useRef, useState } from "react"
import { FaGlobe } from "react-icons/fa"

const languages = [
  { code: "en", label: "EN" },
  { code: "fi", label: "FI" },
  { code: "ja", label: "JA" },
] as const

export default function LanguageSwitcher() {
  const router = useRouter()
  const { locale } = router
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const currentLanguage = languages.find((lang) => lang.code === locale) ?? languages[0]

  const handleLanguageChange = (newLocale: string) => {
    setIsOpen(false)
    router.replace(router.asPath, router.asPath, { locale: newLocale, shallow: false })
  }

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
        aria-label="Change language"
      >
        <FaGlobe size={20} color="inherit" />
        <span className="text-xs">{currentLanguage.label}</span>
      </button>
      {isOpen && (
        <div className="absolute bottom-full left-0 mb-2 bg-white dark:bg-black border border-black dark:border-white rounded shadow-lg z-50">
          {languages.map((lang) => (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleLanguageChange(lang.code)}
              className={`
                w-full px-3 py-2 text-left text-xs hover:bg-gray-100 dark:hover:bg-gray-900
                ${
                  lang.code === locale
                    ? "bg-gray-100 dark:bg-gray-900 font-semibold"
                    : ""
                }
                ${lang.code === languages[0].code ? "rounded-t" : ""}
                ${lang.code === languages[languages.length - 1].code ? "rounded-b" : ""}
              `}
            >
              {lang.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}




