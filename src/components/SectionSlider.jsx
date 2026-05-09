import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react'
import gsap from 'gsap'

const sections = [
  {
    id: 'about',
    num: '01',
    title: 'WHO AM I',
    subtitle: 'ABOUT ME',
    desc: 'Aspiring Technologist blending full-stack engineering with quantum computing research.',
    actionText: 'Read Full Bio',
    image: '/slides/about.png',
    color: '#0a1a3a',
  },
  {
    id: 'skills',
    num: '02',
    title: 'EXPERTISE',
    subtitle: 'SKILLS & CERTIFICATIONS',
    desc: 'Proficient in modern web technologies, full-stack architectures, and cloud computing.',
    actionText: 'View Technical Skills',
    image: '/slides/arogya.png',
    color: '#0a3a2a',
  },
  {
    id: 'projects',
    num: '03',
    title: 'PORTFOLIO',
    subtitle: 'FEATURED PROJECTS',
    desc: 'Production-grade applications spanning healthcare management to ATS resume optimization.',
    actionText: 'Explore Projects',
    image: '/slides/resumatch.png',
    color: '#2d1b69',
  },
  {
    id: 'blogs',
    num: '04',
    title: 'ARTICLES',
    subtitle: 'WRITING & THOUGHTS',
    desc: 'Deep dives into web development, software engineering, and technical explorations.',
    actionText: 'Read Publications',
    image: '/slides/blogs.png',
    color: '#4a2511',
  },
  {
    id: 'codepen',
    num: '05',
    title: 'EXPERIMENTS',
    subtitle: 'CODEPEN & UI/UX',
    desc: 'Creative coding snippets, micro-animations, and interactive UI experiments.',
    actionText: 'View Experiments',
    image: '/slides/codepen.png',
    color: '#0d3b4a',
  },
  {
    id: 'contact',
    num: '06',
    title: "LET'S CONNECT",
    subtitle: 'CONTACT ME',
    desc: 'Dedicated to leveraging cutting-edge technology to build impactful solutions.',
    actionText: 'Get in Touch',
    image: '/slides/mern.png',
    color: '#3a0a1a',
  },
]

