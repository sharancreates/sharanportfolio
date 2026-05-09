import { useState, useCallback, useRef } from 'react'
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
  const [activeOverlay, setActiveOverlay] = useState(null) // null, 'about', 'skills', 'projects', 'contact'
  const sliderRef = useRef()

  const handleLoaded = useCallback(() => setLoaded(true), [])
  const handleDotClick = useCallback((i) => {
    if (sliderRef.current) {
      sliderRef.current.goTo(i)
    }
  }, [])
  const handleOpenOverlay = useCallback((sectionId) => setActiveOverlay(sectionId), [])
  const handleCloseOverlay = useCallback(() => setActiveOverlay(null), [])

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
