import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const ref = useRef()
  const counterRef = useRef()
  const [done, setDone] = useState(false)

  useEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
        if (onComplete) onComplete()
      }
    })

    const counter = { val: 0 }
    tl.to(counter, {
      val: 100, duration: 2, ease: 'power2.inOut',
      onUpdate: () => {
        if (counterRef.current) counterRef.current.textContent = Math.round(counter.val)
      }
    })
    tl.to(ref.current, { yPercent: -100, duration: 1, ease: 'power4.inOut' }, '+=0.3')

    return () => tl.kill()
  }, [onComplete])

  if (done) return null

  return (
    <div ref={ref} className="preloader">
      <div className="preloader-inner">
        <div className="preloader-name">SHARANYA NAGAR</div>
        <div className="preloader-bar-wrap">
          <div className="preloader-bar" />
        </div>
        <div className="preloader-counter" ref={counterRef}>0</div>
      </div>
      <style>{`
        .preloader{position:fixed;inset:0;z-index:10000;background:#0a0a0a;display:flex;align-items:center;justify-content:center}
        .preloader-inner{display:flex;flex-direction:column;align-items:center;gap:32px}
        .preloader-name{font-family:var(--font-display);font-size:clamp(1rem,2vw,1.4rem);font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--white)}
        .preloader-bar-wrap{width:200px;height:1px;background:var(--white-ghost);border-radius:1px;overflow:hidden}
        .preloader-bar{height:100%;width:0;background:var(--white);animation:preloaderFill 2s cubic-bezier(.16,1,.3,1) forwards}
        .preloader-counter{font-family:var(--font-display);font-size:clamp(4rem,8vw,7rem);font-weight:800;color:var(--white);line-height:1;letter-spacing:-.04em}
        @keyframes preloaderFill{from{width:0}to{width:100%}}
      `}</style>
    </div>
  )
}
