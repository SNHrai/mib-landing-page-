import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const features = [
  {
    title: "Premium Quality",
    description: "Crafted with the finest materials for ultimate comfort and durability",
    icon: "✨"
  },
  {
    title: "Innovative Design",
    description: "Modern aesthetics meets cutting-edge technology in every pair",
    icon: "🎨"
  },
  {
    title: "Sustainable",
    description: "Eco-friendly production process with minimal environmental impact",
    icon: "🌱"
  },
  {
    title: "Performance",
    description: "Engineered for peak performance in any activity",
    icon: "⚡"
  }
]

function FeatureCard({ feature, index }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-gradient-to-br from-gray-900 to-gray-800 p-8 rounded-2xl border border-gray-700 hover:border-red-500 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/20"
    >
      <div className="text-5xl mb-4">{feature.icon}</div>
      <h3 className="text-2xl font-bold mb-3 text-white">{feature.title}</h3>
      <p className="text-gray-400">{feature.description}</p>
    </motion.div>
  )
}

export function FeaturesSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section className="min-h-screen bg-black py-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-white to-gray-500 bg-clip-text text-transparent">
            Why Choose Urban Shoes?
          </h2>
          <p className="text-xl text-gray-400">
            Experience the perfect blend of style, comfort, and innovation
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
