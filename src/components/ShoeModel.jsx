import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { useGLTF, MeshReflectorMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function ShoeModel({ ...props }) {
  const meshRef = useRef()

  // Auto-rotate the shoe
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group {...props}>
      {/* Main shoe - represented by a stylized sneaker shape using basic geometry */}
      <mesh ref={meshRef} position={[0, 0, 0]} castShadow>
        <group>
          {/* Shoe sole */}
          <mesh position={[0, -0.3, 0]} castShadow>
            <boxGeometry args={[1.2, 0.2, 2.5]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.3}
              metalness={0.8}
            />
          </mesh>

          {/* Shoe upper body */}
          <mesh position={[0, 0.1, -0.2]} castShadow>
            <boxGeometry args={[1, 0.8, 2]} />
            <meshStandardMaterial
              color="#ff6b6b"
              roughness={0.4}
              metalness={0.1}
            />
          </mesh>

          {/* Shoe tongue */}
          <mesh position={[0, 0.3, 0.8]} rotation={[0.3, 0, 0]} castShadow>
            <boxGeometry args={[0.6, 0.5, 0.3]} />
            <meshStandardMaterial
              color="#ffaaaa"
              roughness={0.5}
            />
          </mesh>

          {/* Shoe laces accent */}
          <mesh position={[0, 0.4, 0.5]} castShadow>
            <cylinderGeometry args={[0.05, 0.05, 0.8, 8]} />
            <meshStandardMaterial
              color="#ffffff"
              roughness={0.6}
            />
          </mesh>
        </group>
      </mesh>

      {/* Reflective floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[10, 10]} />
        <MeshReflectorMaterial
          blur={[300, 100]}
          resolution={2048}
          mixBlur={1}
          mixStrength={40}
          roughness={1}
          depthScale={1.2}
          minDepthThreshold={0.4}
          maxDepthThreshold={1.4}
          color="#050505"
          metalness={0.5}
        />
      </mesh>
    </group>
  )
}
