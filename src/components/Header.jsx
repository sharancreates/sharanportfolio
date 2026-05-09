import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function Header({ loaded }) {
  const ref = useRef()

  useEffect(() => {
    if (loaded) {
      gsap.from(ref.current.querySelectorAll('.hdr-item'), {
        y: -30, opacity: 0, stagger: 0.1, duration: 0.8, delay: 0.2, ease: 'power3.out', clearProps: 'all'
      })
    }
  }, [loaded])

  return (
    <header ref={ref} className="site-header">
      <a href="#" className="hdr-item hdr-name">SHARANYA NAGAR</a>
      <style>{`
        .site-header{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:32px 48px;pointer-events:none}
        .site-header>*{pointer-events:auto}
        .hdr-name{font-family:var(--font-display);font-size:.82rem;font-weight:700;letter-spacing:.25em;text-transform:uppercase;color:var(--white);transition:opacity .3s}
        .hdr-name:hover{opacity:.6}
        @media(max-width:640px){.site-header{padding:20px 24px}.hdr-name{font-size:.7rem}}
      `}</style>
    </header>
  )
}
