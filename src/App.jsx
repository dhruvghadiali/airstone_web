import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import './App.css'

const BlockScene = lazy(() => import('./BlockScene.jsx'))
const chapters = ['The block', 'The detail', 'The bigger picture']
const products = [
  { name: 'Hollow blocks', label: 'Space within. Strength in form.', text: 'Hollow-core masonry for walls and partitions. Select the dimensions and specification that suit your project.', index: 0 },
  { name: 'Solid blocks', label: 'A foundation for possibility.', text: 'A solid masonry format for the spaces you are planning. Match the block specification to your structural design.', index: 1 },
  { name: 'Paving blocks', label: 'Good design. From the ground up.', text: 'Bring paths, courtyards, and outdoor surfaces together with the right format, finish, and laying pattern.', index: 2 },
]

function Arrow() { return <span aria-hidden="true">↗</span> }

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [chapter, setChapter] = useState(0)
  const [paused, setPaused] = useState(false)
  const [variant, setVariant] = useState(0)
  const [rotation, setRotation] = useState(0)
  const storyRef = useRef(null)
  const progressRef = useRef(0)
  const pageRef = useRef(null)

  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const story = storyRef.current
      const rect = story.getBoundingClientRect()
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)))
      progressRef.current = progress
      story.style.setProperty('--story-progress', progress)
      setChapter(progress < .27 ? 0 : progress < .64 ? 1 : 2)
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target) }
      }
    }, { threshold: .12 })
    pageRef.current.querySelectorAll('[data-reveal]').forEach(element => observer.observe(element))
    update()
    return () => {
      cancelAnimationFrame(frame)
      observer.disconnect()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
    }
  }, [])

  function goToChapter(index) {
    const story = storyRef.current
    const positions = [0, .44, .9]
    const start = story.getBoundingClientRect().top + window.scrollY
    const distance = Math.max(0, story.offsetHeight - window.innerHeight)
    window.scrollTo({ top: start + distance * positions[index], behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' })
  }

  function inspectProduct(index) {
    setVariant(index)
    goToChapter(0)
  }

  return <div ref={pageRef}>
    <a className="skip-link" href="#materials">Skip to materials</a>
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label="Airstone home"><span className="wordmark-icon" aria-hidden="true">a.</span>airstone</a>
      <nav className={menuOpen ? 'site-nav is-open' : 'site-nav'} id="site-navigation" aria-label="Main navigation" onClick={() => setMenuOpen(false)}>
        <a href="#materials">Materials</a><a href="#approach">Our approach</a><a href="#applications">Applications</a>
      </nav>
      <a className="nav-action" href="#materials">Explore the range <Arrow /></a>
      <button className="menu-toggle" aria-controls="site-navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? 'Close' : 'Menu'}</button>
    </header>

    <main>
      <section className="scroll-story" id="home" ref={storyRef} aria-label="From a single block to a complete assembly">
        <div className={`story-viewport chapter-${chapter}`}>
          <div className="stage-grid" aria-hidden="true" />
          <div className="stage-topline"><span>BUILDING MATERIALS. REIMAGINED.</span><span>FORM / FUNCTION / FUTURE</span></div>
          <div className="stage-watermark" aria-hidden="true">airstone</div>
          <div className="scene-wrap">
            <Suspense fallback={<div className="scene-loading" role="status">Preparing the material study…</div>}>
              <BlockScene progressRef={progressRef} paused={paused} variant={variant} rotation={rotation} />
            </Suspense>
          </div>
          <div className="stage-copy" key={chapter}>
            <p className="eyebrow"><span className="orange-square" />{['A NEW PERSPECTIVE ON BUILDING', 'CONSIDERED FROM EVERY ANGLE', 'SMALL BEGINNINGS. BIG POSSIBILITIES.'][chapter]}</p>
            {chapter === 0 ? <h1>A solid start.<br />A different<br /> <em>future.</em></h1> : <h2>{chapter === 1 ? <>Every detail.<br />Works <em>harder.</em></> : <>Better blocks.<br />Bigger <em>ideas.</em></>}</h2>}
            <p className="stage-description">{[
              'It starts with a block. It becomes a home, a place to grow, a whole new possibility.',
              'Look closer. Explore the form, the texture, and the possibilities held within a single building block.',
              'Individual by design. Stronger as a whole. Bring your next space to life, one block at a time.',
            ][chapter]}</p>
            <a className="button button-black" href="#materials">Meet your building blocks <Arrow /></a>
          </div>
          <div className="object-annotation"><span className="annotation-line" /><span>0{variant + 1} — {products[variant].name.toUpperCase()}<small>MATERIAL EXPLORATION</small></span></div>
          <div className="rotation-hint"><button aria-label="Rotate blocks left" onClick={() => setRotation(value => value - .35)}>←</button><span>EXPLORE EVERY ANGLE</span><button aria-label="Rotate blocks right" onClick={() => setRotation(value => value + .35)}>→</button></div>
          <div className="model-selector" aria-label="Choose a block to view">{products.map((product, index) => <button key={product.name} aria-pressed={variant === index} onClick={() => setVariant(index)}><span>0{index + 1}</span>{product.name}</button>)}</div>
          <div className="stage-bottom"><button className="scroll-prompt" onClick={() => chapter < 2 ? goToChapter(chapter + 1) : document.getElementById('materials').scrollIntoView({ behavior: 'smooth' })}><span aria-hidden="true">↓</span>{chapter < 2 ? 'SCROLL TO TRANSFORM' : 'EXPLORE THE MATERIALS'}</button><div className="chapter-navigation" aria-label="Animation chapters">{chapters.map((label, index) => <button key={label} aria-label={label} aria-current={chapter === index ? 'step' : undefined} onClick={() => goToChapter(index)}>0{index + 1}<span>{label}</span></button>)}</div><button className="motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? '↻ Resume motion' : 'Ⅱ Pause motion'}</button></div>
          <div className="story-progress" aria-hidden="true" />
        </div>
      </section>

      <section className="materials-section section-pad" id="materials">
        <div className="section-intro" data-reveal><p className="eyebrow">01 / THE COLLECTION</p><div><h2>Beautifully simple.<br /><span>Quietly essential.</span></h2><p>Different forms. A shared purpose.<br />Find the starting point for your next build.</p></div></div>
        <div className="product-list">{products.map((product,index) => <article className="product-row" key={product.name} data-reveal><span className="product-number">0{index + 1}</span><div className="product-name"><h3>{product.name}</h3><p>{product.label}</p></div><details><summary>About this block <span aria-hidden="true">+</span></summary><p>{product.text}</p></details><button className="round-button" aria-label={`View ${product.name} in 3D`} onClick={() => inspectProduct(index)}><Arrow /></button></article>)}</div>
      </section>

      <section className="approach-section section-pad" id="approach">
        <div className="approach-image" data-reveal><img src="/blocks-hero.png" alt="Close-up of concrete block textures and hollow-core construction" loading="lazy" width="1536" height="1024" /><span>THE MATERIAL. UP CLOSE.</span></div>
        <div className="approach-copy" data-reveal><p className="eyebrow">02 / OUR APPROACH</p><h2>Great spaces<br />start with<br /><em>the essentials.</em></h2><p>Before the first wall. Before the finishing touches. There is a material choice that shapes everything that follows.</p><p>At Airstone, that is where our story begins. With blocks made to become part of something bigger.</p><a className="text-link" href="#materials">Discover the collection <Arrow /></a></div>
      </section>

      <section className="applications-section section-pad" id="applications">
        <div className="section-intro" data-reveal><p className="eyebrow">03 / OPEN POSSIBILITIES</p><div><h2>For the world<br /><span>you’re building.</span></h2><p>From personal spaces to shared places.<br />Give your ideas a place to take shape.</p></div></div>
        <div className="application-grid">{[
          ['01', 'Residential.', 'Places to call your own.', 'Homes, partitions, and boundary walls. The beginnings of everyday life.'],
          ['02', 'Commercial.', 'Make room for what’s next.', 'Workplaces and retail spaces. Built around the way we connect and grow.'],
          ['03', 'Landscape.', 'Take the possibilities outside.', 'Paths, courtyards, and open spaces. A considered finish, underfoot.'],
        ].map(([number,title,label,text]) => <article className="application" key={number} data-reveal><span className="application-index">{number}</span><p className="eyebrow">{label}</p><h3>{title}</h3><p>{text}</p><a href="#materials" aria-label={`Explore blocks for ${title}`}>Explore materials <Arrow /></a></article>)}</div>
      </section>
      <section className="closing-section section-pad" data-reveal><p className="eyebrow">EVERY GREAT BUILD STARTS SOMEWHERE.</p><h2>Let’s make<br /><em>something solid.</em></h2><a className="button button-black" href="#materials">Find your starting point <Arrow /></a><span className="closing-symbol" aria-hidden="true">↗</span></section>
    </main>
    <footer className="site-footer"><a className="wordmark" href="#home">airstone</a><p>Building possibilities. Block by block.</p><a href="#home">Back to top ↑</a><span>© {new Date().getFullYear()} Airstone</span></footer>
  </div>
}
