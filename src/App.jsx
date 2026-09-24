import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowDown, ArrowRight, BriefcaseBusiness, ChevronRight, Code2,
  ExternalLink, GitBranch, Mail, MapPin, Menu, Sparkles, X,
} from 'lucide-react'
import { portfolio, projects } from './data/portfolioData'

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.55, ease: [0.21, 0.47, 0.32, 0.98] },
}

function Nav() {
  const [open, setOpen] = useState(false)
  const links = ['About', 'Work', 'Contact']
  return (
    <header className="site-header">
      <a href="#top" className="monogram" aria-label="Back to top">VG</a>
      <nav className={open ? 'nav-links open' : 'nav-links'}>
        {links.map((link) => <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setOpen(false)}>{link}</a>)}
      </nav>
      <div className="nav-actions">
        <button className="menu-button" onClick={() => setOpen(!open)} aria-label="Toggle menu">{open ? <X /> : <Menu />}</button>
      </div>
    </header>
  )
}

function Hero() {
  const { profile } = portfolio
  return (
    <section id="top" className="hero section-shell">
      <motion.div {...fadeUp} className="hero-copy">
        <p className="eyebrow"><span className="status-dot" />{profile.eyebrow}</p>
        <h1>{profile.title}</h1>
        <p className="hero-lede">{profile.valueProposition}</p>
        <div className="hero-actions">
          <a href="#work" className="button primary">Explore selected work <ArrowDown size={16} /></a>
          <a href={`mailto:${profile.email}`} className="button secondary">Start a conversation <ArrowRight size={16} /></a>
        </div>
        <div className="social-row">
          <a href={profile.social.github} target="_blank" rel="noreferrer"><GitBranch size={17} /> GitHub</a>
          <a href={profile.social.linkedin} target="_blank" rel="noreferrer"><BriefcaseBusiness size={17} /> LinkedIn</a>
          <span><MapPin size={17} /> {profile.location}</span>
        </div>
      </motion.div>
      <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.12 }} className="profile-card">
        <img src="/profile-website.jpg" alt={`${profile.name}, MS Business Analytics student`} />
        <div className="profile-caption"><span>{profile.name}</span><small>Analytics · Strategy · Product</small></div>
      </motion.div>
    </section>
  )
}

