import { useState, useEffect, useRef } from 'react'
import profileImg from './assets/prathmesh.png'
import './App.css'

/* ─────────────────────────────────────────
   DATA
───────────────────────────────────────── */
const skills = [
  {
    icon: '💻',
    title: 'Programming Languages',
    tags: ['Java', 'Python', 'SQL', 'C', 'C++'],
  },
  {
    icon: '🌐',
    title: 'Web Technologies',
    tags: ['HTML', 'CSS', 'JavaScript', 'React.js'],
  },
  {
    icon: '⚙️',
    title: 'Frameworks & Database',
    tags: ['Spring Boot', 'MySQL', 'RESTful APIs', 'JWT Auth'],
  },
  {
    icon: '🛠️',
    title: 'Tools & IDEs',
    tags: ['Eclipse', 'VS Code', 'IntelliJ IDEA', 'Postman', 'Git'],
  },
]

const projects = [
  {
    icon: '🍽️',
    num: '01',
    title: 'Mess Finder',
    tech: ['React.js', 'Spring Boot', 'MySQL', 'JWT'],
    description:
      'A full-stack web application enabling users to discover and book nearby home-style mess services through location-based search.',
    features: [
      'Implemented RESTful APIs using Spring Boot for all business logic',
      'JWT-based authentication for secure user access',
      'Menu browsing, occupancy checks, and table booking features',
      'Owner dashboard for managing menus, pricing, and availability',
    ],
  },
  {
    icon: '📝',
    num: '02',
    title: 'EasyQuiz – Exam Management',
    tech: ['Java', 'Swing/AWT', 'MySQL'],
    description:
      'A desktop-based exam management system to streamline creating, managing, and conducting quizzes in educational and training environments.',
    features: [
      'Java backend logic with Swing/AWT graphical user interface',
      'MySQL for persistent data storage',
      'Scalable, paperless solution for online assessment management',
    ],
  },
  {
    icon: '📚',
    num: '03',
    title: 'Books & Education Website',
    tech: ['HTML', 'CSS', 'JavaScript'],
    description:
      'An educational platform to support students from diverse backgrounds in showcasing their talents and tracking academic progress.',
    features: [
      'Structured, user-friendly interface using core web technologies',
      'Student talent showcase and academic progress tracking',
    ],
  },
]

const education = [
  {
    icon: '🎓',
    degree: 'Master of Computer Applications (MCA)',
    school: 'Pimpri Chinchwad University, Pune',
    year: '2024 – 2026',
    grade: 'CGPA: 7.83',
  },
  {
    icon: '🏫',
    degree: 'Bachelor of Computer Applications (BCA)',
    school: 'Dhananjayrao Gadgil College of Commerce, Satara',
    year: '2021 – 2024',
    grade: 'CGPA: 8.24',
  },
  {
    icon: '📖',
    degree: 'Class XII',
    school: 'Lal Bahadur Shastri College, Satara',
    year: '2019 – 2021',
    grade: '63%',
  },
]

const certs = [
  { icon: '🤖', title: 'Prompt Engineering for ChatGPT', issuer: 'Coursera' },
  { icon: '🧠', title: 'Machine Learning Introduction', issuer: 'IBM' },
]

/* ─────────────────────────────────────────
   HOOK – Intersection Observer for reveal
───────────────────────────────────────── */
function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add('visible')),
      { threshold: 0.12 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

/* ─────────────────────────────────────────
   HOOK – Typed text effect
───────────────────────────────────────── */
function useTyped(words, speed = 100, pause = 1800) {
  const [text, setText] = useState('')
  const [idx, setIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const current = words[idx % words.length]
    const timeout = setTimeout(
      () => {
        if (!deleting) {
          setText(current.slice(0, text.length + 1))
          if (text.length + 1 === current.length) {
            setTimeout(() => setDeleting(true), pause)
          }
        } else {
          setText(current.slice(0, text.length - 1))
          if (text.length - 1 === 0) {
            setDeleting(false)
            setIdx((i) => i + 1)
          }
        }
      },
      deleting ? speed / 2 : speed
    )
    return () => clearTimeout(timeout)
  }, [text, deleting, idx, words, speed, pause])

  return text
}

/* ─────────────────────────────────────────
   PARTICLES
───────────────────────────────────────── */
function Particles() {
  const particles = Array.from({ length: 18 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    size: `${Math.random() * 4 + 2}px`,
    duration: `${Math.random() * 15 + 10}s`,
    delay: `${Math.random() * 10}s`,
    opacity: Math.random() * 0.5 + 0.2,
  }))

  return (
    <div className="particles">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-10px',
            width: p.size,
            height: p.size,
            animationDuration: p.duration,
            animationDelay: p.delay,
            opacity: p.opacity,
            background: p.id % 3 === 0 ? '#a78bfa' : p.id % 3 === 1 ? '#6c63ff' : '#f50057',
          }}
        />
      ))}
    </div>
  )
}

