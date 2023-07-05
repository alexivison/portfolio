type Props = {
  title: string
  subTitle: string
  pageNumber: number
}

export default function PageHeader({ title, subTitle, pageNumber }: Props) {
  return (
    <div className="flex flex-row justify-between w-full">
      <div>
        <h1 className="text-2xl">{title}</h1>
        <h3 className="text-subtext-dark">{subTitle}</h3>
      </div>
      <span className="text-2xl text-subtext-dark">{`.0${pageNumber}`}</span>
    </div>
  )
}
