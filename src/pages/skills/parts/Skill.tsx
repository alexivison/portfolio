import type { StaticImageData } from "next/image"
import Image from "next/image"
import { useMemo } from "react"

type Props = {
  image: StaticImageData
  level: 1 | 2 | 3 | 4 | 5
}

export default function Skill({ image, level }: Props) {
  const indicatorWidth = useMemo(
    () => (["w-1/5", "w-2/5", "w-3/5", "w-4/5", "w-full"] as const)[level - 1],
    [level]
  )

  return (
    <div className="flex flex-row items-center gap-2">
      <Image
        alt=""
        src={image}
        width={28}
        height={28}
        style={{ background: "#111111" }}
      />
      <div className="flex items-center w-full h-full p-2 border-2 border-black dark:border-white">
        <span className={`bg-black dark:bg-white h-1 ${indicatorWidth}`} />
      </div>
    </div>
  )
}
