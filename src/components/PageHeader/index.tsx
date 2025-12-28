import { useMenu } from "@/global/context/MenuContext"
import { FaBars } from "react-icons/fa"

type Props = {
  title: string
  subTitle: string
  pageNumber: number
}

export default function PageHeader({ title, subTitle, pageNumber }: Props) {
  const { isMenuOpen, toggleMenu } = useMenu()

  return (
    <div className="sticky top-0 flex flex-row justify-between items-start w-full py-4 lg:py-0 bg-white dark:bg-black z-10">
      <div>
        <h1 className="text-2xl">{title}</h1>
        <h3 className="text-subtext-dark">{subTitle}</h3>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-2xl text-subtext-dark">{`.0${pageNumber}`}</span>
        {!isMenuOpen && (
          <button
            type="button"
            onClick={toggleMenu}
            className="lg:hidden p-2 -mr-2 text-black dark:text-white"
            aria-label="Toggle menu"
          >
            <FaBars size={24} />
          </button>
        )}
      </div>
    </div>
  )
}
