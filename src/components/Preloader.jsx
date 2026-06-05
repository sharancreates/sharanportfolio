import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function Preloader({ onComplete }) {
  const containerRef = useRef()
  const innerRef = useRef()
  const panelTopRef = useRef()
  const panelBottomRef = useRef()
  const [done, setDone] = useState(false)

  const telemetryLogs = [
    'system::init::kernel_load',
    'core::network::handshake',
    'arogya::fhir::r4_validator_active',
    'arogya::hl7::decouple_queues',
    'resumatch::ml::hybrid_engine_load',
    'resumatch::onnx::run_inference',
    'selene::crypto::aes_256_gcm_bind',
    'portfolio::ui::compile_shaders',
    'system::status::operational'
  ]

  const [telemetryText, setTelemetryText] = useState(telemetryLogs[0])

  useEffect(() => {
    // Ticker logic
    let index = 0
    const interval = setInterval(() => {
      index++
      if (index < telemetryLogs.length) {
        setTelemetryText(telemetryLogs[index])
      } else {
        clearInterval(interval)
      }
    }, 180)

    // GSAP Timeline
    const tl = gsap.timeline({
      onComplete: () => {
        setDone(true)
      }
    })

    // Animate inner elements fading out
    tl.to(innerRef.current, {
      opacity: 0,
      filter: 'blur(12px)',
      scale: 1.1,
      duration: 0.6,
      delay: 2.0,
      ease: 'power2.inOut'
    })

    // Slide panels away
    tl.to(panelTopRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: 'power4.inOut',
      onStart: () => {
        if (onComplete) onComplete()
      }
    }, '-=0.2')

    tl.to(panelBottomRef.current, {
      yPercent: 100,
      duration: 1.0,
      ease: 'power4.inOut'
    }, '-=1.0')

    return () => {
      clearInterval(interval)
      tl.kill()
    }
  }, [onComplete])

  if (done) return null

  return (
    <div ref={containerRef} className="preloader">
      <div ref={panelTopRef} className="preloader-panel panel-top" />
      <div ref={panelBottomRef} className="preloader-panel panel-bottom" />
      
      <div ref={innerRef} className="preloader-inner">
        {/* Kinetic SVG Logo */}
        <svg className="preloader-svg" viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="32" className="svg-circle" />
          <path d="M20,50 L80,50 M50,20 L50,80" className="svg-cross" />
          <polygon points="50,22 74,64 26,64" className="svg-triangle" />
        </svg>

        <div className="preloader-name">SHARANYA NAGAR</div>
        <div className="preloader-telemetry">{telemetryText}</div>
      </div>

      <style>{`
        .preloader {
          position: fixed;
          inset: 0;
          z-index: 10000;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          background: transparent;
        }
        .preloader-panel {
          position: absolute;
          left: 0;
          right: 0;
          height: 50.5vh;
          background: #070708;
          z-index: 1;
        }
        .panel-top {
          top: 0;
        }
        .panel-bottom {
          bottom: 0;
        }
        .preloader-inner {
          position: relative;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 16px;
        }
        .preloader-svg {
          width: clamp(80px, 15vw, 110px);
          height: clamp(80px, 15vw, 110px);
          margin-bottom: 8px;
        }
        
        /* SVG Kinetic Strokes */
        .svg-circle {
          fill: none;
          stroke: var(--accent, #10b981);
          stroke-width: 1.5;
          stroke-dasharray: 202;
          stroke-dashoffset: 202;
          animation: drawStroke 2.2s cubic-bezier(.16,1,.3,1) forwards, rotateCw 18s linear infinite;
          transform-origin: 50px 50px;
        }
        .svg-cross {
          fill: none;
          stroke: rgba(255, 255, 255, 0.08);
          stroke-width: 1;
          stroke-dasharray: 120;
          stroke-dashoffset: 120;
          animation: drawStroke 1.5s cubic-bezier(.16,1,.3,1) 0.3s forwards;
        }
        .svg-triangle {
          fill: none;
          stroke: var(--accent-secondary, #8b5cf6);
          stroke-width: 1.5;
          stroke-dasharray: 140;
          stroke-dashoffset: 140;
          animation: drawStroke 2s cubic-bezier(.16,1,.3,1) 0.5s forwards, rotateCcw 24s linear infinite;
          transform-origin: 50px 50px;
        }

        .preloader-name {
          font-family: var(--font-display);
          font-size: clamp(0.95rem, 2vw, 1.25rem);
          font-weight: 700;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          color: var(--white);
          opacity: 0.9;
        }
        .preloader-telemetry {
          font-family: 'Courier New', Courier, monospace;
          font-size: clamp(0.7rem, 1.5vw, 0.85rem);
          font-weight: 500;
          color: rgba(255, 255, 255, 0.45);
          letter-spacing: 0.05em;
          height: 1.2em;
          text-align: center;
          text-shadow: 0 0 8px rgba(255, 255, 255, 0.05);
        }

        @keyframes drawStroke {
          to {
            stroke-dashoffset: 0;
          }
        }
        @keyframes rotateCw {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes rotateCcw {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
      `}</style>
    </div>
  )
}
