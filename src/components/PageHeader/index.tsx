type Props = {
  title: string
  subTitle: string
  pageNumber: number
}

export default function PageHeader({ title, subTitle, pageNumber }: Props) {
  return (
    <div className="sticky top-0 flex flex-row justify-between w-full py-4 md:py-0 bg-white dark:bg-black z-10">
      <div>
        <h1 className="text-2xl">{title}</h1>
        <h3 className="text-subtext-dark">{subTitle}</h3>
      </div>
      <span className="text-2xl text-subtext-dark">{`.0${pageNumber}`}</span>
    </div>
  )
}
