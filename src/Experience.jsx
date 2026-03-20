import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import {
  Float,
  ContactShadows,
  SpotLight,
} from '@react-three/drei'
import * as THREE from 'three'

/**
 * ShoeModel — a stylised shoe-shaped geometry built from primitives.
 * It responds to hover (color + scale) and tracks the mouse cursor.
 */
function ShoeModel({ mousePosition }) {
  const groupRef = useRef()
  const soleRef = useRef()
  const upperRef = useRef()
  const toeRef = useRef()
  const heelRef = useRef()
  const tongueRef = useRef()

  const [hovered, setHovered] = useState(false)

  // Target colour: warm gold on hover, deep charcoal normally
  const baseColor = new THREE.Color('#c9a96e')
  const hoverColor = new THREE.Color('#ffffff')
  const currentColor = useRef(new THREE.Color('#c9a96e'))

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // Slow auto-rotation
    groupRef.current.rotation.y += delta * 0.4

    // Follow mouse — lerp toward cursor offset
    const targetX = (mousePosition.current.y * Math.PI) / 10
    const targetZ = (mousePosition.current.x * Math.PI) / 10
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.05
    )
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetZ,
      0.05
    )

    // Scale on hover
    const targetScale = hovered ? 1.12 : 1.0
    groupRef.current.scale.setScalar(
      THREE.MathUtils.lerp(groupRef.current.scale.x, targetScale, 0.08)
    )

    // Colour interpolation
    currentColor.current.lerp(hovered ? hoverColor : baseColor, 0.06)
    if (upperRef.current)
      upperRef.current.material.color.copy(currentColor.current)
    if (toeRef.current)
      toeRef.current.material.color.copy(currentColor.current)
    if (tongueRef.current)
      tongueRef.current.material.color.copy(currentColor.current)
  })

  return (
    <group
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      position={[0, 0, 0]}
    >
      {/* Sole — flat box */}
      <mesh ref={soleRef} position={[0, -0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[2.2, 0.18, 0.9]} />
        <meshStandardMaterial color="#1a1a1a" roughness={0.6} metalness={0.1} />
      </mesh>

      {/* Midsole accent stripe */}
      <mesh position={[0, -0.32, 0]} castShadow>
        <boxGeometry args={[2.22, 0.08, 0.92]} />
        <meshStandardMaterial color="#e8d5b7" roughness={0.4} metalness={0.2} />
      </mesh>

      {/* Upper body */}
      <mesh ref={upperRef} position={[0, 0.05, 0]} castShadow>
        <boxGeometry args={[1.8, 0.55, 0.8]} />
        <meshStandardMaterial
          color={currentColor.current}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Toe box — rounded front */}
      <mesh ref={toeRef} position={[0.9, -0.1, 0]} castShadow>
        <sphereGeometry args={[0.42, 32, 32, 0, Math.PI]} />
        <meshStandardMaterial
          color={currentColor.current}
          roughness={0.35}
          metalness={0.15}
        />
      </mesh>

      {/* Heel counter */}
      <mesh ref={heelRef} position={[-0.88, -0.08, 0]} castShadow>
        <boxGeometry args={[0.38, 0.48, 0.78]} />
        <meshStandardMaterial color="#111111" roughness={0.5} metalness={0.1} />
      </mesh>

      {/* Tongue */}
      <mesh ref={tongueRef} position={[0.15, 0.38, 0.0]} castShadow>
        <boxGeometry args={[0.6, 0.28, 0.04]} />
        <meshStandardMaterial
          color={currentColor.current}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      {/* Lace area — thin strip */}
      <mesh position={[0.1, 0.3, 0.42]} castShadow>
        <boxGeometry args={[1.0, 0.06, 0.02]} />
        <meshStandardMaterial color="#ffffff" roughness={0.8} />
      </mesh>
    </group>
  )
}

/**
 * Experience — the full R3F scene.
 */
export default function Experience({ mousePosition }) {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={0.3} />

      {/* Key spotlight — Apple-style dramatic top-front */}
      <SpotLight
        position={[3, 6, 3]}
        angle={0.35}
        penumbra={0.8}
        intensity={80}
        color="#fff8f0"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Rim / fill light */}
      <pointLight position={[-4, 3, -3]} intensity={8} color="#c9a96e" />

      {/* Under-glow */}
      <pointLight position={[0, -2, 1]} intensity={4} color="#5566ff" />

      {/* HDRI-style environment using multiple directional / hemisphere lights */}
      <hemisphereLight
        args={['#fff8f0', '#0a0a2a', 0.6]}
        position={[0, 10, 0]}
      />
      <directionalLight
        position={[5, 8, 5]}
        intensity={1.5}
        color="#fff5e8"
        castShadow
        shadow-mapSize={[1024, 1024]}
      />
      <directionalLight position={[-5, 3, -5]} intensity={0.4} color="#8090ff" />

      {/* Floating shoe mesh */}
      <Float
        speed={1.8}
        rotationIntensity={0.2}
        floatIntensity={0.6}
        floatingRange={[-0.12, 0.12]}
      >
        <ShoeModel mousePosition={mousePosition} />
      </Float>

      {/* Ground shadow */}
      <ContactShadows
        position={[0, -1.2, 0]}
        opacity={0.55}
        scale={6}
        blur={2.5}
        far={2}
        color="#000000"
      />
    </>
  )
}