function About() {
  return (
    <section id="about" className="section-shell about-section">
      <motion.div {...fadeUp} className="section-label"><span>01</span> About</motion.div>
      <motion.div {...fadeUp} className="about-grid">
        <h2>{portfolio.about.heading}</h2>
        <div className="about-copy">
          {portfolio.about.paragraphs.map((text) => <p key={text}>{text}</p>)}
          <div className="skill-list">{portfolio.about.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>
        </div>
      </motion.div>
    </section>
  )
}

function ProjectVisual({ project }) {
  if (project.image) return <img src={project.image} alt={`${project.title} project visual`} style={{ objectPosition: project.imagePosition || 'center' }} loading="lazy" />
  return (
    <div className="coded-visual" aria-label="ShopAmi abstract interface preview">
      <Sparkles size={28} /><span>SHOP</span><strong>ami</strong><div /><div /><div />
    </div>
  )
}

function ProjectCard({ project, onOpen, index }) {
  return (
    <motion.article {...fadeUp} transition={{ ...fadeUp.transition, delay: Math.min(index * 0.04, 0.2) }} className={`project-card ${project.featured ? 'featured' : ''}`}>
      <button className="card-hit" onClick={() => onOpen(project)} aria-label={`View ${project.title} case study`} />
      <div className="project-image"><ProjectVisual project={project} /><span className="year-chip">{project.year}</span></div>
      <div className="project-body">
        <div className="card-topline"><span className="category-pill">{project.category}</span><span className="status-text">{project.status}</span></div>
        <h3>{project.title}</h3><p className="project-subtitle">{project.subtitle}</p>
        <p className="project-summary">{project.summary}</p>
        <div className="impact-row">
          {project.impact.slice(0, 3).map((item) => <div key={item.label}><strong>{item.value}</strong><small>{item.label}</small></div>)}
        </div>
        <div className="card-footer"><div className="tech-preview">{project.tech.slice(0, 3).map((tech) => <span key={tech}>{tech}</span>)}</div><ChevronRight size={20} /></div>
      </div>
    </motion.article>
  )
}

function Projects({ onOpen }) {
  const [filter, setFilter] = useState('All work')
  const visible = useMemo(() => filter === 'All work' ? projects : projects.filter((project) => project.category === filter), [filter])
  return (
    <section id="work" className="section-shell work-section">
      <motion.div {...fadeUp} className="work-heading">
        <div className="section-label"><span>02</span> Selected work</div>
        <div><h2>Models, Markets, and Products.</h2><p>Click any project for the question, method, findings, and source visual.</p></div>
      </motion.div>
      <motion.div {...fadeUp} className="filter-row" role="tablist" aria-label="Project categories">
        {portfolio.categories.map((category) => (
          <button role="tab" aria-selected={filter === category} className={filter === category ? 'active' : ''} onClick={() => setFilter(category)} key={category}>{category}</button>
        ))}
        <span className="project-count">{visible.length.toString().padStart(2, '0')} projects</span>
      </motion.div>
      <div className="project-grid"><AnimatePresence mode="popLayout">{visible.map((project, index) => <ProjectCard key={project.id} project={project} onOpen={onOpen} index={index} />)}</AnimatePresence></div>
    </section>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const listener = (event) => event.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', listener)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', listener) }
  }, [onClose])
  return (
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={onClose}>
      <motion.aside className="project-modal" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', stiffness: 290, damping: 32 }} onMouseDown={(event) => event.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close project"><X /></button>
        <div className="modal-visual"><ProjectVisual project={project} /></div>
        <div className="modal-content">
          <div className="card-topline"><span className="category-pill">{project.category}</span><span className="status-text">{project.year} · {project.status}</span></div>
          <h2>{project.title}</h2><p className="modal-subtitle">{project.subtitle}</p>
          <div className="modal-metrics">{project.impact.map((item) => <div key={item.label}><strong>{item.value}</strong><small>{item.label}</small></div>)}</div>
          <div className="case-section"><span>Problem</span><p>{project.problem}</p></div>
          <div className="case-section"><span>Method</span><p>{project.methodology}</p></div>
          <div className="case-section"><span>Key findings</span><ul>{project.findings.map((finding) => <li key={finding}>{finding}</li>)}</ul></div>
          <div className="modal-tech">{project.tech.map((tech) => <span key={tech}>{tech}</span>)}</div>
          <p className="visual-caption">Source visual: {project.visualCaption}</p>
          {project.links.length > 0 && <div className="modal-links">{project.links.map((link) => <a href={link.url} target="_blank" rel="noreferrer" className="button primary" key={link.url}>{link.label}<ExternalLink size={16} /></a>)}</div>}
        </div>
      </motion.aside>
    </motion.div>
  )
}

function Contact() {
  const { profile } = portfolio
  return (
    <section id="contact" className="contact-section">
      <motion.div {...fadeUp} className="section-shell contact-inner">
        <div className="section-label"><span>03</span> Contact</div>
        <div className="contact-grid">
          <div><p className="eyebrow"><span className="status-dot" />{profile.availability}</p><h2>Let’s Make Better Decisions.</h2></div>
          <div className="contact-actions">
            <a href={`mailto:${profile.email}`} className="contact-link"><span><Mail size={20} />Email</span><strong>{profile.email}</strong><ArrowRight /></a>
            <a href={profile.social.linkedin} target="_blank" rel="noreferrer" className="contact-link"><span><ExternalLink size={20} />LinkedIn</span><strong>Connect professionally</strong><ArrowRight /></a>
            <a href={profile.social.github} target="_blank" rel="noreferrer" className="contact-link"><span><Code2 size={20} />GitHub</span><strong>Explore the code</strong><ArrowRight /></a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function Footer() {
  return <footer className="section-shell"><span>© {new Date().getFullYear()} {portfolio.profile.name}</span><span>Designed for decisions · Built with React</span><a href="#top">Back to top ↑</a></footer>
}

export default function App() {
  const [selected, setSelected] = useState(null)
  return <><Nav /><main><Hero /><About /><Projects onOpen={setSelected} /><Contact /></main><Footer /><AnimatePresence>{selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}</AnimatePresence></>
}
