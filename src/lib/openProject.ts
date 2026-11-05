import { gsap, MOTION_OK } from './gsap'
import { getLenis } from './lenis'

let running = false

// Where the row's visible image centre has to sit so the full-screen copy starts
// pixel-aligned with it: both are object-fit: cover, the row adds a focus and a zoom.
function alignToRow(img: HTMLImageElement, row: DOMRect, crop: [number, number, number], vw: number, vh: number) {
  const { naturalWidth: nw, naturalHeight: nh } = img
  const [fx, fy, zoom] = crop
  const fit = Math.max(row.width / nw, row.height / nh)
  const originX = row.width * fx
  const originY = row.height * fy
  const srcX = ((row.width / 2 - originX) / zoom + originX - (row.width - nw * fit) * fx) / fit
  const srcY = ((row.height / 2 - originY) / zoom + originY - (row.height - nh * fit) * fy) / fit
  const heroFit = Math.max(vw / nw, vh / nh)
  const scale = (fit * zoom) / heroFit
  // the case hero sits at object-position <focus x> 0
  const heroX = (vw - nw * heroFit) * fx + srcX * heroFit
  const heroY = srcY * heroFit
  return { scale, x: row.left + row.width / 2 - scale * heroX, y: row.top + row.height / 2 - scale * heroY }
}

// The photo in the row opens to full screen, the case mounts underneath with the
// same photo in the same place, and the copy is removed once that one is decoded.
export function openProject(row: HTMLElement, crop: [number, number, number], go: () => void) {
  const source = row.querySelector('img')
  if (running || !source?.naturalWidth || !window.matchMedia(MOTION_OK).matches) return go()
  running = true

  const morph = document.createElement('div')
  morph.className = 'morph'
  const img = source.cloneNode() as HTMLImageElement
  img.loading = 'eager'
  img.style.objectPosition = `${crop[0] * 100}% 0`
  morph.append(img)
  const band = getComputedStyle(row.querySelector('.row-band')!)
  const tint = band.getPropertyValue('--tint')
  if (tint) morph.style.setProperty('--tint', tint)
  const veil = parseFloat(band.getPropertyValue('--veil')) || 0.42
  document.body.append(morph)

  const { width: vw, height: vh } = morph.getBoundingClientRect()
  const rect = row.getBoundingClientRect()
  const mid = Math.min(Math.max((rect.top + rect.bottom) / 2, 0), vh)
  // touch rows and rows opened by nothing start from their centre line, like the hover
  const opened = row.matches(':hover, :focus-visible')
  const top = opened ? Math.max(rect.top, 0) : mid
  const bottom = opened ? Math.max(vh - rect.bottom, 0) : vh - mid
  // the name stays on the photo for a moment instead of vanishing on click
  const label = row.cloneNode(true) as HTMLElement
  label.querySelector('.row-band')?.remove()
  Object.assign(label.style, { left: `${rect.left}px`, top: `${rect.top}px`, width: `${rect.width}px`, height: `${rect.height}px` })
  morph.append(label)
  const lenis = getLenis()
  lenis?.stop()

  const settle = (tries = 60) => {
    const hero = document.querySelector<HTMLImageElement>('.case-photo img')
    if (!hero && tries) return void requestAnimationFrame(() => settle(tries - 1))
    Promise.resolve(hero?.decode())
      .catch(() => undefined)
      .finally(() => {
        lenis?.start()
        gsap.to(morph, {
          autoAlpha: 0,
          duration: 0.25,
          ease: 'power2.out',
          onComplete: () => {
            morph.remove()
            running = false
          },
        })
      })
  }

  const move = { duration: 0.85, ease: 'expo.inOut' }
  gsap
    .timeline({
      onComplete: () => {
        go()
        settle()
      },
    })
    .to(label, { autoAlpha: 0, duration: 0.3, ease: 'power2.out' }, 0)
    .fromTo(morph, { clipPath: `inset(${top}px 0px ${bottom}px 0px)` }, { clipPath: 'inset(0px 0px 0px 0px)', ...move }, 0)
    .fromTo(morph, { '--veil': veil }, { '--veil': 0.12, ...move }, 0)
    .fromTo(img, { transformOrigin: '0 0', ...alignToRow(source, rect, crop, vw, vh) }, { x: 0, y: 0, scale: 1, ...move }, 0)
}
