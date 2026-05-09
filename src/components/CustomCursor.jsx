import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const dot = useRef()
  const ring = useRef()

  useEffect(() => {
    const moveCursor = (e) => {
      gsap.to(dot.current, { x: e.clientX, y: e.clientY, duration: 0.08 })
      gsap.to(ring.current, { x: e.clientX, y: e.clientY, duration: 0.25, ease: 'power2.out' })
    }
    const grow = () => gsap.to(ring.current, { scale: 2, opacity: 0.5, duration: 0.3 })
    const shrink = () => gsap.to(ring.current, { scale: 1, opacity: 1, duration: 0.3 })

    const handleMouseOver = (e) => {
      if (e.target.closest('a, button, .clickable')) {
        grow()
      }
    }
    const handleMouseOut = (e) => {
      if (e.target.closest('a, button, .clickable')) {
        shrink()
      }
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseover', handleMouseOver)
    document.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseover', handleMouseOver)
      document.removeEventListener('mouseout', handleMouseOut)
    }
  }, [])

  return (
    <>
      <div ref={dot} className="cursor-dot" />
      <div ref={ring} className="cursor-ring" />
      <style>{`
        .cursor-dot,.cursor-ring{position:fixed;top:0;left:0;pointer-events:none;z-index:99999;transform:translate(-50%,-50%);will-change:transform}
        .cursor-dot{width:6px;height:6px;border-radius:50%;background:var(--white)}
        .cursor-ring{width:40px;height:40px;border-radius:50%;border:1px solid var(--white-muted)}
        @media(max-width:1024px){.cursor-dot,.cursor-ring{display:none!important}}
        @media(pointer:coarse){.cursor-dot,.cursor-ring{display:none!important}}
        body{cursor:none}
        @media(max-width:1024px){body{cursor:auto}}
        a,button,.clickable{cursor:none}
        @media(max-width:1024px){a,button,.clickable{cursor:pointer}}
      `}</style>
    </>
  )
}
