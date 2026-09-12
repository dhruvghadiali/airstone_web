import { useEffect, useRef, useState } from 'react'
import './App.css'

const stages = [
  { label: '01 / THE MATERIAL', title: 'Strength begins\nwithin.', copy: 'A closer look at the material behind every wall, every space, and every new beginning.' },
  { label: '02 / THE FORM', title: 'Purpose in\nevery detail.', copy: 'A simple, versatile form. Ready to become part of something much bigger.' },
  { label: '03 / THE POSSIBILITIES', title: 'Your vision.\nTaking shape.', copy: 'From a first home to a shared outdoor space. Build your next chapter, block by block.' },
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [stage, setStage] = useState(0)
  const storyRef = useRef(null)
  const pageRef = useRef(null)

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const story = storyRef.current
    let frame = 0
    const update = () => {
      frame = 0
      if (!story) return
      const rect = story.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)))
      story.style.setProperty('--progress', motion.matches ? 0 : progress)
      setStage(Math.min(2, Math.floor(progress * 3)))
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    motion.addEventListener('change', schedule)
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target) }
    }), { threshold: 0.12 })
    pageRef.current.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))
    update()
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      motion.removeEventListener('change', schedule)
      observer.disconnect()
    }
  }, [])

  function jumpToStage(index) {
    const story = storyRef.current
    const travel = Math.max(0, story.offsetHeight - window.innerHeight)
    const storyTop = story.getBoundingClientRect().top + window.scrollY
    window.scrollTo({ top: storyTop + travel * ((index + 0.45) / 3), behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }
  return <>
    <a className="skip-link" href="#main">Skip to content</a>
    <header className="header">
      <a className="brand" href="#" aria-label="Airstone home"><span className="brand-mark" aria-hidden="true">a</span>airstone</a>
      <button className="menu-toggle" aria-expanded={menuOpen} aria-controls="navigation" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
      <nav id="navigation" className={menuOpen ? 'navigation open' : 'navigation'} aria-label="Main navigation" onClick={() => setMenuOpen(false)}><a href="#materials">Our blocks</a><a href="#process">Our approach</a><a href="#applications">Applications</a></nav>
      <a className="header-cta" href="#materials">Explore materials <span aria-hidden="true">↗</span></a>
    </header>
    <main id="main" ref={pageRef}>
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-topline"><span>THE FOUNDATION OF SOMETHING GREAT.</span><span>BLOCK BY BLOCK.</span></div>
        <div className="hero-copy"><p className="eyebrow"><span /> MADE TO BUILD. BUILT TO LAST.</p><h1 id="hero-title">Great spaces.<br />Start with<br /><em>better blocks.</em></h1><p className="hero-description">From the walls around us to the paths ahead.<br />Building blocks for a world taking shape.</p><a className="button button-lime" href="#materials">Discover our blocks <span aria-hidden="true">↗</span></a></div>
        <div className="hero-visual"><img src="/blocks-hero.png" alt="A sculptural stack of gray concrete solid and hollow blocks" fetchPriority="high" width="1536" height="1024" /><span className="visual-label">FORM. FUNCTION. FOUNDATION.</span></div>
        <div className="hero-bottom"><a href="#process" className="scroll-cue"><span aria-hidden="true">↓</span> SCROLL TO BUILD</a><p>A simple block.<br />Extraordinary possibilities.</p><span className="hero-index">01 — 03</span></div>
      </section>
      <section className="intro" id="materials"><p className="eyebrow">01 / THE BUILDING BLOCKS</p><div className="intro-heading" data-reveal><h2>Big ideas begin<br />with a <em>solid foundation.</em></h2><p>Materials that belong at the heart of your next space. Explore blocks for walls, outdoor surfaces, and everything in between.</p></div>
        <div className="material-list" data-reveal>
          {[
            ['01', 'Solid blocks', 'A solid starting point.', 'For masonry walls and partitions. Choose the block specification to suit the structure, design, and engineering requirements of your project.'],
            ['02', 'Hollow blocks', 'Space within. Possibility beyond.', 'A hollow-core format for masonry applications. Block size, wall design, and reinforcement should be selected with your project engineer.'],
            ['03', 'Paving blocks', 'Make a lasting first impression.', 'For walkways, courtyards, and landscape surfaces. The right format, finish, and laying pattern help bring an outdoor space together.'],
          ].map(([number, name, tagline, description]) => <details className="material" key={name}><summary><span className="material-number">{number}</span><h3>{name}</h3><span className="material-tagline">{tagline}</span><span className="material-toggle" aria-hidden="true">+</span></summary><p>{description}</p></details>)}
        </div>
      </section>
      <section className="story" id="process" ref={storyRef} aria-label="The Airstone material story">
        <div className="story-sticky">
          <div className="story-top"><p className="eyebrow">02 / A CLOSER LOOK</p><span>THE ART OF BUILDING BETTER</span></div>
          <div className="story-art" aria-hidden="true"><img src="/blocks-hero.png" alt="" width="1536" height="1024" loading="lazy" /></div>
          <div className="story-copy" key={stage}><span className="eyebrow">{stages[stage].label}</span><h2>{stages[stage].title}</h2><p>{stages[stage].copy}</p></div>
          <span className="story-caption">AIRSTONE / MATERIAL STUDY</span>
          <div className="story-controls" aria-label="Material story chapters">{stages.map((item,index) => <button key={item.label} aria-current={stage === index ? 'step' : undefined} onClick={() => jumpToStage(index)}><span>0{index+1}</span><span>{['Material', 'Form', 'Possibilities'][index]}</span><i /></button>)}</div>
        </div>
      </section>
      <section className="applications" id="applications"><div className="section-heading" data-reveal><p className="eyebrow">03 / BUILT AROUND YOUR WORLD</p><h2>One material.<br /><em>Many possibilities.</em></h2></div><div className="application-grid">
        {[
          ['01', 'Places to live.', 'Residential', 'The beginnings of a home. Walls, boundaries, and spaces made for everyday life.'],
          ['02', 'Room to grow.', 'Commercial', 'Spaces for new ideas. Offices, retail, and the places where business happens.'],
          ['03', 'Paths to connect.', 'Outdoors', 'Courtyards, walkways, and open spaces that bring people together.'],
        ].map(([number,title,label,description]) => <article className="application-card" key={number} data-reveal><span className="application-number">{number}</span><p className="eyebrow">{label}</p><h3>{title}</h3><p>{description}</p><a href="#materials">Explore the blocks <span aria-hidden="true">↗</span></a></article>)}
      </div></section>
      <section className="closing" data-reveal><p className="eyebrow">EVERY GREAT BUILD STARTS SOMEWHERE.</p><h2>What will you<br /><em>build next?</em></h2><a className="button button-dark" href="#materials">Find your building block <span aria-hidden="true">↗</span></a><span className="closing-note">Good things are built together.</span></section>
    </main>
    <footer className="footer"><a className="brand" href="#">airstone</a><p>Building possibilities. Block by block.</p><a href="#">Back to top ↑</a><span>© {new Date().getFullYear()} Airstone</span></footer>
  </>
}

export default App
