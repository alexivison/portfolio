import type { Variants } from "framer-motion"
import { AnimatePresence, motion } from "framer-motion"
import { useRouter } from "next/router"
import { ReactNode } from "react"

const duration = 0.25
const delay = 0.25

const variants: Variants = {
  in: {
    opacity: 1,
    transition: {
      duration,
    },
  },
  out: {
    opacity: 0,
    transition: {
      duration,
    },
  },
}

export default function Transition({ children }: { children: ReactNode }) {
  const { pathname } = useRouter()

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        key={pathname}
        variants={variants}
        animate="in"
        initial="out"
        exit="out"
        className="w-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
