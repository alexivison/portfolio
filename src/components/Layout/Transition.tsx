import type { Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { ReactNode, useMemo } from "react"

const duration = 0.5
const delay = 0.5

const defaultVariants: Variants = {
  in: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration,
      delay,
    },
  },
  out: {
    opacity: 0,
    scale: 1,
    y: 40,
    transition: {
      duration,
    },
  },
}

const pageSpecificVariants: Record<string, Variants> = {
  "/about": {
    out: {
      ...defaultVariants.out,
      y: 80,
      transition: {
        duration: 1.75,
      },
    },
  },
}

export default function Transition({ children }: { children: ReactNode }) {
  const { asPath } = useRouter()

  const variants = useMemo(
    () => ({ ...defaultVariants, ...pageSpecificVariants[asPath] }),
    [asPath]
  )

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={asPath}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
