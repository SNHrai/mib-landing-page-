import { useRef, Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { motion } from 'framer-motion'
import Experience from './Experience'

// ─── Feature cards data ────────────────────────────────────────────────────
const features = [
  {
    id: 1,
    icon: '🪡',
    title: 'Premium Leather',
    description:
      'Full-grain, vegetable-tanned leather sourced from certified ethical tanneries. Each pair tells a story that only gets richer with time.',
    gradient: 'from-amber-900/40 to-yellow-900/20',
    border: 'border-amber-700/30',
    accent: '#c9a96e',
  },
  {
    id: 2,
    icon: '☁️',
    title: 'Cloud Comfort',
    description:
      'Proprietary AeroFoam™ insole technology cradles every step in weightless cushioning. Walk all day without compromise.',
    gradient: 'from-sky-900/40 to-indigo-900/20',
    border: 'border-sky-700/30',
    accent: '#7dd3fc',
  },
  {
    id: 3,
    icon: '♻️',
    title: 'Sustainable Tech',
    description:
      'Ocean-recovered plastics, carbon-neutral manufacturing, and fully recyclable packaging. Style that cares for the planet.',
    gradient: 'from-emerald-900/40 to-teal-900/20',
    border: 'border-emerald-700/30',
    accent: '#6ee7b7',
  },
]

// ─── Animation variants ────────────────────────────────────────────────────
const fadeInUp = {
  hidden: { opacity: 0, y: 48 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
}

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
}

// ─── Feature Card ──────────────────────────────────────────────────────────
function FeatureCard({ feature, index }) {
  return (
    <motion.div
      custom={index}
      variants={fadeInUp}
      className={`relative rounded-3xl border ${feature.border} bg-gradient-to-br ${feature.gradient} backdrop-blur-sm p-8 flex flex-col gap-4 overflow-hidden group hover:scale-[1.03] transition-transform duration-500`}
    >
      {/* Glow blob */}
      <div
        className="absolute -top-10 -right-10 w-40 h-40 rounded-full blur-3xl opacity-20 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: feature.accent }}
      />

      <span className="text-4xl">{feature.icon}</span>

      <h3
        className="text-xl font-semibold tracking-tight"
        style={{ color: feature.accent }}
      >
        {feature.title}
      </h3>

      <p className="text-gray-400 leading-relaxed text-sm">
        {feature.description}
      </p>
    </motion.div>
  )
}

// ─── Navbar ────────────────────────────────────────────────────────────────
function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="fixed top-0 inset-x-0 z-50 flex items-center justify-between px-8 py-5 bg-black/30 backdrop-blur-xl border-b border-white/5"
    >
      <span className="text-xl font-bold tracking-widest uppercase text-[#c9a96e]">
        Urban Shoes
      </span>
      <div className="hidden md:flex gap-8 text-sm text-gray-400 font-medium">
        {['Collection', 'Story', 'Sustainability', 'Contact'].map((link) => (
          <a
            key={link}
            href="#"
            className="hover:text-white transition-colors duration-200"
          >
            {link}
          </a>
        ))}
      </div>
      <button className="px-5 py-2 rounded-full bg-[#c9a96e] text-black text-sm font-semibold hover:bg-white transition-colors duration-300">
        Shop Now
      </button>
    </motion.nav>
  )
}

