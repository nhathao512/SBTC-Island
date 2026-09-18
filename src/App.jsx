import { useState, lazy, Suspense } from 'react'
import Cursor from './components/Cursor.jsx'
import Navbar from './components/Navbar.jsx'
import IntroSplash from './components/IntroSplash.jsx'

import Hero from './components/sections/Hero.jsx'
import Welcome from './components/sections/Welcome.jsx'
import TheWorld from './components/sections/TheWorld.jsx'
import Features from './components/sections/Features.jsx'
import Events from './components/sections/Events.jsx'
import LiveMap from './components/sections/LiveMap.jsx'
import LauncherDownload from './components/sections/LauncherDownload.jsx'
import Community from './components/sections/Community.jsx'
import FinalCTA from './components/sections/FinalCTA.jsx'
import Footer from './components/sections/Footer.jsx'

// Lazy-load heavier sections (Gallery + Showcase load after first paint)
const Gallery   = lazy(() => import('./components/sections/Gallery.jsx'))
const Showcase  = lazy(() => import('./components/sections/Showcase.jsx'))

export default function App() {
  const [splashDone, setSplashDone] = useState(false)

  return (
    <>
      {/* Intro splash — shown until user enters */}
      {!splashDone && (
        <IntroSplash onEnter={() => setSplashDone(true)} />
      )}

      {/* Main site — rendered behind splash, visible after enter */}
      <div style={{ opacity: splashDone ? 1 : 0, transition: 'opacity 0.5s ease' }}>
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
          <Events />
          <LiveMap />
          <LauncherDownload />
          <Suspense fallback={<div style={{ height: '50vh', background: 'var(--color-bg)' }} />}>
            <Showcase />
            <Gallery />
          </Suspense>
          <Community />
          <FinalCTA />
        </main>

        <Footer />
      </div>
    </>
  )
}
