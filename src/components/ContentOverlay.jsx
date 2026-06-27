import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

const projectsData = [
  {
    id: 1,
    title: 'RESUMATCH AI',
    stack: 'React.js · Flask · Python · ONNX · Scikit-Learn',
    desc: 'An AI-powered ATS resume analyzer that parses keyword density, semantic intent, and formatting parameters against job descriptions. Built a hybrid lexical-semantic parsing engine (40% keyword CountVectorizer + 60% all-MiniLM-L6-v2 sentence embeddings via ONNX Runtime) that cut inference latency by 70% and achieved a 30% candidate match improvement. Uses an OrderedDict-backed LRU caching layer.',
    link: 'https://github.com/sharancreates/resumatch',
    demo: 'https://resumatch-cm7x.onrender.com',
    year: '2026',
    status: 'deployed',
    image: '/slides/resumatch.webp'
  },
  {
    id: 2,
    title: 'AROGYA HMS',
    stack: 'React 19 · Flask · PostgreSQL · Celery · Redis',
    desc: 'A secure, interoperable Hospital Management System. Implemented an interoperability layer dynamically generating HL7 v2 ADT messages and FHIR R4 Patient resources. Decoupled heavy tasks (SMTP/PDF creation) to Celery/Redis, reducing reminder dispatch latency from 32s to 20ms. Eliminated SQL N+1 loading bottlenecks using SQLAlchemy joinedload to consolidate queries into O(1) scheduling checks.',
    link: 'https://github.com/sharancreates/hospital-management-system',
    medium: 'https://medium.com/@sharanyanagar/engineering-arogya-lessons-from-building-a-secure-healthcare-platform-ced0cf4ccca2',
    demo: 'https://arogya-hms-sharancreates.vercel.app/',
    year: '2026',
    status: 'deployed',
    image: '/slides/arogya.webp'
  },
  {
    id: 3,
    title: 'SELENE TRACKER',
    stack: 'React.js · Flask · Web Crypto API · SQLite',
    desc: 'A zero-knowledge menstrual health tracker. All calculations and encryption (AES-256-GCM via browser Web Crypto API) run client-side; the server stores only opaque ciphertext linked to anonymous cryptographically random UUIDs. Built a variance-aware prediction algorithm dynamically adapting confidence windows for cycle irregularity and PCOS patterns.',
    link: 'https://github.com/sharancreates/selene',
    demo: '#',
    year: '2026',
    status: 'progress',
    image: '/slides/sakshya.webp'
  },
  {
    id: 4,
    title: 'AION CODE REVIEWER',
    stack: 'FastAPI · React.js · PyTorch · Transformers',
    desc: 'A Reinforcement Learning (RL) based automated code reviewer. Trained a fine-tuned language model with REINFORCE and Supervised Fine-Tuning (SFT) to optimize syntax styling, algorithmic efficiency, and security vulnerabilities. Features a custom AST-based code execution sandbox and a multi-objective reward policy.',
    link: 'https://github.com/Wall-E-30/code-reviewer',
    demo: '#',
    year: '2026',
    status: 'deployed',
    image: '/slides/mern.webp'
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
                    I engineer secure full-stack systems, performance-tuned database schemas, and intelligent ML pipelines.
                  </p>
                  <p className="bio-sub">
                    I'm a software engineering student specializing in AI-ML. I focus on building robust system architectures, optimizing database latency, and implementing high-efficiency machine learning integrations.
                  </p>
                </div>
              </div>

              <div className="overlay-anim about-services">
                <h3 className="sub-label">Core Capabilities</h3>
                <div className="service-items">
                  <div className="service-item">
                    <h4>Full-Stack Architecture</h4>
                    <p>Production-ready applications utilizing React 19, Flask, Node.js, and PostgreSQL. Focused on clean system isolation, RESTful design, and responsive user experiences.</p>
                  </div>
                  <div className="service-item">
                    <h4>AI/ML Systems Engineering</h4>
                    <p>Integrating transformer-based models, fine-tuning LLMs with Reinforcement Learning (RL), and accelerating inference with ONNX Runtime on edge or cloud servers.</p>
                  </div>
                  <div className="service-item">
                    <h4>Performance & Scale Optimization</h4>
                    <p>Alleviating database query bottlenecks using eager loading loaded SQL mappings, decoupling heavy computation to async workers (Celery/Redis), and optimizing server-side memory via bounded LRU caching.</p>
                  </div>
                </div>
              </div>

              <div className="overlay-anim grid-2" style={{ marginTop: '60px' }}>
                <div>
                  <h3 className="sub-label">Focus Areas</h3>
                  <div className="skills-tags">
                    {['Systems Design', 'Applied ML', 'Data Compliance', 'Information Security'].map((s, i) => (
                      <span key={i} className="skill-tag">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="sub-label">Engineering Rigor</h3>
                  <div className="differentiator-list">
                    <p>→ Theoretical and practical depth from <strong>Adani University</strong> (CSE, AI-ML) and <strong>IIT Madras</strong></p>
                    <p>→ Heavy emphasis on data privacy, secure authentication, and standard compliance (FHIR, HL7)</p>
                    <p>→ Rigorous engineering mindset: profiling latency, optimizing complexity, and writing clean, scalable documentation</p>
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
                          {p.id === 3 && (
                            <div className="project-graphic-ui selene-ui">
                              <div className="shield-ring" />
                              <div className="shield-icon">
                                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                                  <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                                </svg>
                              </div>
                              <div className="crypto-logs">
                                <div className="crypto-log-line">UUID: 4a8b-9e2c-1f5d</div>
                                <div className="crypto-log-line encrypting">CIPHER: 8f9a2e3...</div>
                              </div>
                              <div className="zero-knowledge-badge">AES-256-GCM</div>
                            </div>
                          )}
                          {p.id === 4 && (
                            <div className="project-graphic-ui aion-ui">
                              <div className="terminal-header">
                                <span className="term-dot red" />
                                <span className="term-dot yellow" />
                                <span className="term-dot green" />
                              </div>
                              <div className="terminal-body">
                                <div className="term-line cmd">python train_rl.py</div>
                                <div className="term-line">Warmup: SFT Epoch 3/3 complete</div>
                                <div className="term-line run">REINFORCE policy optimize...</div>
                                <div className="term-line success">Reward: +1.48 (Complexity -30%)</div>
                                <div className="term-line cursor-line">$ <span className="cursor-blink" /></div>
                              </div>
                            </div>
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
              <h2 className="overlay-anim section-title">GET IN TOUCH</h2>
              <p className="overlay-anim contact-sub">I'm actively exploring software engineering roles, research collaborations, and systems work. Let's connect.</p>
              
              {/* Recruiter / Resume Card */}
              <div className="overlay-anim recruiter-box" style={{ marginBottom: '80px' }}>
                <h3 className="sub-label">Opportunities</h3>
                <div className="recruiter-card">
                  <p>I specialize in building secure full-stack applications, ML integrations, and optimizing system performance. If you are looking for an engineer with a strong foundation in computer science and applied systems architecture, let's talk.</p>
                  <div className="recruiter-actions" style={{ marginTop: '24px' }}>
                    <a href="/resume.pdf" target="_blank" rel="noreferrer" className="recruiter-btn clickable">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{marginRight: '8px', verticalAlign: 'middle'}}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
                      DOWNLOAD RESUME / CV
                    </a>
                  </div>
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
        .content-overlay{position:fixed;inset:0;z-index:200;background:var(--bg-overlay);backdrop-filter:blur(40px);-webkit-backdrop-filter:blur(40px)}
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
        .huge-link{font-family:var(--font-display);font-size:clamp(2.5rem,8vw,6rem);font-weight:900;line-height:.9;letter-spacing:-.03em;color:var(--white);transition:color .4s;text-decoration:none}
        .huge-link:hover{color:var(--accent)}
        .contact-small-link{font-size:1.1rem;color:var(--white-dim);transition:color .3s;border-bottom:1px solid transparent;text-decoration:none}
        .contact-small-link:hover{color:var(--white);border-color:var(--white)}

        /* Recruiter Card */
        .recruiter-card{background:rgba(255,255,255,0.02);border:1px solid var(--white-ghost);border-radius:16px;padding:32px;box-shadow:inset 0 0 20px rgba(71,191,255,0.02)}
        .recruiter-card p{color:var(--white-dim);line-height:1.8;font-size:1.02rem;margin:0}
        .recruiter-btn{display:inline-flex;align-items:center;background:var(--accent-secondary);color:#0a0a0a;font-family:var(--font-display);font-weight:700;font-size:0.85rem;letter-spacing:0.1em;border:none;border-radius:30px;padding:14px 28px;text-decoration:none;transition:all 0.3s var(--ease);box-shadow:0 4px 15px rgba(71,191,255,0.2)}
        .recruiter-btn:hover{transform:translateY(-1px);box-shadow:0 6px 20px rgba(71,191,255,0.4);opacity:0.95}

        /* Selene UI */
        .selene-ui{background:linear-gradient(135deg, #0c1812 0%, #060b08 100%);color:#22c55e}
        .shield-ring{position:absolute;width:100px;height:100px;border:1px dashed rgba(34,197,94,0.15);border-radius:50%;animation:spinOrbit 15s linear infinite}
        .shield-icon{position:relative;z-index:2;color:#22c55e;filter:drop-shadow(0 0 8px rgba(34,197,94,0.4));animation:pulseShield 2.5s infinite ease-in-out}
        .crypto-logs{position:absolute;bottom:12px;left:14px;right:14px;font-family:monospace;font-size:0.65rem;color:rgba(34,197,94,0.5);display:flex;flex-direction:column;gap:4px;text-align:left}
        .crypto-log-line{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
        .crypto-log-line.encrypting{animation:encryptText 1.5s infinite alternate}
        .zero-knowledge-badge{position:absolute;top:10px;right:10px;font-family:var(--font-display);font-size:0.65rem;font-weight:700;color:#22c55e;border:1px solid rgba(34,197,94,0.2);padding:4px 8px;border-radius:6px;background:rgba(34,197,94,0.05)}

        /* Aion UI */
        .aion-ui{background:#0a0c10;color:#f0f6fc;flex-direction:column;align-items:stretch;justify-content:flex-start;padding:0;font-family:monospace}
        .terminal-header{height:28px;background:#161b22;border-bottom:1px solid #30363d;display:flex;align-items:center;padding:0 12px;gap:6px;width:100%;box-sizing:border-box}
        .term-dot{width:8px;height:8px;border-radius:50%}
        .term-dot.red{background:#ff5f56}
        .term-dot.yellow{background:#ffbd2e}
        .term-dot.green{background:#27c93f}
        .terminal-body{padding:14px;font-size:0.72rem;display:flex;flex-direction:column;gap:6px;line-height:1.4;text-align:left;width:100%;box-sizing:border-box}
        .term-line{opacity:0.85}
        .term-line.cmd{color:#58a6ff;font-weight:bold}
        .term-line.run{color:#f0883e;animation:aionRunText 1.5s infinite alternate}
        .term-line.success{color:#56d364}
        .cursor-blink{display:inline-block;width:6px;height:12px;background:#f0f6fc;animation:blinkCursor 0.8s infinite;vertical-align:middle}

        @keyframes pulseShield{
          0%, 100%{transform:scale(1);opacity:0.9}
          50%{transform:scale(1.1);opacity:1;filter:drop-shadow(0 0 14px rgba(34,197,94,0.6))}
        }
        @keyframes encryptText{
          0%{color:rgba(34,197,94,0.4)}
          100%{color:rgba(34,197,94,0.85)}
        }
        @keyframes aionRunText{
          0%{opacity:0.6}
          100%{opacity:1}
        }
        @keyframes blinkCursor{
          0%, 100%{opacity:0}
          50%{opacity:1}
        }

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
