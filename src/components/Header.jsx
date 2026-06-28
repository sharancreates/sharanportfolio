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
      <a href="#" className="hdr-item hdr-name-wrap">
        <img src="/logo.png" alt="Sharanya Nagar Logo" className="hdr-logo" />
      </a>
      <a href="/resume.pdf" target="_blank" rel="noreferrer" className="hdr-item hdr-resume clickable">DOWNLOAD CV</a>
      <style>{`
        .site-header{position:fixed;top:0;left:0;right:0;z-index:100;display:flex;align-items:center;justify-content:space-between;padding:32px 48px;pointer-events:none}
        .site-header>*{pointer-events:auto}
        .hdr-name-wrap{display:flex;align-items:center;transition:opacity .3s;text-decoration:none}
        .hdr-name-wrap:hover{opacity:.75}
        .hdr-logo{height:54px;width:auto;display:block}
        .hdr-resume{font-family:var(--font-display);font-size:.82rem;font-weight:700;letter-spacing:.15em;color:var(--accent-secondary);border:1px solid rgba(71,191,255,0.3);padding:8px 16px;border-radius:100px;background:rgba(71,191,255,0.05);transition:all .3s var(--ease);text-decoration:none}
        .hdr-resume:hover{background:var(--accent-secondary);color:#0a0a0a;border-color:var(--accent-secondary);transform:translateY(-1px);box-shadow:0 4px 15px rgba(71,191,255,0.2)}
        @media(max-width:640px){
          .site-header{padding:20px 24px}
          .hdr-logo{height:40px}
          .hdr-resume{font-size:.65rem;padding:6px 12px}
        }
      `}</style>
    </header>
  )
}
