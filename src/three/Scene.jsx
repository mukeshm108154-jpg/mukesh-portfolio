import { useEffect, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Float } from '@react-three/drei'
import * as THREE from 'three'
import { sceneState } from './scene-state'

const CREAM = '#FFDBAF'
const LINE = '#8D0004'
const RED = '#A80001'
const SURFACE = '#650002'

const smoothstep = (a, b, t) => {
  const x = Math.min(1, Math.max(0, (t - a) / (b - a)))
  return x * x * (3 - 2 * x)
}

function seeded(i) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453
  return x - Math.floor(x)
}

function ShardField() {
  const mesh = useRef()
  const count = 44
  const data = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / count)
        const theta = Math.PI * (1 + Math.sqrt(5)) * i
        const dir = new THREE.Vector3(
          Math.sin(phi) * Math.cos(theta),
          Math.cos(phi),
          Math.sin(phi) * Math.sin(theta),
        )
        return {
          dir,
          size: 0.035 + seeded(i) * 0.085,
          long: 0.5 + seeded(i + 40) * 2.1,
          spin: seeded(i + 90) * Math.PI,
        }
      }),
    [],
  )

  const dummy = useMemo(() => new THREE.Object3D(), [])

  useFrame((_, delta) => {
    if (!mesh.current) return
    const p = sceneState.progress
    const spread = 3.05 + Math.sin(Math.min(p, 1) * Math.PI) * 2.15 + smoothstep(0.78, 1, p) * -1.15
    const lift = smoothstep(0.2, 0.55, p)
    data.forEach((s, i) => {
      const radius = spread + Math.sin(i * 2.1 + p * 5) * 0.2
      dummy.position.copy(s.dir).multiplyScalar(radius)
      dummy.position.y += lift * s.dir.y * 1.4
      dummy.rotation.set(s.spin + p * 1.2, s.spin * 0.6 + p * 0.8, s.spin)
      dummy.scale.set(s.size, s.size * s.long, s.size)
      dummy.updateMatrix()
      mesh.current.setMatrixAt(i, dummy.matrix)
    })
    mesh.current.instanceMatrix.needsUpdate = true
    mesh.current.rotation.y += delta * 0.025
  })

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]} frustumCulled={false}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial
        color={LINE}
        metalness={0.85}
        roughness={0.28}
        emissive={RED}
        emissiveIntensity={0.22}
      />
    </instancedMesh>
  )
}

function Dust({ count = 320 }) {
  const positions = useMemo(() => {
    const array = new Float32Array(count * 3)
    for (let i = 0; i < count; i += 1) {
      const r = 5.5 + seeded(i) * 9
      const theta = seeded(i + 200) * Math.PI * 2
      const y = (seeded(i + 400) - 0.5) * 11
      array[i * 3] = Math.cos(theta) * r
      array[i * 3 + 1] = y
      array[i * 3 + 2] = Math.sin(theta) * r * 0.7
    }
    return array
  }, [count])

  const points = useRef()

  useFrame((_, delta) => {
    if (points.current) points.current.rotation.y += delta * 0.012
  })

  return (
    <points ref={points} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.028} color={CREAM} transparent opacity={0.5} sizeAttenuation depthWrite={false} />
    </points>
  )
}

function Moon({ radius, speed, offset, size }) {
  const ref = useRef()
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset
    ref.current.position.set(Math.cos(t) * radius, Math.sin(t * 0.8) * 1.2, Math.sin(t) * radius)
  })
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 20, 20]} />
      <meshBasicMaterial color={CREAM} />
    </mesh>
  )
}

