import type Lenis from 'lenis'

// shared handle so route changes can reset the smooth scroller in place
let instance: Lenis | null = null

export const setLenis = (l: Lenis | null) => {
  instance = l
}

export const getLenis = () => instance
