import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function FixedFooter({ currentSlide, totalSlides, onDotClick, loaded }) {
  const ref = useRef()

  useEffect(() => {
    if (loaded) {
      gsap.from(ref.current.querySelectorAll('.ftr-item'), {
        y: 30, opacity: 0, stagger: 0.1, duration: 0.8, delay: 0.3, ease: 'power3.out', clearProps: 'all'
      })
    }
  }, [loaded])

  return (
    <footer ref={ref} className="site-footer-fixed">
      <div className="ftr-item ftr-dots">
        {Array.from({ length: totalSlides }, (_, i) => (
          <button
            key={i}
            className={`ftr-dot ${i === currentSlide ? 'active' : ''}`}
            onClick={() => onDotClick(i)}
            aria-label={`Go to project ${i + 1}`}
          />
        ))}
      </div>
      <div className="ftr-item ftr-socials">
        <a href="https://linkedin.com/in/sharanya-nagar" target="_blank" rel="noreferrer">LinkedIn</a>
        <a href="https://github.com/sharancreates" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:sharanyanagar@yahoo.in">Email</a>
      </div>
      <style>{`
        .site-footer-fixed{position:fixed;bottom:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:32px 48px;pointer-events:none}
        .site-footer-fixed>*{pointer-events:auto}
        .ftr-dots{display:flex;gap:10px;align-items:center}
        .ftr-dot{width:8px;height:8px;border-radius:50%;background:var(--white-muted);border:none;padding:0;transition:all .4s var(--ease);cursor:pointer}
        .ftr-dot.active{background:var(--white);transform:scale(1.3)}
        .ftr-dot:hover{background:var(--white-dim)}
        .ftr-socials{display:flex;gap:36px}
        .ftr-socials a{font-size:.82rem;font-weight:400;color:var(--white-dim);letter-spacing:.03em;transition:color .3s;position:relative}
        .ftr-socials a::after{content:'';position:absolute;bottom:-4px;left:0;width:0;height:1px;background:var(--white);transition:width .3s var(--ease)}
        .ftr-socials a:hover{color:var(--white)}
        .ftr-socials a:hover::after{width:100%}
        @media(max-width:640px){.site-footer-fixed{padding:20px 24px}.ftr-socials{gap:20px}.ftr-socials a{font-size:.75rem}}
      `}</style>
    </footer>
  )
}
