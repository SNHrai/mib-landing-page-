import { Canvas } from '@react-three/fiber'
import { OrbitControls, PerspectiveCamera, Environment, ContactShadows } from '@react-three/drei'
import { ShoeModel } from './ShoeModel'
import { motion } from 'framer-motion'

export function HeroSection() {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-gray-900 to-black">
      {/* Background grid pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center px-4"
        >
          <h1 className="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-white via-gray-200 to-gray-500 bg-clip-text text-transparent">
            URBAN SHOES
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-8">
            Step into the future of footwear
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="pointer-events-auto"
        >
          <button className="px-8 py-4 bg-gradient-to-r from-red-500 to-pink-600 rounded-full text-white font-semibold text-lg hover:shadow-lg hover:shadow-red-500/50 transition-all duration-300 hover:scale-105">
            Explore Collection
          </button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-gray-500 text-sm">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2"
            >
              <div className="w-1 h-2 bg-gray-500 rounded-full" />
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* 3D Canvas */}
      <Canvas shadows className="absolute inset-0">
        <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />

        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={1}
          castShadow
          shadow-mapSize={[2048, 2048]}
        />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff6b6b" />
        <pointLight position={[10, 10, 10]} intensity={0.5} color="#6bb6ff" />

        {/* Environment for reflections */}
        <Environment preset="city" />

        {/* Shoe Model */}
        <ShoeModel />

        {/* Contact shadows */}
        <ContactShadows
          position={[0, -0.5, 0]}
          opacity={0.4}
          scale={10}
          blur={2}
          far={4}
        />

        {/* Camera controls */}
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 2}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </section>
  )
}
