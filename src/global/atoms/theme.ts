import { atomWithStorage } from 'jotai/utils'
import type { Theme } from '../types/Theme'

export const themeAtom = atomWithStorage<Theme>('theme', 'dark')