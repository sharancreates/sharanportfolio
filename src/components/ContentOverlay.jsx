import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const projectsData = [
  {
    id: 1,
    title: 'RESUMATCH AI',
    stack: 'React.js · Flask · Python',
    desc: 'An algorithmic resume-matching platform that analyzes keywords against job descriptions to optimize ATS compatibility.',
    link: 'https://github.com/sharancreates/resumatch',
    year: '2026'
  },
  {
    id: 2,
    title: 'AROGYA HMS',
    stack: 'Flask · SQLite · Jinja2',
    desc: 'A centralized hospital management portal streamlining patient records and complex administrative workflows.',
    link: 'https://github.com/sharancreates/hospital-management-system',
    year: '2026'
  },
  {
    id: 3,
    title: 'DIGITAL SAKSHYA',
    stack: 'Conceptual · SDG 16',
    desc: 'A digital platform conceptualized for legal awareness and civic engagement.',
    link: '#',
    year: '2025'
  }
]

const blogsData = [
  {
    id: 1,
    title: 'THE FUTURE OF QUANTUM ML',
    stack: 'Machine Learning',
    desc: 'Exploring hybrid quantum models for advanced medical analysis and the future of healthcare technology.',
    link: '#',
    year: '2026'
  },
  {
    id: 2,
    title: 'SCALING MERN APPS',
    stack: 'Web Development',
    desc: 'A deep dive into architecting and deploying scalable full-stack applications.',
    link: '#',
    year: '2025'
  }
]

const codepenData = [
  {
    id: 1,
    title: 'GSAP SCROLL EFFECTS',
    stack: 'Animation',
    desc: 'A collection of smooth, cinematic scroll triggers built with GSAP and React.',
    link: '#',
    year: '2025'
  },
  {
    id: 2,
    title: 'CSS GLASSMORPHISM',
    stack: 'UI/UX',
    desc: 'Experimental UI components using modern CSS backdrop-filter techniques.',
    link: '#',
    year: '2024'
  }
]

