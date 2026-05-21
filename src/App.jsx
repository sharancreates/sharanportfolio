import { useState, useCallback, useRef, useEffect } from 'react'
import Preloader from './components/Preloader'
import CustomCursor from './components/CustomCursor'
import Header from './components/Header'
import SectionSlider from './components/SectionSlider'
import FixedFooter from './components/FixedFooter'
import ContentOverlay from './components/ContentOverlay'

const TOTAL_SLIDES = 6

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [activeOverlay, setActiveOverlay] = useState(null) // null, 'about', 'skills', 'projects', 'blogs', 'codepen', 'contact'
  const sliderRef = useRef()

  const handleLoaded = useCallback(() => setLoaded(true), [])
  const handleDotClick = useCallback((i) => {
    if (sliderRef.current) {
      sliderRef.current.goTo(i)
    }
  }, [])

  // Sync URL hash updates
  const handleOpenOverlay = useCallback((sectionId) => {
    setActiveOverlay(sectionId)
    window.history.pushState(null, '', `#${sectionId}`)
  }, [])

  const handleCloseOverlay = useCallback(() => {
    setActiveOverlay(null)
    window.history.pushState(null, '', window.location.pathname)
  }, [])

  // Handle URL hash changes for deep linking and back/forward navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      const validSections = ['about', 'skills', 'projects', 'blogs', 'codepen', 'contact']
      if (validSections.includes(hash)) {
        setActiveOverlay(hash)
        const slideIndex = validSections.indexOf(hash)
        if (slideIndex !== -1 && sliderRef.current) {
          sliderRef.current.goTo(slideIndex)
        }
      } else {
        setActiveOverlay(null)
      }
    }

    window.addEventListener('hashchange', handleHashChange)
    if (loaded) {
      handleHashChange()
    }
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [loaded])

  // Dynamically update page title for SEO and user experience
  useEffect(() => {
    if (activeOverlay) {
      const sectionName = activeOverlay.charAt(0).toUpperCase() + activeOverlay.slice(1)
      document.title = `Sharanya Nagar — ${sectionName}`
    } else {
      const slideTitles = [
        'Full-Stack Developer',
        'Technical Expertise',
        'Featured Projects',
        'Technical Articles',
        'UI/UX Experiments',
        "Let's Connect"
      ]
      document.title = `Sharanya Nagar — ${slideTitles[currentSlide] || 'Full-Stack Developer'}`
    }
  }, [activeOverlay, currentSlide])

  return (
    <>
      <Preloader onComplete={handleLoaded} />
      <CustomCursor />
      <Header loaded={loaded} />
      <SectionSlider 
        ref={sliderRef}
        currentSlide={currentSlide} 
        setCurrentSlide={setCurrentSlide} 
        loaded={loaded} 
        onOpenOverlay={handleOpenOverlay}
        isOverlayOpen={activeOverlay !== null}
      />
      <FixedFooter 
        currentSlide={currentSlide} 
        totalSlides={TOTAL_SLIDES} 
        onDotClick={handleDotClick} 
        loaded={loaded} 
      />
      <ContentOverlay 
        activeSection={activeOverlay} 
        onClose={handleCloseOverlay} 
      />
    </>
  )
}