// ─── App ───────────────────────────────────────────────────────────────────
export default function App() {
  const mousePosition = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    mousePosition.current = {
      x: (e.clientX / window.innerWidth) * 2 - 1,
      y: -(e.clientY / window.innerHeight) * 2 + 1,
    }
  }

  return (
    <div
      className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden"
      onMouseMove={handleMouseMove}
    >
      <Navbar />

      {/* ── Hero Section ───────────────────────────────────────── */}
      <section className="relative w-full h-screen flex flex-col items-center justify-center">
        {/* Full-screen 3D canvas */}
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [0, 0, 4.5], fov: 45 }}
            shadows
            dpr={[1, 2]}
            gl={{ antialias: true, alpha: false }}
          >
            <color attach="background" args={['#0a0a0a']} />
            <Suspense fallback={null}>
              <Experience mousePosition={mousePosition} />
            </Suspense>
          </Canvas>
        </div>

        {/* Hero text overlay */}
        <div className="relative z-10 text-center pointer-events-none select-none flex flex-col items-center gap-6 px-4">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.5em' }}
            animate={{ opacity: 1, letterSpacing: '0.35em' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]"
          >
            New Season 2026
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-none"
          >
            Walk the{' '}
            <span className="bg-gradient-to-r from-[#c9a96e] via-[#e8d5b7] to-[#c9a96e] bg-clip-text text-transparent">
              Future
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="text-base md:text-lg text-gray-400 max-w-md leading-relaxed"
          >
            Crafted for those who refuse to stand still. Hover to interact —
            every detail engineered to perfection.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex gap-4 pointer-events-auto"
          >
            <button className="px-8 py-3 rounded-full bg-[#c9a96e] text-black text-sm font-bold hover:bg-white transition-colors duration-300 shadow-lg shadow-amber-900/30">
              Explore Collection
            </button>
            <button className="px-8 py-3 rounded-full border border-white/20 text-white text-sm font-medium hover:border-white/60 hover:bg-white/5 transition-all duration-300">
              Our Story
            </button>
          </motion.div>
        </div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 text-xs"
        >
          <span className="tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
            className="w-px h-8 bg-gradient-to-b from-[#c9a96e] to-transparent"
          />
        </motion.div>
      </section>

      {/* ── Features Section ───────────────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-32 py-32 bg-[#0a0a0a]">
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="text-center mb-20 flex flex-col items-center gap-4"
        >
          <motion.p
            variants={fadeInUp}
            custom={0}
            className="text-xs font-semibold uppercase tracking-[0.35em] text-[#c9a96e]"
          >
            Why Urban Shoes
          </motion.p>
          <motion.h2
            variants={fadeInUp}
            custom={1}
            className="text-4xl md:text-5xl font-black tracking-tight"
          >
            Engineered for{' '}
            <span className="bg-gradient-to-r from-[#c9a96e] to-[#e8d5b7] bg-clip-text text-transparent">
              Excellence
            </span>
          </motion.h2>
          <motion.p
            variants={fadeInUp}
            custom={2}
            className="text-gray-500 max-w-lg leading-relaxed"
          >
            Three pillars. One obsession. The most meticulously crafted sneaker
            in the world.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {features.map((feature, i) => (
            <FeatureCard key={feature.id} feature={feature} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ── CTA Section ────────────────────────────────────────── */}
      <section className="relative px-6 md:px-16 lg:px-32 py-32 overflow-hidden">
        {/* Background gradient blob */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[600px] h-[600px] rounded-full bg-[#c9a96e]/5 blur-[120px]" />
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
          className="relative z-10 flex flex-col items-center text-center gap-8"
        >
          <motion.h2
            variants={fadeInUp}
            custom={0}
            className="text-4xl md:text-6xl font-black tracking-tight max-w-3xl"
          >
            Your next step starts{' '}
            <span className="bg-gradient-to-r from-[#c9a96e] to-[#e8d5b7] bg-clip-text text-transparent">
              here
            </span>
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            custom={1}
            className="text-gray-400 max-w-md leading-relaxed"
          >
            Limited edition drops. Lifetime craftsmanship guarantee. Join 50,000+
            Urban Shoes members who never look back.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            custom={2}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button className="px-10 py-4 rounded-full bg-[#c9a96e] text-black font-bold text-sm hover:bg-white transition-colors duration-300 shadow-2xl shadow-amber-900/40">
              Shop the Collection →
            </button>
            <button className="px-10 py-4 rounded-full border border-white/15 text-gray-300 text-sm font-medium hover:bg-white/5 hover:border-white/40 transition-all duration-300">
              View Lookbook
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Footer ─────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-4 text-gray-600 text-sm">
        <span className="font-bold tracking-widest uppercase text-[#c9a96e]/70">
          Urban Shoes
        </span>
        <span>© 2026 Urban Shoes. All rights reserved.</span>
        <div className="flex gap-6">
          {['Privacy', 'Terms', 'Careers'].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-gray-400 transition-colors duration-200"
            >
              {link}
            </a>
          ))}
        </div>
      </footer>
    </div>
  )
}

