import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'

import Hero from './components/sections/Hero.jsx'
import Welcome from './components/sections/Welcome.jsx'
import TheWorld from './components/sections/TheWorld.jsx'
import Features from './components/sections/Features.jsx'
import Showcase from './components/sections/Showcase.jsx'
import Gallery from './components/sections/Gallery.jsx'
import Community from './components/sections/Community.jsx'
import FinalCTA from './components/sections/FinalCTA.jsx'
import Footer from './components/sections/Footer.jsx'

export default function App() {
  return (
    <>
      {/* Global overlays */}
      <div className="grain-overlay" aria-hidden="true" />
      <div className="vignette" aria-hidden="true" />

      {/* Custom cursor — desktop only */}
      <Cursor />

      {/* Fixed navigation */}
      <Navbar />

      {/* Main content */}
      <main>
        <Hero />
        <Welcome />
        <TheWorld />
        <Features />
        <Showcase />
        <Gallery />
        <Community />
        <FinalCTA />
      </main>

      <Footer />
    </>
  )
}
