import type { ComponentType } from 'react'
import DotFieldRaw from './DotField'

const DotField = DotFieldRaw as unknown as ComponentType<Record<string, unknown>>

// Ambient blueprint backdrop: a faint cinnabar->ink dot lattice that reads as
// technical-drawing paper and lifts under the cursor (blueprint vivo).
// Palette is tuned to the dark theme tokens in index.css, never the React Bits
// purple default (an explicit brand anti-reference).
export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <DotField
        dotRadius={2.4}
        dotSpacing={16}
        cursorRadius={420}
        bulgeStrength={58}
        glowRadius={200}
        sparkle={false}
        waveAmplitude={0}
        gradientFrom="rgba(240, 87, 31, 0.5)"
        gradientTo="rgba(236, 230, 218, 0.22)"
        glowColor="#050506"
      />
    </div>
  )
}
