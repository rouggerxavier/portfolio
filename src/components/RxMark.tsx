// Marca RX:// vetorizada da logo oficial (cap height = 314 unidades).
// Letras herdam currentColor; o "://" usa --mark-accent, azul por padrão.
export default function RxMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 1015 314" aria-hidden="true" className={className}>
      <path fill="currentColor" d="M0 0H214C262 0 308 40 308 92V104C308 168 250 210 166 210H96V314H0ZM96 72V138H177C191 138 209 126 209 110V100C209 84 191 72 177 72ZM116 150H223L332.3 314H225.3ZM286 0H399L638 314H525ZM523 0H636L384 314H271Z" />
      <path fill="var(--mark-accent, var(--color-rx))" d="M628 101a39 39 0 1 0 78 0a39 39 0 1 0-78 0ZM628 222a39 39 0 1 0 78 0a39 39 0 1 0-78 0ZM816 0H897L770 314H689ZM934 0H1015L888 314H807Z" />
    </svg>
  )
}

// O "://" sozinho, em escala de cartaz: a assinatura atrás dos títulos.
export function RxSlashes({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="628 0 387 314" aria-hidden="true" className={`slashes ${className}`} fill="currentColor" data-depth="0.25">
      <path d="M628 101a39 39 0 1 0 78 0a39 39 0 1 0-78 0Z" />
      <path d="M628 222a39 39 0 1 0 78 0a39 39 0 1 0-78 0Z" />
      <path d="M816 0H897L770 314H689Z" />
      <path d="M934 0H1015L888 314H807Z" />
    </svg>
  )
}
