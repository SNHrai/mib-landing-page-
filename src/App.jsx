import { HeroSection } from './components/HeroSection'
import { FeaturesSection } from './components/FeaturesSection'
import './index.css'

function App() {
  return (
    <div className="min-h-screen bg-black">
      <HeroSection />
      <FeaturesSection />

      {/* Footer */}
      <footer className="bg-gray-900 py-12 px-4 text-center border-t border-gray-800">
        <div className="max-w-7xl mx-auto">
          <h3 className="text-3xl font-bold mb-4 text-white">URBAN SHOES</h3>
          <p className="text-gray-400 mb-6">
            Follow us on social media for the latest updates and exclusive offers
          </p>
          <div className="flex justify-center gap-6 mb-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Twitter
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
          </div>
          <p className="text-gray-600 text-sm">
            © 2026 Urban Shoes. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