/* ─────────────────────────────────────────
   NAVBAR
───────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = ['About', 'Skills', 'Projects', 'Education', 'Contact']

  const handleNav = (e, id) => {
    e.preventDefault()
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
    setMenuOpen(false)
  }

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">PY.</div>
        <ul className="nav-links">
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} onClick={(e) => handleNav(e, l)}>
                {l}
              </a>
            </li>
          ))}
        </ul>
        <div
          className={`hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span />
          <span />
          <span />
        </div>
      </nav>
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {links.map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} onClick={(e) => handleNav(e, l)}>
            {l}
          </a>
        ))}
      </div>
    </>
  )
}

/* ─────────────────────────────────────────
   HERO
───────────────────────────────────────── */
function Hero() {
  const typed = useTyped(['Full Stack Developer', 'Web Developer', 'Java Developer', 'Spring Boot Dev'])

  return (
    <section className="hero" id="home">
      <div className="hero-bg" />
      <Particles />
      <div className="hero-content">
        <div className="hero-text">
          <p className="hero-greeting">Open to Full-Time & Intership Roles</p>
          <h1 className="hero-name">
            I'm <span className="highlight">Prathmesh</span>
            <br />
            Uday Yadav
          </h1>
          <p className="hero-role">
            <span className="typed">{typed}</span>
            <span style={{ borderRight: '2px solid #a78bfa', marginLeft: 2, animation: 'blink 0.8s step-end infinite' }} />
          </p>
          <p className="hero-description">
            MCA graduate with hands-on experience in full-stack application development using Java, Spring Boot, React,
            and MySQL. Passionate about building clean, scalable web applications.
          </p>
          <div className="hero-btns">
            <a className="btn-primary" href="#contact" onClick={(e) => {
              e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
            }}>
              💬 Get In Touch
            </a>
            <a
              className="btn-secondary"
              href="/Prathmesh-Yadav-Resume.pdf"
              download="Prathmesh-Yadav-Resume.pdf"
            >
              📄 Download Resume
            </a>
          </div>
          <div className="hero-social">
            <a
              href="https://www.linkedin.com/in/prathmesh-yadav-79a26430a"
              target="_blank"
              rel="noopener noreferrer"
              className="social-link"
              aria-label="LinkedIn"
            >
              in
            </a>
            <a href="mailto:prathmeshuy20@gmail.com" className="social-link" aria-label="Email">
              ✉
            </a>
            <a href="tel:+918208130733" className="social-link" aria-label="Phone">
              📞
            </a>
          </div>
        </div>
        <div className="hero-image-wrap">
          <div className="hero-image-container">
            <div className="hero-image-ring" />
            <img src={profileImg} alt="Prathmesh Uday Yadav" className="hero-img" />
          </div>
        </div>
      </div>
      <div className="scroll-down">
        <span>Scroll</span>
        <div className="arrow" />
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   ABOUT
───────────────────────────────────────── */
function About() {
  return (
    <section className="section" id="about">
      <h2 className="section-title reveal">
        About <span>Me</span>
      </h2>
      <div className="about-grid">
        <div className="about-image-wrap reveal">
          <div className="about-img-container">
            <img src={profileImg} alt="Prathmesh Uday Yadav" className="about-img" />
            <div className="about-img-badge">
              MCA Graduate<br />
              <span style={{ fontSize: '0.75rem', opacity: 0.85 }}>Pune, India</span>
            </div>
          </div>
        </div>
        <div className="about-text reveal">
          <h3>Full Stack Developer & MCA Student</h3>
          <p>
            I'm Prathmesh Uday Yadav, a recent MCA graduate from Pimpri Chinchwad University with a
            strong foundation in full-stack web development. I enjoy turning complex problems into
            elegant, user-friendly solutions.
          </p>
          <p>
            My expertise spans Java, Spring Boot, and React.js, enabling me to build end-to-end
            applications, from RESTful backends to polished frontends. I'm proficient in JWT
            authentication, MySQL database management, and development tools such as Postman, Git, and
            IntelliJ IDEA.
          </p>
          <p>
            I'm a self-learner who thrives in fast-paced environments and enjoys picking up new technologies
            independently to deliver impactful solutions.
          </p>
          <div className="about-info">
            <div className="info-item">
              <span className="info-label">Name</span>
              <span className="info-value">Prathmesh Uday Yadav</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">prathmeshuy20@gmail.com</span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">+91 8208130733</span>
            </div>
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">Satara, Maharashtra</span>
            </div>
            <div className="info-item">
              <span className="info-label">Degree</span>
              <span className="info-value">MCA (2024 – 2026)</span>
            </div>
            <div className="info-item">
              <span className="info-label">Status</span>
              <span className="info-value" style={{ color: '#4ade80' }}>Open to Work ✓</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   SKILLS
───────────────────────────────────────── */
function Skills() {
  return (
    <section className="section skills-section" id="skills">
      <h2 className="section-title reveal">
        Technical <span>Skills</span>
      </h2>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <div
            className="skill-card reveal"
            key={s.title}
            style={{ transitionDelay: `${i * 0.1}s` }}
          >
            <div className="skill-card-icon">{s.icon}</div>
            <h3>{s.title}</h3>
            <div className="skill-tags">
              {s.tags.map((t) => (
                <span className="skill-tag" key={t}>{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   PROJECTS
───────────────────────────────────────── */
function Projects() {
  return (
    <section className="section" id="projects">
      <h2 className="section-title reveal">
        My <span>Projects</span>
      </h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            className="project-card reveal"
            key={p.title}
            style={{ transitionDelay: `${i * 0.12}s` }}
          >
            <div className="project-header">
              <div className="project-icon">{p.icon}</div>
              <div className="project-num">{p.num}</div>
            </div>
            <div className="project-body">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <div className="project-tech">
                {p.tech.map((t) => (
                  <span className="tech-badge" key={t}>{t}</span>
                ))}
              </div>
              <ul className="project-features">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   EDUCATION
───────────────────────────────────────── */
function Education() {
  return (
    <section className="section edu-section" id="education">
      <h2 className="section-title reveal">
        <span>Education</span>
      </h2>
      <div className="edu-timeline">
        {education.map((e, i) => (
          <div
            className="edu-item reveal"
            key={e.degree}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="edu-dot">{e.icon}</div>
            <div className="edu-card">
              <h3>{e.degree}</h3>
              <p className="school">{e.school}</p>
              <div className="edu-meta">
                <span>📅 {e.year}</span>
                <span className="cgpa">🏆 {e.grade}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CERTIFICATIONS
───────────────────────────────────────── */
function Certifications() {
  return (
    <section className="section" id="certifications">
      <h2 className="section-title reveal">
        <span>Certifications</span>
      </h2>
      <div className="certs-grid">
        {certs.map((c, i) => (
          <div
            className="cert-card reveal"
            key={c.title}
            style={{ transitionDelay: `${i * 0.15}s` }}
          >
            <div className="cert-icon">{c.icon}</div>
            <div className="cert-info">
              <h3>{c.title}</h3>
              <p>{c.issuer}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   CONTACT
───────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // In a real app, send to a backend / email service
    setSent(true)
    setForm({ name: '', email: '', subject: '', message: '' })
    setTimeout(() => setSent(false), 4000)
  }

  return (
    <section className="section contact-section" id="contact">
      <h2 className="section-title reveal">
        Get In <span>Touch</span>
      </h2>
      <div className="contact-wrapper">
        <div className="contact-info reveal">
          <h3>Let's Work Together</h3>
          <p>
            I'm currently looking for entry-level opportunities in full-stack development. Whether you have a project
            in mind or just want to say hi, my inbox is always open!
          </p>
          <div className="contact-items">
            <a href="mailto:prathmeshuy20@gmail.com" className="contact-item">
              <div className="contact-item-icon">✉️</div>
              <div className="contact-item-text">
                <span>Email</span>
                <strong>prathmeshuy20@gmail.com</strong>
              </div>
            </a>
            <a href="tel:+918208130733" className="contact-item">
              <div className="contact-item-icon">📞</div>
              <div className="contact-item-text">
                <span>Phone</span>
                <strong>+91 8208130733</strong>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/prathmesh-yadav-79a26430a"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-item"
            >
              <div className="contact-item-icon">💼</div>
              <div className="contact-item-text">
                <span>LinkedIn</span>
                <strong>prathmesh-yadav-79a26430a</strong>
              </div>
            </a>
            <div className="contact-item">
              <div className="contact-item-icon">📍</div>
              <div className="contact-item-text">
                <span>Location</span>
                <strong>Satara, Maharashtra 415002</strong>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form reveal" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                id="name" name="name" type="text" placeholder="Your name"
                value={form.name} onChange={handleChange} required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                id="email" name="email" type="email" placeholder="your@email.com"
                value={form.email} onChange={handleChange} required
              />
            </div>
          </div>
          <div className="form-group">
            <label htmlFor="subject">Subject</label>
            <input
              id="subject" name="subject" type="text" placeholder="What's this about?"
              value={form.subject} onChange={handleChange} required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message" name="message" rows={5} placeholder="Tell me about your project or opportunity..."
              value={form.message} onChange={handleChange} required
            />
          </div>
          {sent && <div className="form-success">✅ Message sent! I'll get back to you soon.</div>}
          <button type="submit" className="btn-submit">
            Send Message 🚀
          </button>
        </form>
      </div>
    </section>
  )
}

/* ─────────────────────────────────────────
   FOOTER
───────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo">PY.</div>
        <div className="footer-links">
          {['About', 'Skills', 'Projects', 'Education', 'Contact'].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(l.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
              }}
            >
              {l}
            </a>
          ))}
        </div>
        <p>© {new Date().getFullYear()} Prathmesh Uday Yadav. Built with React ⚛️</p>
      </div>
    </footer>
  )
}

/* ─────────────────────────────────────────
   APP
───────────────────────────────────────── */
export default function App() {
  useReveal()

  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Education />
      <Certifications />
      <Contact />
      <Footer />
    </>
  )
}
