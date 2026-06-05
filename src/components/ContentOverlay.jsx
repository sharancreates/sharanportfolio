import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const projectsData = [
  {
    id: 1,
    title: 'RESUMATCH AI',
    stack: 'React.js · Flask · Python',
    desc: 'An AI-powered ATS (Applicant Tracking System) resume analyzer that parses keyword density, semantic intent, and formatting parameters against target job descriptions to maximize recruitment matching rates. Built a hybrid lexical-semantic parsing engine that reduced parsing latency by 70% and achieved a 30% average improvement in candidate match accuracy across 150+ tested profiles.',
    link: 'https://github.com/sharancreates/resumatch',
    demo: 'https://resumatch-cm7x.onrender.com',
    year: '2026',
    status: 'deployed',
    image: '/slides/resumatch.webp'
  },
  {
    id: 2,
    title: 'AROGYA HMS',
    stack: 'React 19 · Flask · Python',
    desc: 'A secure, full-stack Hospital Management System built with React 19 and Flask, featuring healthcare interoperability through HL7 v2 and FHIR standards.',
    link: 'https://github.com/sharancreates/hospital-management-system',
    medium: 'https://medium.com/@sharanyanagar/engineering-arogya-lessons-from-building-a-secure-healthcare-platform-ced0cf4ccca2',
    demo: 'https://arogya-hms-sharancreates.vercel.app/',
    year: '2026',
    status: 'deployed',
    image: '/slides/arogya.webp'
  }
]

const blogsData = [
  {
    id: 1,
    title: 'ENGINEERING AROGYA: LESSONS FROM BUILDING A SECURE HEALTHCARE PLATFORM',
    stack: 'Healthcare Tech · Full-Stack',
    desc: 'Deep dive into the architectural decisions, database query optimizations, and asynchronous background scheduling strategies implemented in Arogya HMS.',
    link: 'https://medium.com/@sharanyanagar/engineering-arogya-lessons-from-building-a-secure-healthcare-platform-ced0cf4ccca2',
    year: '2026'
  },
  {
    id: 2,
    title: 'BUILDING AEGIS: A PENETRATION TESTING FRAMEWORK',
    stack: 'Cybersecurity · Automation',
    desc: 'An exploration of how I designed and engineered Aegis, a modular command-line tool automated for network scanning and vulnerability audits.',
    link: 'https://medium.com/@sharanyanagar/building-aegis-a-penetration-testing-framework-67685b8eb10a',
    year: '2026'
  },
  {
    id: 3,
    title: 'GOOGLE DORKING FOR BEGINNERS: GHOSTING THE NETWORK',
    stack: 'Cybersecurity · OSINT',
    desc: 'A comprehensive, beginner-friendly guide explaining how to leverage advanced Google search operators to run information disclosure audits.',
    link: 'https://medium.com/@sharanyanagar/google-dorking-for-beginners-ghosting-the-network-c1dc1efbeef7',
    year: '2025'
  }
]



