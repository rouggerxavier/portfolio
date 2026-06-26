import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const INK = '#2c2620'
const FLAME = '#d2451e'

function Structure() {
  const group = useRef<THREE.Group>(null!)
  const inner = useRef<THREE.Mesh>(null!)

  // a few concentric draughtsman shells, rendered as wireframe
  const geoms = useMemo(
    () => [
      new THREE.IcosahedronGeometry(2.1, 1),
      new THREE.IcosahedronGeometry(1.45, 1),
      new THREE.OctahedronGeometry(0.95, 0),
    ],
    [],
  )

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime()
    if (group.current) {
      group.current.rotation.y += delta * 0.08
      group.current.rotation.x = Math.sin(t * 0.15) * 0.18
      // parallax toward pointer
      const tx = state.pointer.x * 0.5
      const ty = state.pointer.y * 0.4
      group.current.position.x += (tx - group.current.position.x) * 0.03
      group.current.position.y += (ty - group.current.position.y) * 0.03
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.25
      inner.current.rotation.z += delta * 0.12
    }
  })

  return (
    <group ref={group}>
      <lineSegments>
        <wireframeGeometry args={[geoms[0]]} />
        <lineBasicMaterial color={INK} transparent opacity={0.22} />
      </lineSegments>
      <lineSegments>
        <wireframeGeometry args={[geoms[1]]} />
        <lineBasicMaterial color={INK} transparent opacity={0.3} />
      </lineSegments>
      <mesh ref={inner}>
        <octahedronGeometry args={[0.95, 0]} />
        <meshBasicMaterial color={FLAME} wireframe transparent opacity={0.85} />
      </mesh>
      {/* vertex markers on the outer shell */}
      <points>
        <icosahedronGeometry args={[2.1, 1]} />
        <pointsMaterial color={INK} size={0.035} transparent opacity={0.5} />
      </points>
    </group>
  )
}

export default function Scene3D() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 6], fov: 42 }}
      dpr={[1, 1.8]}
      gl={{ antialias: true, alpha: true }}
      aria-hidden
    >
      <Structure />
    </Canvas>
  )
}
