import { useRef, Suspense, useMemo, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import * as THREE from 'three'
import { ErrorBoundary } from 'react-error-boundary'

// ─── Stable materials ─────────────────────────────────────────────────────────
function useTrexMaterials() {
  return useMemo(() => ({
    body: new THREE.MeshStandardMaterial({ color: '#4A3828', roughness: 0.82, metalness: 0.06 }),
    accent: new THREE.MeshStandardMaterial({
      color: '#C8742A', roughness: 0.7, metalness: 0.1,
      emissive: new THREE.Color('#4A2A0A'), emissiveIntensity: 0.3,
    }),
    eye: new THREE.MeshStandardMaterial({
      color: '#FF6600', emissive: new THREE.Color('#FF3300'),
      emissiveIntensity: 0.9, roughness: 0.1, metalness: 0.5,
    }),
  }), [])
}

// ─── Procedural T-Rex ─────────────────────────────────────────────────────────
export function ProceduralTrex({ mouseRef }) {
  const groupRef = useRef()
  const headRef = useRef()
  const bodyRef = useRef()
  const tailRef = useRef()
  const { body: mat, accent: accentMat, eye: eyeMat } = useTrexMaterials()
  const time = useRef(0)
  const cursorRY = useRef(0)
  const cursorRX = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    const t = time.current
    const mouse = mouseRef?.current ?? { x: 0, y: 0 }
    cursorRY.current = THREE.MathUtils.lerp(cursorRY.current, mouse.x * 0.45, 0.05)
    cursorRX.current = THREE.MathUtils.lerp(cursorRX.current, mouse.y * 0.2, 0.05)

    if (bodyRef.current) {
      bodyRef.current.scale.y = 1 + Math.sin(t * 1.3) * 0.012
      bodyRef.current.position.y = Math.sin(t * 1.3) * 0.015
    }
    if (headRef.current) {
      headRef.current.rotation.y = cursorRY.current + Math.sin(t * 0.7) * 0.04
      headRef.current.rotation.x = cursorRX.current + Math.sin(t * 0.9) * 0.025
    }
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 0.8) * 0.12
      tailRef.current.rotation.z = -Math.sin(t * 0.6) * 0.05
    }
    if (groupRef.current) {
      groupRef.current.rotation.y = cursorRY.current * 0.2 + Math.sin(t * 0.4) * 0.015
      groupRef.current.position.y = Math.sin(t * 1.1) * 0.04 - 0.5
    }
  })

  return (
    <group ref={groupRef} position={[0, -0.5, 0]}>
      <group ref={bodyRef}>
        <mesh material={mat}><boxGeometry args={[1.4, 1.0, 1.8]} /></mesh>
        <mesh material={accentMat} position={[0, -0.35, 0.2]}><boxGeometry args={[0.8, 0.3, 1.4]} /></mesh>

        {/* HEAD */}
        <group ref={headRef} position={[0, 0.75, 1.0]}>
          <mesh material={mat} position={[0, 0.1, 0.4]}><boxGeometry args={[0.85, 0.55, 0.9]} /></mesh>
          <mesh material={mat} position={[0, -0.05, 0.95]}><boxGeometry args={[0.6, 0.35, 0.55]} /></mesh>
          <mesh material={mat} position={[0, -0.3, 0.85]}><boxGeometry args={[0.55, 0.18, 0.55]} /></mesh>
          <mesh material={accentMat} position={[0.22, 0.32, 0.7]}><boxGeometry args={[0.14, 0.1, 0.25]} /></mesh>
          <mesh material={accentMat} position={[-0.22, 0.32, 0.7]}><boxGeometry args={[0.14, 0.1, 0.25]} /></mesh>
          <mesh material={eyeMat} position={[0.25, 0.28, 0.8]}><sphereGeometry args={[0.07, 8, 8]} /></mesh>
          <mesh material={eyeMat} position={[-0.25, 0.28, 0.8]}><sphereGeometry args={[0.07, 8, 8]} /></mesh>
          <mesh material={accentMat} position={[0.15, 0.08, 1.18]}><sphereGeometry args={[0.045, 6, 6]} /></mesh>
          <mesh material={accentMat} position={[-0.15, 0.08, 1.18]}><sphereGeometry args={[0.045, 6, 6]} /></mesh>
        </group>

        {/* TAIL */}
        <group ref={tailRef} position={[0, -0.05, -0.9]}>
          <mesh material={mat} position={[0, 0, -0.4]}><boxGeometry args={[0.65, 0.55, 0.8]} /></mesh>
          <mesh material={mat} position={[0, -0.05, -0.95]} rotation={[0.12, 0, 0]}><boxGeometry args={[0.45, 0.4, 0.7]} /></mesh>
          <mesh material={mat} position={[0, -0.08, -1.45]} rotation={[0.24, 0, 0]}><boxGeometry args={[0.3, 0.28, 0.6]} /></mesh>
          <mesh material={mat} position={[0, -0.1, -1.9]} rotation={[0.35, 0, 0]}><boxGeometry args={[0.18, 0.18, 0.5]} /></mesh>
        </group>

        {/* LEGS */}
        <mesh material={mat} position={[-0.5, -0.72, 0.2]} rotation={[0.2, 0, 0]}><boxGeometry args={[0.35, 0.65, 0.4]} /></mesh>
        <mesh material={mat} position={[-0.52, -1.3, 0.45]} rotation={[-0.35, 0, 0]}><boxGeometry args={[0.28, 0.6, 0.3]} /></mesh>
        <mesh material={accentMat} position={[-0.52, -1.6, 0.65]}><boxGeometry args={[0.32, 0.18, 0.45]} /></mesh>
        <mesh material={mat} position={[0.5, -0.72, 0.2]} rotation={[0.2, 0, 0]}><boxGeometry args={[0.35, 0.65, 0.4]} /></mesh>
        <mesh material={mat} position={[0.52, -1.3, 0.45]} rotation={[-0.35, 0, 0]}><boxGeometry args={[0.28, 0.6, 0.3]} /></mesh>
        <mesh material={accentMat} position={[0.52, -1.6, 0.65]}><boxGeometry args={[0.32, 0.18, 0.45]} /></mesh>

        {/* TINY ARMS */}
        <mesh material={mat} position={[-0.55, 0.22, 0.75]} rotation={[0, 0, 0.6]}><boxGeometry args={[0.18, 0.42, 0.18]} /></mesh>
        <mesh material={mat} position={[0.55, 0.22, 0.75]} rotation={[0, 0, -0.6]}><boxGeometry args={[0.18, 0.42, 0.18]} /></mesh>

        {/* SPINE SPIKES */}
        {[-0.6, -0.3, 0, 0.3, 0.6].map((z, i) => (
          <mesh key={i} material={accentMat} position={[0, 0.55 + (i === 2 ? 0.06 : 0), z]}>
            <coneGeometry args={[0.06, 0.22, 4]} />
          </mesh>
        ))}
      </group>
    </group>
  )
}