export default function ContentOverlay({ activeSection, onClose }) {
  const ref = useRef()
  const contentRef = useRef()
  const [hoveredProject, setHoveredProject] = useState(null)

  useEffect(() => {
    if (!ref.current) return
    if (activeSection) {
      gsap.set(ref.current, { visibility: 'visible' })
      gsap.to(ref.current, { opacity: 1, duration: 0.5, ease: 'power2.out' })
      gsap.fromTo(contentRef.current.querySelectorAll('.overlay-anim'), 
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.08, duration: 0.8, delay: 0.2, ease: 'power3.out', clearProps: 'all' }
      )
    } else {
      gsap.to(ref.current, {
        opacity: 0, duration: 0.4, ease: 'power2.in',
        onComplete: () => gsap.set(ref.current, { visibility: 'hidden' })
      })
    }
  }, [activeSection])
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && activeSection) {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSection, onClose])
  return (
    <div 
      ref={ref} 
      className="content-overlay" 
      style={{ visibility: 'hidden', opacity: 0 }}
      role="dialog"
      aria-modal="true"
      aria-label={`${activeSection || ''} details dialog`}
    >
      
      {/* Close Button */}
      <button className="close-btn clickable" onClick={onClose} aria-label="Close details dialog">CLOSE</button>

      <div ref={contentRef} className="overlay-scroll about-scroll">
        <div className="overlay-inner">

          {/* 1. ABOUT SECTION */}
          {activeSection === 'about' && (
            <div className="section-container">
              <h2 className="overlay-anim section-title">ABOUT ME</h2>
              <p className="overlay-anim bio-large">
                I am an Aspiring Technologist with a unique blend of full-stack engineering skills and research interests
                in Quantum Computing and Data Science. 
              </p>
              <p className="overlay-anim bio-medium">
                Proven track record of developing functional applications while simultaneously exploring hybrid quantum models for medical analysis. Dedicated to leveraging cutting-edge technology to build impactful solutions in healthcare and social justice.
              </p>
              <div className="overlay-anim grid-2">
                <div>
                  <h3 className="sub-label">Education</h3>
                  <div className="timeline-item">
                    <h4>B.Tech CSE (AI-ML)</h4>
                    <p>Adani University · 9.20 CGPA</p>
                    <span>2024 – Present</span>
                  </div>
                  <div className="timeline-item">
                    <h4>Diploma in Programming</h4>
                    <p>IIT Madras</p>
                    <span>2026 – Present</span>
                  </div>
                </div>
                <div>
                  <h3 className="sub-label">Extra-Curricular</h3>
                  <div className="timeline-item">
                    <h4>Social Impact — SDG 16</h4>
                    <p>Explored and conceptualized digital solutions for Peace and Justice.</p>
                  </div>
                  <div className="timeline-item">
                    <h4>Creative Writing</h4>
                    <p>Actively write and publish poetry and prose.</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 2. SKILLS SECTION */}
          {activeSection === 'skills' && (
            <div className="section-container">
              <h2 className="overlay-anim section-title">EXPERTISE</h2>
              
              <div className="overlay-anim skills-group">
                <h3 className="sub-label">Programming & Frameworks</h3>
                <div className="skills-tags">
                  {['React.js', 'Flask', 'Node.js', 'Python', 'Express.js', 'PostgreSQL', 'Java'].map((s, i) => (
                    <span key={i} className="skill-tag" style={{animationDelay: `${i * 0.05}s`}}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="overlay-anim skills-group" style={{ marginTop: '60px' }}>
                <h3 className="sub-label">Core Concepts</h3>
                <div className="skills-tags">
                  {['SaaS Architecture', 'Computer Networking', 'UI Design', 'Operating Systems'].map((s, i) => (
                    <span key={i} className="skill-tag" style={{animationDelay: `${(i+7) * 0.05}s`}}>{s}</span>
                  ))}
                </div>
              </div>

              <div className="overlay-anim grid-2" style={{ marginTop: '80px' }}>
                <div>
                  <h3 className="sub-label">Certificates</h3>
                  <div className="timeline-item">
                    <h4>Cloud Computing</h4>
                    <p>IBM SkillsBuild</p>
                  </div>
                </div>
                <div>
                  <h3 className="sub-label">Achievements</h3>
                  <div className="timeline-item">
                    <h4>Algorithm Implementation</h4>
                    <p>Engineered a custom resume-parsing algorithm for "ResuMatch".</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* 3. PROJECTS SECTION (Animated Accordion) */}
          {activeSection === 'projects' && (
            <div className="section-container">
              <h2 className="overlay-anim section-title">PORTFOLIO</h2>
              <div className="projects-list">
                {projectsData.map((p) => (
                  <div 
                    key={p.id} 
                    className={`overlay-anim project-row ${hoveredProject === p.id ? 'expanded' : ''} ${hoveredProject && hoveredProject !== p.id ? 'dimmed' : ''}`}
                    onMouseEnter={() => setHoveredProject(p.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="pr-header">
                      <span className="pr-year">{p.year}</span>
                      <h3 className="pr-title">{p.title}</h3>
                      <span className="pr-stack">{p.stack}</span>
                    </div>
                    <div className="pr-body">
                      <p>{p.desc}</p>
                      {p.link !== '#' && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="pr-link clickable">
                          View on GitHub <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. BLOGS SECTION */}
          {activeSection === 'blogs' && (
            <div className="section-container">
              <h2 className="overlay-anim section-title">ARTICLES</h2>
              <div className="projects-list">
                {blogsData.map((p) => (
                  <div 
                    key={p.id} 
                    className={`overlay-anim project-row ${hoveredProject === p.id ? 'expanded' : ''} ${hoveredProject && hoveredProject !== p.id ? 'dimmed' : ''}`}
                    onMouseEnter={() => setHoveredProject(p.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="pr-header">
                      <span className="pr-year">{p.year}</span>
                      <h3 className="pr-title">{p.title}</h3>
                      <span className="pr-stack">{p.stack}</span>
                    </div>
                    <div className="pr-body">
                      <p>{p.desc}</p>
                      {p.link !== '#' && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="pr-link clickable">
                          Read Article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. CODEPEN SECTION */}
          {activeSection === 'codepen' && (
            <div className="section-container">
              <h2 className="overlay-anim section-title">EXPERIMENTS</h2>
              <div className="projects-list">
                {codepenData.map((p) => (
                  <div 
                    key={p.id} 
                    className={`overlay-anim project-row ${hoveredProject === p.id ? 'expanded' : ''} ${hoveredProject && hoveredProject !== p.id ? 'dimmed' : ''}`}
                    onMouseEnter={() => setHoveredProject(p.id)}
                    onMouseLeave={() => setHoveredProject(null)}
                  >
                    <div className="pr-header">
                      <span className="pr-year">{p.year}</span>
                      <h3 className="pr-title">{p.title}</h3>
                      <span className="pr-stack">{p.stack}</span>
                    </div>
                    <div className="pr-body">
                      <p>{p.desc}</p>
                      {p.link !== '#' && (
                        <a href={p.link} target="_blank" rel="noreferrer" className="pr-link clickable">
                          View CodePen <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 6. CONTACT SECTION */}
          {activeSection === 'contact' && (
            <div className="section-container contact-container">
              <h2 className="overlay-anim section-title">LET'S CONNECT</h2>
              <p className="overlay-anim contact-sub">Available for freelance opportunities and full-time roles.</p>
              
              <div className="overlay-anim huge-links">
                <a href="mailto:sharanyanagar@yahoo.in" className="huge-link clickable">
                  SHARANYANAGAR<br/>@YAHOO.IN
                </a>
              </div>
              
              <div className="overlay-anim grid-2" style={{ marginTop: '80px', borderTop: '1px solid var(--white-ghost)', paddingTop: '40px' }}>
                <div>
                  <h3 className="sub-label">Phone</h3>
                  <a href="tel:+918401061913" className="contact-small-link clickable">+91 84010 61913</a>
                </div>
                <div>
                  <h3 className="sub-label">Social</h3>
                  <div style={{display: 'flex', gap: '20px'}}>
                    <a href="https://linkedin.com/in/sharanya-nagar" target="_blank" rel="noreferrer" className="contact-small-link clickable">LinkedIn</a>
                    <a href="https://github.com/sharancreates" target="_blank" rel="noreferrer" className="contact-small-link clickable">GitHub</a>
                  </div>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>

      <style>{`
        .content-overlay{position:fixed;inset:0;z-index:90;background:var(--bg-overlay);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px)}
        .overlay-scroll{height:100%;overflow-y:auto;overflow-x:hidden}
        .overlay-inner{max-width:1000px;margin:0 auto;padding:140px 48px 100px;min-height:100%}
        
        .close-btn{position:fixed;top:32px;right:48px;z-index:100;font-family:var(--font-display);font-size:.82rem;font-weight:700;letter-spacing:.25em;color:var(--white);background:none;border:none;cursor:pointer;padding:8px 0;transition:opacity .3s}
        .close-btn:hover{opacity:.6}

        .section-container{width:100%}
        .section-title{font-family:var(--font-display);font-size:clamp(2rem,6vw,5rem);font-weight:900;line-height:1;letter-spacing:-.02em;text-transform:uppercase;color:var(--white);margin-bottom:60px;padding-bottom:40px;border-bottom:1px solid var(--white-ghost)}
        
        /* About */
        .bio-large{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:400;line-height:1.4;letter-spacing:-.01em;margin-bottom:30px;color:var(--white)}
        .bio-medium{font-size:1.1rem;line-height:1.8;color:var(--white-dim);margin-bottom:80px;max-width:800px}
        
        /* Layouts */
        .grid-2{display:grid;grid-template-columns:1fr 1fr;gap:60px}
        .sub-label{font-family:var(--font-display);font-size:.72rem;font-weight:700;letter-spacing:.3em;text-transform:uppercase;color:var(--white-muted);margin-bottom:24px}
        
        /* Timeline */
        .timeline-item{margin-bottom:32px}
        .timeline-item h4{font-size:1.1rem;font-weight:500;color:var(--white);margin-bottom:6px}
        .timeline-item p{font-size:.9rem;color:var(--white-dim);margin-bottom:8px;line-height:1.6}
        .timeline-item span{font-size:.8rem;color:var(--white-muted);font-family:var(--font-display);letter-spacing:.05em}

        /* Skills */
        .skills-tags{display:flex;flex-wrap:wrap;gap:12px}
        .skill-tag{font-size:1rem;font-weight:400;color:var(--white);padding:12px 24px;border:1px solid var(--white-ghost);border-radius:100px;transition:all .4s cubic-bezier(.16,1,.3,1);background:rgba(255,255,255,0.02)}
        .skill-tag:hover{border-color:var(--white);background:var(--white);color:var(--bg);transform:translateY(-2px)}

        /* Projects Animated List */
        .projects-list{display:flex;flex-direction:column;gap:0;border-top:1px solid var(--white-ghost)}
        .project-row{padding:30px 0;border-bottom:1px solid var(--white-ghost);transition:all .5s cubic-bezier(.16,1,.3,1);overflow:hidden}
        .project-row.dimmed{opacity:0.3}
        
        .pr-header{display:grid;grid-template-columns:100px 1fr 200px;align-items:center;cursor:pointer}
        .pr-year{font-family:var(--font-display);color:var(--white-muted);font-size:.9rem;letter-spacing:.1em}
        .pr-title{font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2.5rem);font-weight:800;text-transform:uppercase;margin:0;transition:transform .4s cubic-bezier(.16,1,.3,1);transform-origin:left}
        .pr-stack{text-align:right;font-size:.85rem;color:var(--white-dim);letter-spacing:.05em}
        
        .pr-body{height:0;opacity:0;visibility:hidden;transition:all .5s cubic-bezier(.16,1,.3,1);padding-left:100px;max-width:700px}
        .pr-body p{color:var(--white-dim);line-height:1.7;margin-bottom:20px;font-size:1rem}
        .pr-link{display:inline-flex;align-items:center;gap:8px;color:var(--white);font-weight:500;font-size:.9rem;text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid var(--white-muted);padding-bottom:4px;transition:gap .3s}
        .pr-link:hover{gap:14px;border-color:var(--white)}

        .project-row.expanded .pr-title{transform:translateX(20px);color:var(--accent)}
        .project-row.expanded .pr-body{height:auto;opacity:1;visibility:visible;padding-top:24px;padding-bottom:10px}

        /* Contact */
        .contact-sub{font-size:1.2rem;color:var(--white-dim);margin-bottom:60px}
        .huge-links{display:flex;flex-direction:column;gap:20px}
        .huge-link{font-family:var(--font-display);font-size:clamp(2.5rem,8vw,6rem);font-weight:900;line-height:.9;letter-spacing:-.03em;color:var(--white);transition:color .4s}
        .huge-link:hover{color:var(--accent)}
        .contact-small-link{font-size:1.1rem;color:var(--white-dim);transition:color .3s;border-bottom:1px solid transparent}
        .contact-small-link:hover{color:var(--white);border-color:var(--white)}

        @media(max-width:768px){
          .close-btn{top:20px;right:24px}
          .overlay-inner{padding:100px 24px 60px}
          .grid-2{grid-template-columns:1fr;gap:40px}
          .pr-header{grid-template-columns:1fr;gap:10px}
          .pr-year{display:none}
          .pr-stack{text-align:left}
          .pr-body{padding-left:0}
          .project-row.expanded .pr-title{transform:translateX(10px)}
        }
      `}</style>
    </div>
  )
}