function Composition() {
  const group = useRef()
  const core = useRef()
  const cage = useRef()
  const rings = useRef([])
  const light = useRef()

  useFrame((state, delta) => {
    const p = THREE.MathUtils.clamp(sceneState.progress, 0, 1)
    const damp = 1 - Math.pow(0.001, delta)

    if (group.current) {
      group.current.position.x += (2.15 - p * 1.35 - group.current.position.x) * damp * 0.55
      group.current.position.y += (p * 0.15 - group.current.position.y) * damp * 0.4
      group.current.rotation.y += delta * 0.05 + p * 0.0006
      group.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.15) * 0.035
      const targetScale = 1 + smoothstep(0.35, 0.7, p) * 0.16 - smoothstep(0.85, 1, p) * 0.24
      group.current.scale.setScalar(THREE.MathUtils.damp(group.current.scale.x, targetScale, 3, delta))
    }

    if (core.current) {
      core.current.rotation.x += delta * 0.07
      core.current.rotation.y -= delta * 0.06
      core.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 0.9) * 0.015)
    }

    if (cage.current) {
      cage.current.rotation.y += delta * 0.03
      cage.current.rotation.x -= delta * 0.018
      const target = 1 + smoothstep(0.3, 0.62, p) * 0.34
      cage.current.scale.setScalar(THREE.MathUtils.damp(cage.current.scale.x, target, 3, delta))
    }

    rings.current.forEach((ring, i) => {
      if (!ring) return
      const dir = i % 2 === 0 ? 1 : -1
      ring.rotation.z += delta * 0.035 * dir
      ring.rotation.x = Math.PI / 2 + Math.sin(state.clock.elapsedTime * 0.12 + i) * 0.22
      const open = 1 + smoothstep(0.18, 0.6, p) * (0.24 + i * 0.08)
      ring.scale.setScalar(THREE.MathUtils.damp(ring.scale.x, open, 2, delta))
    })

    if (light.current) light.current.intensity = 22 + Math.sin(state.clock.elapsedTime * 0.8) * 5 + p * 16
  })

  return (
    <>
      <ambientLight intensity={0.55} color={CREAM} />
      <directionalLight position={[-4, 5, 6]} intensity={1.9} color={CREAM} />
      <pointLight ref={light} position={[2.5, -1, 3]} intensity={26} distance={16} color={RED} />
      <pointLight position={[0, 0, 0]} intensity={8} distance={7} color={LINE} />

      <group ref={group}>
        <Float speed={1.15} rotationIntensity={0.25} floatIntensity={0.55}>
          <mesh ref={core}>
            <icosahedronGeometry args={[1.62, 2]} />
            <meshStandardMaterial
              color={SURFACE}
              metalness={0.72}
              roughness={0.22}
              emissive={RED}
              emissiveIntensity={0.3}
              flatShading
            />
          </mesh>

          <mesh scale={0.58}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial color={RED} transparent opacity={0.55} />
          </mesh>

          <mesh ref={cage} scale={1}>
            <icosahedronGeometry args={[1.95, 1]} />
            <meshBasicMaterial color={CREAM} wireframe transparent opacity={0.16} />
          </mesh>

          {[2.35, 2.72, 3.08].map((radius, i) => (
            <mesh
              key={radius}
              ref={(el) => {
                rings.current[i] = el
              }}
              rotation={[Math.PI / 2, 0.18 + i * 0.2, i * 0.7]}
            >
              <torusGeometry args={[radius, 0.012 + i * 0.004, 8, 180]} />
              <meshBasicMaterial color={i === 1 ? CREAM : i === 2 ? LINE : RED} transparent opacity={i === 1 ? 0.5 : 0.85} />
            </mesh>
          ))}

          <Moon radius={3.4} speed={0.24} offset={0} size={0.085} />
          <Moon radius={4.2} speed={0.16} offset={2.1} size={0.055} />
          <Moon radius={2.9} speed={0.31} offset={4.2} size={0.035} />
        </Float>

        <ShardField />
        <Dust />
      </group>
    </>
  )
}

function CameraRig() {
  const { camera } = useThree()
  const target = useMemo(() => new THREE.Vector3(0, 0, 0), [])

  useFrame((_, delta) => {
    const p = sceneState.progress
    const px = sceneState.pointerX
    const py = sceneState.pointerY
    const z = 10.2 - smoothstep(0.05, 0.7, p) * 1.25 + smoothstep(0.82, 1, p) * 0.45
    const x = px * 0.45 + smoothstep(0.3, 0.8, p) * 0.22
    const y = -py * 0.3 + smoothstep(0.3, 0.8, p) * 0.12

    const damp = 1 - Math.pow(0.0015, delta)
    camera.position.x += (x - camera.position.x) * damp * 0.4
    camera.position.y += (y - camera.position.y) * damp * 0.4
    camera.position.z += (z - camera.position.z) * damp * 0.25
    target.x += (1.15 - p * 0.75 - target.x) * damp * 0.3
    camera.lookAt(target)
  })

  return null
}

export default function Scene() {
  useEffect(() => {
    const onMove = (e) => {
      sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1
      sceneState.pointerY = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    return () => window.removeEventListener('pointermove', onMove)
  }, [])

  return (
    <Canvas
      dpr={[1, 1.7]}
      camera={{ position: [0, 0, 10.2], fov: 36, near: 0.1, far: 60 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ pointerEvents: 'none' }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping
        gl.toneMappingExposure = 1.1
      }}
    >
      <CameraRig />
      <Composition />
    </Canvas>
  )
}