export default function ContentOverlay({ activeSection, onClose }) {
  const ref = useRef()
  const contentRef = useRef()
  const [hoveredProject, setHoveredProject] = useState(null)
  const [activeFaq, setActiveFaq] = useState(null)

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
              
              <div className="overlay-anim about-hero-grid">
                <div className="about-graphic-wrap">
                  <div className="neural-node-network">
                    <svg viewBox="0 0 100 100" className="network-svg">
                      <circle cx="50" cy="50" r="40" className="orbit-ring" />
                      <circle cx="50" cy="50" r="25" className="orbit-ring inner" />
                      <line x1="50" y1="10" x2="50" y2="90" className="network-line" />
                      <line x1="10" y1="50" x2="90" y2="50" className="network-line" />
                      
                      <circle cx="50" cy="50" r="6" className="network-node center-node" />
                      <circle cx="50" cy="10" r="4" className="network-node node-t" />
                      <circle cx="50" cy="90" r="4" className="network-node node-b" />
                      <circle cx="10" cy="50" r="4" className="network-node node-l" />
                      <circle cx="90" cy="50" r="4" className="network-node node-r" />
                    </svg>
                  </div>
                </div>
                <div className="about-hero-text">
                  <p className="bio-large">
                    I build AI-powered web apps solving healthcare & civic challenges.
                  </p>
                  <p className="bio-sub">
                    I'm a full-stack developer who turns complex ideas into software that actually ships — on time, on budget, and built to scale.
                  </p>
                </div>
              </div>

              <div className="overlay-anim about-services">
                <h3 className="sub-label">What I Build</h3>
                <div className="service-items">
                  <div className="service-item">
                    <h4>Full-Stack Web Development</h4>
                    <p>Production-grade React and Flask applications — from database architecture to polished UI — so you hire one engineer, not three.</p>
                  </div>
                  <div className="service-item">
                    <h4>AI/ML Integration</h4>
                    <p>Custom scoring engines, NLP pipelines, and intelligent automation wired directly into your product — not bolted on as an afterthought.</p>
                  </div>
                  <div className="service-item">
                    <h4>Startup Consulting</h4>
                    <p>From MVP architecture to deployment strategy, I help early-stage teams ship faster with leaner stacks and fewer regrets.</p>
                  </div>
                </div>
              </div>

              <div className="overlay-anim grid-2" style={{ marginTop: '60px' }}>
                <div>
                  <h3 className="sub-label">Industries</h3>
                  <div className="skills-tags">
                    {['Healthcare', 'Civic Tech', 'Startups'].map((s, i) => (
                      <span key={i} className="skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="sub-label">Why Hire Me</h3>
                  <div className="differentiator-list">
                    <p>→ Engineering rigor from <strong>Adani University</strong> (CSE, AI-ML) and <strong>IIT Madras</strong></p>
                    <p>→ End-to-end ownership — I design, build, deploy, and maintain</p>
                    <p>→ Every project ships with production security, performance tuning, and clean docs</p>
                  </div>
                </div>
              </div>

              <div className="overlay-anim cta-section">
                <a href="mailto:sharanyanagar@yahoo.in" className="cta-btn clickable">
                  LET'S TALK ABOUT YOUR PROJECT
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                </a>
              </div>
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
                      <span className="pr-stack">{p.stack}<span className={`pr-status ${p.status}`} title={p.status === 'deployed' ? 'Live' : p.status === 'progress' ? 'In Progress' : 'Concept'} /></span>
                    </div>
                    <div className="pr-body">
                      <div className="project-detail-grid">
                        <div className="project-info">
                          <p>{p.desc}</p>
                          <div className="project-links-wrap">
                            {p.link && p.link !== '#' && (
                              <a href={p.link} target="_blank" rel="noreferrer" className="pr-link clickable">
                                Codebase <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                              </a>
                            )}
                            {p.medium && p.medium !== '#' && (
                              <a href={p.medium} target="_blank" rel="noreferrer" className="pr-link clickable">
                                Medium Article <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                              </a>
                            )}
                            {p.demo && p.demo !== '#' && (
                              <a href={p.demo} target="_blank" rel="noreferrer" className="pr-link clickable">
                                Live Demo <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M7 17L17 7M17 7H7M17 7v10"/></svg>
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="project-preview-wrap">
                          {p.id === 1 && (
                            <div className="project-graphic-ui resumatch-ui">
                              <div className="scan-line" />
                              <div className="resume-mock">
                                <div className="mock-line header" />
                                <div className="mock-line body-1" />
                                <div className="mock-line body-2" />
                                <div className="mock-line body-3" />
                              </div>
                              <div className="score-badge">94% MATCH</div>
                            </div>
                          )}
                          {p.id === 2 && (
                            <img src={p.image} alt={p.title} className="project-preview-img" />
                          )}
                        </div>
                      </div>
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



          {/* 6. CONTACT SECTION */}
          {activeSection === 'contact' && (
            <div className="section-container contact-container">
              <h2 className="overlay-anim section-title">START A PROJECT</h2>
              <p className="overlay-anim contact-sub">Ready to bring your software to life? Let's discuss your project and map out the build.</p>
              
              {/* FAQ Accordion Section */}
              <div className="overlay-anim faq-section" style={{ marginBottom: '80px' }}>
                <h3 className="sub-label">Frequently Asked Questions</h3>
                <div className="faq-list">
                  {[
                    {
                      q: "We’ve been burned by slow development and poor communication before. How do you work?",
                      a: "I run my freelance business like a partner, not a contractor. I work in transparent, weekly sprints. Every Friday, you receive a working preview URL of the code and a 5-minute Loom video walking you through exactly what was built and why. If there's a blocker or architectural tradeoff, we address it immediately. No black boxes, and no surprise invoices."
                    },
                    {
                      q: "How do you handle security and data compliance, especially in health tech or civic spaces?",
                      a: "Security isn't a feature you bolt on at the end; it's the foundation of the codebase. I design applications with modern security standards from Day 1. This includes zero-knowledge architectures, client-side AES-256 encryption using the Web Crypto API, strict CORS policies, token-based authentication, and structured database transactions to prevent injections and leaks."
                    },
                    {
                      q: "Do I own the code once the project is finished?",
                      a: "Yes. Upon final payment, 100% of the intellectual property, repository rights, and deployment assets are transferred to your company. I build it, but it’s completely yours."
                    },
                    {
                      q: "How do you structure project pricing?",
                      a: "I work primarily on fixed-scope project rates or weekly retainers, meaning you know exactly what your build will cost before we start. No hidden hourly fees or surprise invoices."
                    }
                  ].map((faq, index) => (
                    <div key={index} className={`overlay-anim faq-item ${activeFaq === index ? 'active' : ''}`}>
                      <button className="faq-question clickable" onClick={() => setActiveFaq(activeFaq === index ? null : index)}>
                        <span>{faq.q}</span>
                        <svg className="faq-icon" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M12 5v14M5 12h14"/></svg>
                      </button>
                      <div className="faq-answer">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

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
        .overlay-scroll{height:100%;overflow-y:auto;overflow-x:hidden;-webkit-overflow-scrolling:touch}
        .overlay-inner{max-width:1000px;margin:0 auto;padding:140px 48px 100px;min-height:100%}
        
        .close-btn{position:fixed;top:32px;right:48px;z-index:100;font-family:var(--font-display);font-size:.82rem;font-weight:700;letter-spacing:.25em;color:var(--white);background:none;border:none;cursor:pointer;padding:8px 0;transition:opacity .3s}
        .close-btn:hover{opacity:.6}

        .section-container{width:100%}
        .section-title{font-family:var(--font-display);font-size:clamp(2rem,6vw,5rem);font-weight:900;line-height:1;letter-spacing:-.02em;text-transform:uppercase;color:var(--white);margin-bottom:60px;padding-bottom:40px;border-bottom:1px solid var(--white-ghost)}
        
        /* About Dynamic Visual Network */
        .about-hero-grid{display:grid;grid-template-columns:220px 1fr;gap:40px;align-items:center;margin-bottom:60px}
        .about-graphic-wrap{width:220px;height:220px;display:flex;align-items:center;justify-content:center;position:relative;background:var(--bg-elevated);border-radius:24px;border:1px solid var(--white-ghost);overflow:hidden;box-shadow:inset 0 0 20px rgba(134,59,255,0.08)}
        .neural-node-network{width:80%;height:80%;display:flex;align-items:center;justify-content:center}
        .network-svg{width:100%;height:100%;overflow:visible}
        .orbit-ring{fill:none;stroke:var(--white-ghost);stroke-width:1;stroke-dasharray:4 4;transform-origin:50px 50px;animation:spinOrbit 20s linear infinite}
        .orbit-ring.inner{stroke:rgba(134,59,255,0.2);animation:spinOrbit 10s linear infinite reverse}
        .network-line{stroke:var(--white-ghost);stroke-width:0.5;stroke-opacity:0.3}
        .network-node{fill:var(--bg);stroke:var(--white-dim);stroke-width:2.5;transition:all 0.3s}
        .network-node.center-node{fill:var(--accent);stroke:var(--accent-secondary);stroke-width:2;animation:pulseNode 2s infinite ease-in-out}
        .network-node.node-t{animation:pulseNodeT 4s infinite ease-in-out}
        .network-node.node-b{animation:pulseNodeB 4s infinite ease-in-out}
        .network-node.node-l{animation:pulseNodeL 4s infinite ease-in-out 1s}
        .network-node.node-r{animation:pulseNodeR 4s infinite ease-in-out 1s}

        @keyframes spinOrbit{
          0%{transform:rotate(0deg)}
          100%{transform:rotate(360deg)}
        }
        @keyframes pulseNode{
          0%,100%{transform:scale(1);filter:drop-shadow(0 0 2px var(--accent))}
          50%{transform:scale(1.2);filter:drop-shadow(0 0 10px var(--accent))}
        }
        @keyframes pulseNodeT{
          0%,100%{transform:translateY(0);fill:var(--bg)}
          50%{transform:translateY(-4px);fill:var(--accent-secondary);stroke:var(--accent-secondary)}
        }
        @keyframes pulseNodeB{
          0%,100%{transform:translateY(0);fill:var(--bg)}
          50%{transform:translateY(4px);fill:var(--accent-secondary);stroke:var(--accent-secondary)}
        }
        @keyframes pulseNodeL{
          0%,100%{transform:translateX(0);fill:var(--bg)}
          50%{transform:translateX(-4px);fill:var(--accent);stroke:var(--accent)}
        }
        @keyframes pulseNodeR{
          0%,100%{transform:translateX(0);fill:var(--bg)}
          50%{transform:translateX(4px);fill:var(--accent);stroke:var(--accent)}
        }

        /* Project Dynamic UI Mockups */
        .project-graphic-ui{position:relative;width:100%;height:100%;min-height:160px;display:flex;flex-direction:column;align-items:center;justify-content:center;background:var(--bg-elevated);border-radius:12px;overflow:hidden;border:1px solid var(--white-ghost);padding:20px;box-sizing:border-box}
        
        /* ResuMatch UI */
        .resumatch-ui{background:linear-gradient(135deg, #111111 0%, #151020 100%)}
        .scan-line{position:absolute;left:0;right:0;height:2px;background:var(--accent-secondary);box-shadow:0 0 12px var(--accent-secondary);animation:scanAnimation 3s infinite ease-in-out;z-index:2}
        .resume-mock{width:80%;display:flex;flex-direction:column;gap:8px}
        .mock-line{height:6px;background:rgba(255,255,255,0.08);border-radius:4px}
        .mock-line.header{width:40%;background:rgba(255,255,255,0.2);height:10px;margin-bottom:6px}
        .mock-line.body-1{width:85%}
        .mock-line.body-2{width:95%}
        .mock-line.body-3{width:70%}
        .score-badge{position:absolute;bottom:16px;right:16px;background:rgba(71,191,255,0.1);color:var(--accent-secondary);border:1px solid rgba(71,191,255,0.3);padding:6px 12px;border-radius:20px;font-family:var(--font-display);font-size:0.75rem;font-weight:700;letter-spacing:0.05em;animation:pulseBadge 2s infinite ease-in-out}

        @keyframes scanAnimation{
          0%, 100%{top:10%}
          50%{top:90%}
        }
        @keyframes pulseBadge{
          0%, 100%{opacity:0.8;transform:scale(1)}
          50%{opacity:1;transform:scale(1.05);box-shadow:0 0 10px rgba(71,191,255,0.2)}
        }



        .bio-large{font-size:clamp(1.5rem,3vw,2.2rem);font-weight:700;line-height:1.4;letter-spacing:-.01em;color:var(--white);margin-bottom:12px}
        .bio-sub{font-size:1.1rem;line-height:1.8;color:var(--white-dim)}
        .bio-medium{font-size:1.1rem;line-height:1.8;color:var(--white-dim);margin-bottom:80px;max-width:800px}

        /* Services */
        .about-services{margin-top:60px}
        .service-items{display:flex;flex-direction:column;gap:28px;margin-top:20px}
        .service-item h4{font-size:1.15rem;font-weight:600;color:var(--white);margin-bottom:8px;letter-spacing:.02em}
        .service-item p{font-size:.95rem;color:var(--white-dim);line-height:1.7}
        .differentiator-list p{font-size:.95rem;color:var(--white-dim);line-height:2.2;margin-bottom:0}
        .differentiator-list strong{color:var(--white)}
        .cta-section{margin-top:60px;text-align:center;padding:40px 0;border-top:1px solid var(--white-ghost)}
        .cta-btn{display:inline-flex;align-items:center;gap:12px;font-family:var(--font-display);font-size:clamp(.9rem,1.5vw,1.1rem);font-weight:700;letter-spacing:.15em;text-transform:uppercase;color:var(--white);padding:20px 40px;border:1px solid var(--white-muted);border-radius:100px;transition:all .4s cubic-bezier(.16,1,.3,1)}
        .cta-btn:hover{background:var(--white);color:var(--bg);border-color:var(--white);transform:translateY(-2px)}
        
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
        .skill-tag:hover{border-color:var(--accent);background:var(--accent);color:var(--bg);transform:translateY(-2px);box-shadow:0 4px 20px var(--accent-glow)}

        /* Projects Animated List */
        .projects-list{display:flex;flex-direction:column;gap:0;border-top:1px solid var(--white-ghost)}
        .project-row{padding:30px 0;border-bottom:1px solid var(--white-ghost);transition:all .5s cubic-bezier(.16,1,.3,1);overflow:hidden}
        .project-row.dimmed{opacity:0.3}
        
        .pr-header{display:grid;grid-template-columns:100px 1fr 200px;align-items:center;cursor:pointer}
        .pr-year{font-family:var(--font-display);color:var(--white-muted);font-size:.9rem;letter-spacing:.1em}
        .pr-title{font-family:var(--font-display);font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;text-transform:uppercase;margin:0;transition:transform .4s cubic-bezier(.16,1,.3,1);transform-origin:left}
        .pr-status{display:inline-block;width:8px;height:8px;border-radius:50%;margin-left:12px;vertical-align:middle}
        .pr-status.deployed{background:#22c55e}
        .pr-status.progress{background:#eab308}
        .pr-status.concept{background:var(--accent-secondary)}
        .pr-stack{text-align:right;font-size:.85rem;color:var(--white-dim);letter-spacing:.05em}
        
        .pr-body{height:0;opacity:0;visibility:hidden;transition:all .5s var(--ease);padding-left:100px}
        .project-detail-grid{display:grid;grid-template-columns:1.2fr 0.8fr;gap:40px;align-items:start}
        .project-info p{color:var(--white-dim);line-height:1.7;margin-bottom:24px;font-size:1rem}
        .project-links-wrap{display:flex;gap:20px;flex-wrap:wrap}
        .pr-link{display:inline-flex;align-items:center;gap:8px;color:var(--white);font-weight:700;font-size:.85rem;text-transform:uppercase;letter-spacing:.1em;border-bottom:1px solid var(--white-muted);padding-bottom:4px;transition:all .3s var(--ease)}
        .pr-link:hover{gap:12px;border-color:var(--accent);color:var(--accent-text)}
        .project-preview-wrap{position:relative;border-radius:12px;overflow:hidden;border:1px solid var(--white-ghost);background:var(--bg-elevated);box-shadow:0 10px 30px rgba(0,0,0,0.5);aspect-ratio:1.6;transition:transform .4s var(--ease)}
        .project-preview-wrap:hover{transform:scale(1.02);border-color:var(--accent-glow)}
        .project-preview-img{width:100%;height:100%;object-fit:cover;opacity:0.85;transition:opacity .4s}
        .project-preview-wrap:hover .project-preview-img{opacity:1}

        .project-row.expanded .pr-title{transform:translateX(20px);color:var(--accent)}
        .project-row.expanded .pr-body{height:auto;opacity:1;visibility:visible;padding-top:24px;padding-bottom:10px}

        /* Contact */
        .contact-sub{font-size:1.2rem;color:var(--white-dim);margin-bottom:60px}
        .huge-links{display:flex;flex-direction:column;gap:20px}
        .huge-link{font-family:var(--font-display);font-size:clamp(2.5rem,8vw,6rem);font-weight:900;line-height:.9;letter-spacing:-.03em;color:var(--white);transition:color .4s}
        .huge-link:hover{color:var(--accent)}
        .contact-small-link{font-size:1.1rem;color:var(--white-dim);transition:color .3s;border-bottom:1px solid transparent}
        .contact-small-link:hover{color:var(--white);border-color:var(--white)}

        /* FAQ */
        .faq-list{display:flex;flex-direction:column;gap:0;border-top:1px solid var(--white-ghost);margin-top:24px}
        .faq-item{border-bottom:1px solid var(--white-ghost);overflow:hidden}
        .faq-question{width:100%;display:flex;justify-content:between;align-items:center;padding:24px 0;text-align:left;font-family:var(--font-body);font-size:1.05rem;font-weight:500;color:var(--white);background:none;border:none;cursor:pointer;gap:20px}
        .faq-question span{flex:1}
        .faq-icon{transition:transform .4s var(--ease);color:var(--white-dim)}
        .faq-item.active .faq-icon{transform:rotate(135deg);color:var(--accent)}
        .faq-answer{height:0;opacity:0;visibility:hidden;transition:all .4s var(--ease)}
        .faq-item.active .faq-answer{height:auto;opacity:1;visibility:visible;padding-bottom:24px}
        .faq-answer p{font-size:.95rem;line-height:1.7;color:var(--white-dim);max-width:800px}

        @media(max-width:768px){
          .close-btn{top:20px;right:24px}
          .overlay-inner{padding:100px 24px 60px}
          .grid-2{grid-template-columns:1fr;gap:40px}
          .pr-header{grid-template-columns:1fr;gap:10px}
          .pr-year{display:none}
          .pr-stack{text-align:left}
          .pr-body{padding-left:0}
          .project-row.expanded .pr-title{transform:translateX(10px)}
          .cta-btn{width:100%;justify-content:center;padding:18px 24px;font-size:.85rem}
          .service-items{padding:0 var(--space-sm,16px)}
          .about-hero-grid{grid-template-columns:1fr;text-align:center;gap:24px}
          .about-avatar-wrap{margin:0 auto}
          .project-detail-grid{grid-template-columns:1fr;gap:24px}
        }
      `}</style>
    </div>
  )
}