// ─── GLB loader (only mounted when file confirmed) ────────────────────────────
function GLBModel({ mouseRef }) {
  const gltf = useLoader(GLTFLoader, '/models/trex.glb')
  const groupRef = useRef()
  const cursorRY = useRef(0)
  const cursorRX = useRef(0)
  const time = useRef(0)

  useFrame((_, delta) => {
    time.current += delta
    const mouse = mouseRef?.current ?? { x: 0, y: 0 }
    cursorRY.current = THREE.MathUtils.lerp(cursorRY.current, mouse.x * 0.4, 0.04)
    cursorRX.current = THREE.MathUtils.lerp(cursorRX.current, mouse.y * 0.15, 0.04)
    if (groupRef.current) {
      groupRef.current.rotation.y = cursorRY.current + Math.sin(time.current * 0.4) * 0.015
      groupRef.current.rotation.x = cursorRX.current
      groupRef.current.position.y = Math.sin(time.current * 1.1) * 0.04
    }
  })

  return (
    <group ref={groupRef} scale={1.5} position={[0, -1.5, 0]}>
      <primitive object={gltf.scene} />
    </group>
  )
}

// ─── Main — HEAD check decides which to render ────────────────────────────────
export default function TrexModel({ mouseRef }) {
  const [hasGLB, setHasGLB] = useState(false)

  useEffect(() => {
    fetch('/models/trex.glb', { method: 'HEAD' })
      .then((r) => { if (r.ok) setHasGLB(true) })
      .catch(() => {})
  }, [])

  // Default: procedural (no loading state, no suspense issues)
  if (!hasGLB) return <ProceduralTrex mouseRef={mouseRef} />

  return (
    <ErrorBoundary fallback={<ProceduralTrex mouseRef={mouseRef} />}>
      <Suspense fallback={<ProceduralTrex mouseRef={mouseRef} />}>
        <GLBModel mouseRef={mouseRef} />
      </Suspense>
    </ErrorBoundary>
  )
}
