import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const INK = '#2c2620'
const FLAME = '#d2451e'

// volumetric point lattice: nodes connected to nearest neighbours, precomputed once
function buildLattice(count: number) {
  const pts: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    pts.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6,
      ),
    )
  }
  // edges: connect each node to its 2 nearest within threshold
  const edges: number[] = []
  const seen = new Set<string>()
  for (let i = 0; i < count; i++) {
    const dists = pts
      .map((p, j) => ({ j, d: pts[i].distanceTo(p) }))
      .filter((o) => o.j !== i)
      .sort((a, b) => a.d - b.d)
      .slice(0, 2)
    for (const { j, d } of dists) {
      if (d > 3.2) continue
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (seen.has(key)) continue
      seen.add(key)
      edges.push(...pts[i].toArray(), ...pts[j].toArray())
    }
  }
  // accent node indices
  const accents = new Set<number>()
  while (accents.size < Math.max(4, Math.floor(count * 0.05)))
    accents.add(Math.floor(Math.random() * count))

  const inkPos: number[] = []
  const flamePos: number[] = []
  pts.forEach((p, i) =>
    (accents.has(i) ? flamePos : inkPos).push(p.x, p.y, p.z),
  )

  return {
    edges: new Float32Array(edges),
    inkPos: new Float32Array(inkPos),
    flamePos: new Float32Array(flamePos),
  }
}

function Lattice() {
  const group = useRef<THREE.Group>(null!)
  const { edges, inkPos, flamePos } = useMemo(() => buildLattice(150), [])
  const target = useRef({ x: 0, y: 0 })
  const ptr = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      ptr.current.x = (e.clientX / window.innerWidth) * 2 - 1
      ptr.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  useFrame((state) => {
    if (!group.current) return
    const t = state.clock.getElapsedTime()
    // scroll progress 0..1
    const max = document.documentElement.scrollHeight - window.innerHeight
    const sp = max > 0 ? window.scrollY / max : 0

    // pointer parallax (eased)
    target.current.x += (ptr.current.y * 0.25 - target.current.x) * 0.04
    target.current.y += (ptr.current.x * 0.35 - target.current.y) * 0.04

    group.current.rotation.x = target.current.x + Math.sin(t * 0.1) * 0.05
    group.current.rotation.y =
      target.current.y + t * 0.025 + sp * Math.PI * 0.6
    group.current.position.z = -sp * 4
    group.current.position.y = sp * 1.5
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[edges, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial color={INK} transparent opacity={0.16} />
      </lineSegments>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[inkPos, 3]} />
        </bufferGeometry>
        <pointsMaterial color={INK} size={0.07} transparent opacity={0.5} sizeAttenuation />
      </points>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[flamePos, 3]} />
        </bufferGeometry>
        <pointsMaterial color={FLAME} size={0.14} transparent opacity={0.95} sizeAttenuation />
      </points>
    </group>
  )
}

export default function Background() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true }}
      >
        <Lattice />
      </Canvas>
    </div>
  )
}