const SectionSlider = forwardRef(function SectionSlider({ currentSlide, setCurrentSlide, loaded, onOpenOverlay, isOverlayOpen }, ref) {
  const containerRef = useRef()
  const isAnimating = useRef(false)
  const touchStartY = useRef(0)

  useImperativeHandle(ref, () => ({
    goTo
  }))

  const goTo = useCallback((index) => {
    if (isAnimating.current || index === currentSlide || index < 0 || index >= sections.length) return
    isAnimating.current = true

    const dir = index > currentSlide ? 1 : -1
    const currentEl = containerRef.current.querySelector(`.slide[data-index="${currentSlide}"]`)
    const nextEl = containerRef.current.querySelector(`.slide[data-index="${index}"]`)
    if (!currentEl || !nextEl) { isAnimating.current = false; return }

    const tl = gsap.timeline({
      onComplete: () => { isAnimating.current = false }
    })

    gsap.set(nextEl, { zIndex: 2, visibility: 'visible' })
    gsap.set(currentEl, { zIndex: 1 })
    gsap.set(nextEl.querySelector('.slide-img-wrap'), { clipPath: dir > 0 ? 'inset(100% 0 0 0)' : 'inset(0 0 100% 0)' })
    gsap.set(nextEl.querySelector('.slide-img'), { scale: 1.3 })

    tl.to(currentEl.querySelectorAll('.slide-text-anim'), {
      y: dir * -80, opacity: 0, stagger: 0.03, duration: 0.5, ease: 'power3.in'
    })
    tl.to(nextEl.querySelector('.slide-img-wrap'), {
      clipPath: 'inset(0% 0 0% 0)', duration: 1, ease: 'power3.inOut'
    }, '-=0.2')
    tl.to(nextEl.querySelector('.slide-img'), {
      scale: 1, duration: 1.4, ease: 'power2.out'
    }, '<')
    tl.fromTo(nextEl.querySelectorAll('.slide-text-anim'),
      { y: dir * 80, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.7, ease: 'power3.out', clearProps: 'all' },
      '-=0.6'
    )
    tl.set(currentEl, { visibility: 'hidden', zIndex: 0 })

    setCurrentSlide(index)
  }, [currentSlide, setCurrentSlide])

  useEffect(() => {
    if (isOverlayOpen) return
    const handleWheel = (e) => {
      e.preventDefault()
      if (Math.abs(e.deltaY) < 30) return
      if (e.deltaY > 0) goTo(currentSlide + 1)
      else goTo(currentSlide - 1)
    }
    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [currentSlide, goTo, isOverlayOpen])

  useEffect(() => {
    if (isOverlayOpen) return
    const handleTouchStart = (e) => { touchStartY.current = e.touches[0].clientY }
    const handleTouchEnd = (e) => {
      const diff = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(diff) > 60) {
        if (diff > 0) goTo(currentSlide + 1)
        else goTo(currentSlide - 1)
      }
    }
    window.addEventListener('touchstart', handleTouchStart, { passive: true })
    window.addEventListener('touchend', handleTouchEnd, { passive: true })
    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [currentSlide, goTo, isOverlayOpen])

  useEffect(() => {
    if (isOverlayOpen) return
    const handleKey = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') goTo(currentSlide + 1)
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') goTo(currentSlide - 1)
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [currentSlide, goTo, isOverlayOpen])

  useEffect(() => {
    if (!loaded) return
    const firstSlide = containerRef.current.querySelector('.slide[data-index="0"]')
    if (!firstSlide) return
    gsap.set(firstSlide, { visibility: 'visible', zIndex: 2 })
    gsap.from(firstSlide.querySelector('.slide-img-wrap'), {
      clipPath: 'inset(50% 25% 50% 25%)', duration: 1.4, ease: 'power3.out'
    })
    gsap.from(firstSlide.querySelector('.slide-img'), {
      scale: 1.5, duration: 1.8, ease: 'power2.out'
    })
    gsap.from(firstSlide.querySelectorAll('.slide-text-anim'), {
      y: 60, opacity: 0, stagger: 0.08, duration: 0.9, delay: 0.4, ease: 'power3.out', clearProps: 'all'
    })
  }, [loaded])

  return (
    <div ref={containerRef} className="slider-container">
      {sections.map((s, i) => (
        <div key={s.id} className="slide" data-index={i} style={{ visibility: i === 0 && !loaded ? 'visible' : 'hidden' }}>
          <div className="slide-img-wrap">
            <div className="slide-img" style={{ backgroundImage: `url(${s.image})` }}>
              <div className="slide-img-overlay" style={{ background: `radial-gradient(ellipse at center, ${s.color}88 0%, #0a0a0aee 70%)` }} />
            </div>
          </div>

          <div className="slide-content">
            <div className="slide-meta-left">
              <span className="slide-text-anim slide-num">{s.num}</span>
            </div>

            <div className="slide-center">
              <h2 className="slide-text-anim slide-title">{s.title}</h2>
              <p className="slide-text-anim slide-stack">{s.subtitle}</p>
              <p className="slide-text-anim slide-desc">{s.desc}</p>
              <button 
                className="slide-text-anim slide-link clickable"
                onClick={() => onOpenOverlay(s.id)}
              >
                {s.actionText}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            <div className="slide-meta-right">
              {/* Optional right meta, empty for now */}
            </div>
          </div>
        </div>
      ))}

      <style>{`
        .slider-container{position:fixed;inset:0;z-index:1}
        .slide{position:absolute;inset:0;display:flex;align-items:center;justify-content:center}
        .slide-img-wrap{position:absolute;inset:0;overflow:hidden}
        .slide-img{position:absolute;inset:-20px;background-size:cover;background-position:center;will-change:transform}
        .slide-img-overlay{position:absolute;inset:0}

        .slide-content{position:relative;z-index:2;width:100%;height:100%;display:grid;grid-template-columns:120px 1fr 120px;align-items:center;padding:100px 48px}

        .slide-meta-left{display:flex;align-items:center;justify-content:flex-start}
        .slide-num{font-family:var(--font-display);font-size:.85rem;font-weight:300;color:var(--white-dim);letter-spacing:.15em}

        .slide-center{text-align:center;display:flex;flex-direction:column;align-items:center;gap:20px;max-width:800px;margin:0 auto}
        .slide-title{font-family:var(--font-display);font-size:clamp(3rem,9vw,8rem);font-weight:900;line-height:.9;letter-spacing:-.03em;text-transform:uppercase;color:var(--white)}
        .slide-stack{font-size:.85rem;font-weight:400;color:var(--white-dim);letter-spacing:.15em;text-transform:uppercase}
        .slide-desc{font-size:.92rem;color:var(--white-dim);line-height:1.8;max-width:520px}
        .slide-link{display:inline-flex;align-items:center;gap:8px;margin-top:8px;font-size:.85rem;font-weight:600;color:var(--white);letter-spacing:.08em;text-transform:uppercase;padding:12px 0;transition:gap .3s var(--ease);border-bottom:1px solid var(--white-muted);background:none;border-left:none;border-right:none;border-top:none;cursor:pointer}
        .slide-link:hover{gap:14px;border-color:var(--white)}

        .slide-meta-right{display:flex;align-items:center;justify-content:flex-end}

        @media(max-width:1024px){
          .slide-content{grid-template-columns:1fr;padding:120px 32px 100px;gap:0}
          .slide-meta-left,.slide-meta-right{position:absolute}
          .slide-meta-left{top:100px;left:32px}
          .slide-meta-right{top:100px;right:32px}
          .slide-title{font-size:clamp(2.5rem,12vw,5rem)}
        }
        @media(max-width:640px){
          .slide-content{padding:100px 24px 80px}
          .slide-meta-left{top:80px;left:24px}
          .slide-meta-right{top:80px;right:24px}
          .slide-desc{font-size:.84rem}
        }
      `}</style>
    </div>
  )
})

export default SectionSlider
