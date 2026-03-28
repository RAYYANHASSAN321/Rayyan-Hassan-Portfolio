import { useState, useEffect } from 'react';
import profileImg from './assets/profile.png';

// React Icons
import {
  FiSun, FiMoon, FiMenu, FiX, FiChevronDown,
  FiGithub, FiLinkedin, FiMail, FiMapPin, FiClock,
  FiExternalLink, FiCode, FiDownload, FiArrowUp,
  FiSend, FiCheckCircle, FiLayers, FiBriefcase,
  FiBookOpen, FiMonitor, FiServer, FiDatabase,
  FiTool, FiSmartphone, FiCpu, FiGlobe,
} from 'react-icons/fi';
import {
  FaGraduationCap, FaPaw, FaPlane, FaMap,
  FaHotel, FaPython, FaParking, FaAmbulance,
  FaCalendarAlt, FaShoppingBag, FaLeaf, FaRobot,
  FaGithub, FaLinkedin, FaStar, FaCodeBranch, FaUsers,
  FaFolderOpen,
} from 'react-icons/fa';
import {
  SiFlutter, SiFirebase, SiPhp, SiMysql, SiFlask,
} from 'react-icons/si';
import { BsLightningCharge, BsGraphUp, BsShieldCheck } from 'react-icons/bs';
import { MdOutlineWorkOutline, MdLocationOn, MdEmail } from 'react-icons/md';
import { IoSparklesOutline, IoRocketOutline, IoLocationOutline } from 'react-icons/io5';

import './index.css';
import './App.css';

/* ====== DATA ====== */
const NAV_LINKS = [
  { href: '#home',      label: 'Home' },
  { href: '#about',     label: 'About' },
  { href: '#skills',    label: 'Skills' },
  { href: '#projects',  label: 'Projects' },
  { href: '#github',    label: 'GitHub' },
  { href: '#education', label: 'Education' },
  { href: '#contact',   label: 'Contact' },
];

const TYPING_TEXTS = [
  'Software Developer',
  'AI / ML Enthusiast',
  'Full-Stack Developer',
  'Problem Solver',
];

const SKILLS = [
  {
    Icon: FiMonitor,
    title: 'Frontend',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'React', 'Next.js', 'Bootstrap', 'Tailwind CSS'],
  },
  {
    Icon: FiServer,
    title: 'Backend',
    tags: ['Node.js', 'Express.js', 'Python', 'Flask', 'ASP.NET MVC', 'C#'],
  },
  {
    Icon: FiDatabase,
    title: 'Database',
    tags: ['MongoDB', 'MySQL', 'Firebase', 'Firestore', 'SQL Server'],
  },
  {
    Icon: FiCpu,
    title: 'AI / ML',
    tags: ['Machine Learning', 'AI Model Training', 'Data Processing', 'NLP', 'Python ML Libs'],
  },
  {
    Icon: FiTool,
    title: 'Tools & DevOps',
    tags: ['Git', 'GitHub', 'VS Code', 'Postman', 'Cloudinary', 'REST APIs'],
  },
  {
    Icon: FiSmartphone,
    title: 'Mobile',
    tags: ['Flutter', 'Dart', 'Firebase SDK', 'Cross-Platform'],
  },
];

const PROJECTS = [
  {
    Icon: FaLeaf,
    type: 'AI + ML Project',
    title: 'EarthScape Climate Agency',
    period: 'Mar 2026 – Apr 2026',
    desc: 'AI-powered climate awareness and environmental monitoring platform. Integrates ML models trained on environmental datasets to analyze patterns, generate predictions, and provide interactive dashboards for climate insights.',
    tech: ['Python', 'Flask', 'Machine Learning', 'HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/RAYYANHASSAN321/EarthScape-Climate-Agency',
  },
  {
    Icon: SiFlask,
    type: 'Python / Flask App',
    title: 'Flask Web Application',
    period: 'Jan 2026 – Feb 2026',
    desc: 'A beginner-friendly Flask web app demonstrating Python backend fundamentals, virtual environment setup, routing, HTML templating, and a clean modular project structure ready for scaling.',
    tech: ['Python', 'Flask', 'HTML', 'CSS'],
    github: 'https://github.com/RAYYANHASSAN321',
  },
  {
    Icon: FaHotel,
    type: 'Full-Stack Web App',
    title: 'LuxuryStay Hotel Management System',
    period: 'Oct 2025 – Nov 2025',
    desc: 'Full-stack hotel management system covering room bookings, customer & staff management, and billing. Supports multiple user roles (Admin, Staff, Customer) with secure access control.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/RAYYANHASSAN321/HMS',
  },
  {
    Icon: FaPaw,
    type: 'Flutter Mobile App',
    title: 'PawfectCare',
    period: 'Sep 2025 – Oct 2025',
    desc: 'Cross-platform mobile app for comprehensive pet care management — pet profiles, care tracking routines, and reminders. Built collaboratively with a 4-person team using Flutter & Dart.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore'],
    github: 'https://github.com/donatedsalt/PawfectCare',
  },
  {
    Icon: FaPlane,
    type: 'Flutter Mobile App',
    title: 'TripBudgeter',
    period: 'Jul 2025 – Aug 2025',
    desc: 'Collaborative travel budgeting app helping users plan trips, manage group expenses, and track budgets in real time. Built with a 4-person team focusing on responsive UX.',
    tech: ['Flutter', 'Dart', 'Firebase'],
    github: 'https://github.com/donatedsalt/TripBudgeter',
  },
  {
    Icon: FaMap,
    type: 'Flutter Mobile App',
    title: 'Citi Guide',
    period: 'Jan 2025 – Feb 2025',
    desc: 'Cross-platform city exploration app with Firebase integration. Features city & attraction listings, search & filter by category, favorites system, and real-time map navigation.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Google Maps'],
    github: 'https://github.com/RAYYANHASSAN321/Citi_Guide',
  },
  {
    Icon: FaParking,
    type: 'Flutter Mobile App',
    title: 'Smart-Park',
    period: 'Nov 2024 – Dec 2024',
    desc: 'Smart parking app for Android & iOS providing real-time parking availability via GPS, spot booking, and reservation management. Designed for smooth mobile UX with Firebase backend.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Google Maps API'],
    github: 'https://github.com/RAYYANHASSAN321/Smart-Park',
  },
  {
    Icon: FaAmbulance,
    type: 'PHP Web App',
    title: 'Rapid Rescue',
    period: 'Aug 2024 – Sep 2024',
    desc: 'Emergency-response application where users can request rescue services through a clean interface. Includes user auth, rescue request tracking, and an admin panel for managing responses.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'Bootstrap'],
    github: 'https://github.com/RAYYANHASSAN321/Rapid-Rescue',
  },
  {
    Icon: FaCalendarAlt,
    type: 'PHP Web App',
    title: 'Online Reservation System',
    period: 'Jun 2024 – Jul 2024',
    desc: 'Full-stack online reservation system with user auth, CRUD booking management, and an admin dashboard for overseeing reservations and customer data. Responsive across all devices.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS'],
    github: 'https://github.com/RAYYANHASSAN321/Online-Reservation-System',
  },
  {
    Icon: FaShoppingBag,
    type: 'E-Commerce Web App',
    title: 'Online Cosmetics Web Application',
    period: 'Dec 2023 – Jan 2024',
    desc: 'Full-featured e-commerce platform for beauty products. Includes product listings, cart & checkout, admin dashboard for products & orders, and a clean responsive UI for mobile and desktop.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS'],
    github: 'https://github.com/RAYYANHASSAN321/COSMETICS_WEB_APP',
  },
];

/* ====== HOOKS ====== */
function useTypingEffect(texts, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [textIdx, setTextIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = texts[textIdx];
    let timeout;
    if (!deleting && charIdx < current.length) {
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx === current.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx > 0) {
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else if (deleting && charIdx === 0) {
      setDeleting(false);
      setTextIdx(t => (t + 1) % texts.length);
    }
    setDisplay(current.slice(0, charIdx));
    return () => clearTimeout(timeout);
  }, [charIdx, deleting, textIdx, texts, speed, pause]);

  return display;
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          observer.unobserve(e.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right')
      .forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}

function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (window.scrollY / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return progress;
}

function useActiveSection() {
  const [active, setActive] = useState('home');
  useEffect(() => {
    const sections = NAV_LINKS.map(l => l.href.slice(1));
    const handler = () => {
      let current = sections[0];
      sections.forEach(id => {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 120) current = id;
      });
      setActive(current);
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);
  return active;
}

/* ====== NAVBAR ====== */
function Navbar({ dark, toggleDark }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTo = href => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="container">
          <div className="nav-inner">
            <a className="nav-logo" href="#home" onClick={e => { e.preventDefault(); scrollTo('#home'); }}>
              Rayyan<span>.</span>
            </a>
            <ul className="nav-links">
              {NAV_LINKS.map(l => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className={active === l.href.slice(1) ? 'active' : ''}
                    onClick={e => { e.preventDefault(); scrollTo(l.href); }}
                  >{l.label}</a>
                </li>
              ))}
            </ul>
            <div className="nav-actions">
              <button id="theme-toggle" className="theme-toggle" onClick={toggleDark} aria-label="Toggle theme">
                {dark ? <FiSun size={17} /> : <FiMoon size={17} />}
              </button>
              <a href="#contact" className="nav-hire-btn" onClick={e => { e.preventDefault(); scrollTo('#contact'); }}>
                Hire Me
              </a>
              <button
                id="nav-hamburger"
                className={`nav-hamburger${menuOpen ? ' open' : ''}`}
                onClick={() => setMenuOpen(o => !o)}
                aria-label="Toggle menu"
              >
                <span /><span /><span />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {NAV_LINKS.map(l => (
          <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); scrollTo(l.href); }}>
            {l.label}
          </a>
        ))}
        <a
          href="/Rayyan_Hassan_CV.pdf"
          download
          style={{ color: 'var(--teal-light)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8 }}
          onClick={() => setMenuOpen(false)}
        >
          <FiDownload size={15} /> Download CV
        </a>
      </div>
    </>
  );
}

/* ====== HERO ====== */
function Hero() {
  const typed = useTypingEffect(TYPING_TEXTS);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(t);
  }, []);

  const scrollTo = href => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero grid-bg">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="container">
        <div className="hero-content">
          {/* Left */}
          <div className="hero-left">
            <div className="hero-badge">
              <span className="glow-dot" /> Available for Work
            </div>
            <h1 className="hero-name">
              Hi, I'm<br /><span>Rayyan Hassan</span>
            </h1>
            <div className="typing-wrapper">
              <span>{typed}</span>
              <span className="typing-cursor" />
            </div>
            <p className="hero-tagline">
              Building smart, scalable, and user-friendly digital solutions.
              Passionate about software development, AI/ML, and creating impactful technology.
            </p>
            <div className="hero-buttons">
              <a
                href="#projects"
                id="hero-view-work"
                className="teal-btn"
                onClick={e => { e.preventDefault(); scrollTo('#projects'); }}
              >
                <IoRocketOutline size={18} /> View My Work
              </a>
              <a href="/Rayyan_Hassan_CV.pdf" id="hero-download-cv" className="outline-btn" download>
                <FiDownload size={16} /> Download CV
              </a>
            </div>
            <div className="hero-socials">
              <span className="hero-social-label">Connect:</span>
              <div className="hero-social-links">
                <a id="social-github" className="social-icon-btn" href="https://github.com/RAYYANHASSAN321" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                  <FiGithub size={17} />
                </a>
                <a id="social-linkedin" className="social-icon-btn" href="https://pk.linkedin.com/in/rayyanhasn" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <FiLinkedin size={17} />
                </a>
                <a id="social-email" className="social-icon-btn" href="mailto:rayyanhassan321@email.com" aria-label="Email" title="Email">
                  <FiMail size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className={`hero-right${loaded ? ' loaded' : ''}`}>
            <div className="hero-visual">
              <div className="avatar-ring">
                <img className="avatar-img" src={profileImg} alt="Rayyan Hassan – Software Developer" />
              </div>
            </div>
            <div className="hero-stats">
              <div className="stat-card">
                <span className="stat-num">10+</span>
                <span className="stat-label">Projects</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">6+</span>
                <span className="stat-label">Tech Stacks</span>
              </div>
              <div className="stat-card">
                <span className="stat-num">2+ yrs</span>
                <span className="stat-label">Coding</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-scroll-indicator" onClick={() => scrollTo('#about')}>
        <div className="scroll-mouse">
          <div className="scroll-wheel" />
        </div>
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ====== ABOUT ====== */
function About() {
  return (
    <section id="about" className="section about-section">
      <div className="container">
        <div className="about-grid">
          <div className="about-image-wrap reveal-left">
            <div className="about-img-card">
              <img src={profileImg} alt="Rayyan Hassan" />
            </div>
            <div className="about-floating-badge">
              <span className="afb-num">ACCP</span>
              <span className="afb-label">Prime Diploma</span>
            </div>
          </div>
          <div className="about-right reveal-right">
            <span className="section-tag"><IoSparklesOutline /> About Me</span>
            <h2 className="section-title">
              Crafting Digital <span>Experiences</span> with Purpose
            </h2>
            <div className="divider" />
            <p>
              I'm <strong style={{ color: 'var(--teal-light)' }}>Rayyan Hassan</strong>, a passionate
              software developer with a strong foundation in building modern web applications,
              AI/ML-based solutions, and full-stack systems from Pakistan.
            </p>
            <p>
              I enjoy solving real-world problems through technology — whether it's developing intelligent
              systems, crafting clean frontends, or architecting scalable backends. I'm continuously
              learning new tools and frameworks to stay ahead in the tech world.
            </p>
            <p>
              My journey spans across web development, mobile apps, and AI/ML projects. I believe that
              great software not only works flawlessly — it also creates meaningful experiences for the
              users it serves.
            </p>
            <div className="about-tags">
              {['Problem Solver', 'Quick Learner', 'Team Player', 'AI Enthusiast', 'Open Source Lover', 'Pakistan 🇵🇰'].map(t => (
                <span key={t} className="about-tag">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== SKILLS ====== */
function Skills() {
  return (
    <section id="skills" className="section skills-section grid-bg">
      <div className="container">
        <div className="skills-header reveal">
          <span className="section-tag"><FiLayers size={13} /> My Toolkit</span>
          <h2 className="section-title">Skills & <span>Technologies</span></h2>
          <div className="divider" />
          <p className="section-subtitle">
            A curated set of technologies I work with to build powerful, scalable, and beautiful applications.
          </p>
        </div>
        <div className="skills-categories">
          {SKILLS.map((cat, i) => (
            <div
              key={cat.title}
              className="skill-category-card reveal"
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div className="skill-cat-header">
                <div className="skill-cat-icon">
                  <cat.Icon size={22} color="var(--teal-light)" />
                </div>
                <span className="skill-cat-title">{cat.title}</span>
              </div>
              <div className="skill-tags">
                {cat.tags.map(tag => (
                  <span key={tag} className="skill-tag">{tag}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== PROJECTS ====== */
function Projects() {
  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        <div className="projects-header">
          <div className="reveal">
            <span className="section-tag"><FiCode size={13} /> My Work</span>
            <h2 className="section-title">Featured <span>Projects</span></h2>
            <div className="divider" />
          </div>
          <a
            id="github-all-projects"
            href="https://github.com/RAYYANHASSAN321"
            target="_blank"
            rel="noopener noreferrer"
            className="outline-btn reveal"
          >
            <FiGithub size={15} /> View All on GitHub
          </a>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              key={p.title}
              className="project-card reveal"
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              <div className="project-card-top" />
              <div className="project-card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                  <div className="project-type">
                    <p.Icon size={13} style={{ marginRight: 5, verticalAlign: 'middle' }} />
                    {p.type}
                  </div>
                  {p.period && (
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontFamily: 'var(--font-main)', whiteSpace: 'nowrap', marginLeft: 8 }}>
                      {p.period}
                    </span>
                  )}
                </div>
                <h3 className="project-title">{p.title}</h3>
                <p className="project-desc">{p.desc}</p>
                <div className="project-tech">
                  {p.tech.map(t => <span key={t} className="tech-badge">{t}</span>)}
                </div>
                <div className="project-links">
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link-btn primary">
                    <FiGithub size={13} /> View Code
                  </a>
                  <a href={p.github} target="_blank" rel="noopener noreferrer" className="proj-link-btn">
                    <FiExternalLink size={13} /> Demo
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ====== GITHUB ====== */
function GitHub() {
  const ghStats = [
    { Icon: FaFolderOpen, num: '10+',  label: 'Repositories' },
    { Icon: FaStar,       num: '30+',  label: 'Stars Earned' },
    { Icon: FaCodeBranch, num: '100+', label: 'Commits' },
    { Icon: FaUsers,      num: '3+',   label: 'Team Projects' },
  ];

  return (
    <section id="github" className="section github-section grid-bg">
      <div className="container">
        <div className="github-inner reveal">
          <span className="section-tag"><FiGithub size={13} /> Open Source</span>
          <h2 className="section-title">GitHub <span>Activity</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
          <p className="section-subtitle" style={{ maxWidth: 500, margin: '0 auto' }}>
            I actively contribute to open-source projects and continuously push new code.
            Check out my GitHub profile for the latest repositories and activity.
          </p>

          <div className="github-stats-grid">
            {ghStats.map(s => (
              <div key={s.label} className="github-stat-card">
                <span className="gh-icon"><s.Icon size={28} color="var(--teal)" /></span>
                <span className="gh-num">{s.num}</span>
                <span className="gh-label">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="github-contrib-img" style={{ marginTop: 40 }}>
            <img
              src="https://ghchart.rshah.org/26A641/RAYYANHASSAN321"
              alt="Rayyan Hassan's GitHub contribution chart"
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: 6 }}>
              GitHub Contribution Chart — RAYYANHASSAN321
            </p>
          </div>

          <div style={{ marginTop: 36, display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <img
              src="https://github-readme-stats.vercel.app/api?username=RAYYANHASSAN321&show_icons=true&theme=dark&bg_color=111827&title_color=088F8F&icon_color=088F8F&text_color=9ba8c0&border_color=1e3a5f"
              alt="Rayyan Hassan GitHub Stats"
              style={{ borderRadius: 12, maxWidth: '100%' }}
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
            />
            <img
              src="https://github-readme-stats.vercel.app/api/top-langs/?username=RAYYANHASSAN321&layout=compact&theme=dark&bg_color=111827&title_color=088F8F&text_color=9ba8c0&border_color=1e3a5f"
              alt="Rayyan Hassan Top Languages"
              style={{ borderRadius: 12, maxWidth: '100%' }}
              loading="lazy"
              onError={e => { e.target.style.display = 'none'; }}
            />
          </div>

          <div style={{ marginTop: 36 }}>
            <a
              id="github-profile-btn"
              href="https://github.com/RAYYANHASSAN321"
              target="_blank"
              rel="noopener noreferrer"
              className="teal-btn"
              style={{ margin: '0 auto' }}
            >
              <FiGithub size={16} /> Visit GitHub Profile
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== EDUCATION & EXPERIENCE ====== */
function EducationExperience() {
  return (
    <section id="education" className="section education-section">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: 0 }}>
          <span className="section-tag"><BsGraphUp size={13} /> My Journey</span>
          <h2 className="section-title">Education & <span>Experience</span></h2>
          <div className="divider" style={{ margin: '16px auto 0' }} />
        </div>

        <div className="edu-exp-grid">
          {/* Education */}
          <div>
            <div className="section-col-title reveal-left">
              <div className="section-col-icon">
                <FaGraduationCap size={20} color="var(--teal-light)" />
              </div>
              Education
            </div>
            <div className="timeline-item reveal-left" style={{ transitionDelay: '100ms' }}>
              <div className="timeline-card">
                <span className="tl-period">2021 – Present &nbsp;🟢 In Progress</span>
                <div className="tl-title">Bachelor of Science in Computer Science</div>
                <div className="tl-org">Example University, Pakistan</div>
                <p className="tl-desc">
                  Currently pursuing BS Computer Science. Studying core fundamentals including
                  Data Structures, Algorithms, Database Systems, Software Engineering, AI,
                  and Web Development. Actively working on real-world projects alongside studies.
                </p>
              </div>
            </div>
            <div className="timeline-item reveal-left" style={{ transitionDelay: '200ms' }}>
              <div className="timeline-card">
                <span className="tl-period">Completed ✓</span>
                <div className="tl-title">ACCP Prime Diploma</div>
                <div className="tl-org">Aptech Computer Education, Pakistan</div>
                <p className="tl-desc">
                  Completed the ACCP Prime professional IT diploma from Aptech, covering
                  software development, web programming, databases, OOP, and project-based
                  learning — building a strong industry-ready foundation.
                </p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div>
            <div className="section-col-title reveal-right">
              <div className="section-col-icon">
                <MdOutlineWorkOutline size={20} color="var(--teal-light)" />
              </div>
              Experience
            </div>
            <div className="timeline-item reveal-right" style={{ transitionDelay: '100ms' }}>
              <div className="timeline-card">
                <span className="tl-period">2024 – Present</span>
                <div className="tl-title">Software Developer Intern</div>
                <div className="tl-org">Tech Solutions Pvt Ltd, Pakistan</div>
                <div className="tl-desc">
                  <ul>
                    <li>Developed and maintained web-based applications</li>
                    <li>Built responsive UI components using React and Bootstrap</li>
                    <li>Integrated third-party REST APIs into existing systems</li>
                    <li>Performed QA testing and debugging of application features</li>
                    <li>Collaborated with senior developers using Git workflows</li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="timeline-item reveal-right" style={{ transitionDelay: '200ms' }}>
              <div className="timeline-card">
                <span className="tl-period">2023</span>
                <div className="tl-title">Freelance Web Developer</div>
                <div className="tl-org">Self-Employed</div>
                <div className="tl-desc">
                  <ul>
                    <li>Built custom websites for local businesses</li>
                    <li>Created responsive landing pages and portfolios</li>
                    <li>Delivered projects with React, PHP, and WordPress</li>
                    <li>Managed client communication and project timelines</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== CONTACT ====== */
function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = e => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => { setSending(false); setSent(true); }, 1500);
  };

  const contactDetails = [
    { Icon: MdEmail,      label: 'Email',        val: 'rayyanhassan321@email.com', href: 'mailto:rayyanhassan321@email.com' },
    { Icon: MdLocationOn, label: 'Location',      val: 'Pakistan 🇵🇰',              href: null },
    { Icon: FiClock,      label: 'Availability',  val: 'Mon – Sat, 9am – 6pm PKT', href: null },
  ];

  return (
    <section id="contact" className="section contact-section grid-bg">
      <div className="container">
        <div className="contact-grid">
          {/* Info */}
          <div className="reveal-left">
            <span className="section-tag"><FiSend size={13} /> Get In Touch</span>
            <h2 className="contact-info-title">Let's Work <span>Together</span></h2>
            <p className="contact-info-desc">
              I'm open to freelance projects, internships, and full-time opportunities.
              If you have a project idea or want to collaborate, feel free to reach out!
            </p>

            <div style={{ marginBottom: 28 }}>
              {contactDetails.map(item => (
                <div key={item.label} className="contact-detail-item">
                  <div className="cdi-icon">
                    <item.Icon size={18} color="var(--teal-light)" />
                  </div>
                  <div className="cdi-text">
                    <span>{item.label}</span>
                    {item.href
                      ? <a href={item.href}>{item.val}</a>
                      : <p>{item.val}</p>}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social-row">
              <a id="contact-linkedin" href="https://pk.linkedin.com/in/rayyanhasn" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                <FaLinkedin size={16} /> LinkedIn
              </a>
              <a id="contact-github" href="https://github.com/RAYYANHASSAN321" target="_blank" rel="noopener noreferrer" className="contact-social-btn">
                <FaGithub size={16} /> GitHub
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="reveal-right">
            <div className="contact-form-card">
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <FiMail color="var(--teal)" /> Send a Message
              </h3>
              {sent ? (
                <div className="form-success">
                  <FiCheckCircle size={52} color="var(--teal)" style={{ animation: 'none' }} />
                  <h4 style={{ fontFamily: 'var(--font-main)', color: 'var(--text-primary)', fontSize: '1.2rem' }}>
                    Message Sent!
                  </h4>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    Thank you for reaching out! I'll get back to you within 24 hours.
                  </p>
                  <button
                    className="outline-btn"
                    style={{ marginTop: 12 }}
                    onClick={() => { setSent(false); setForm({ name: '', email: '', subject: '', message: '' }); }}
                  >Send Another</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} id="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="form-name">Your Name</label>
                      <input id="form-name" className="form-control" name="name" type="text" placeholder="Rayyan Hassan" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                      <label htmlFor="form-email">Email Address</label>
                      <input id="form-email" className="form-control" name="email" type="email" placeholder="you@example.com" value={form.email} onChange={handleChange} required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-subject">Subject</label>
                    <input id="form-subject" className="form-control" name="subject" type="text" placeholder="Project Collaboration / Job Opportunity" value={form.subject} onChange={handleChange} required />
                  </div>
                  <div className="form-group">
                    <label htmlFor="form-message">Message</label>
                    <textarea id="form-message" className="form-control" name="message" rows="5" placeholder="Hello Rayyan, I'd like to discuss..." value={form.message} onChange={handleChange} required />
                  </div>
                  <button id="form-submit" type="submit" className="form-submit-btn" disabled={sending}>
                    {sending
                      ? <><FiSend size={16} style={{ opacity: 0.6 }} /> Sending...</>
                      : <><FiSend size={16} /> Send Message</>}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ====== FOOTER ====== */
function Footer() {
  const scrollTo = href => {
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <a className="footer-logo" href="#home" onClick={e => { e.preventDefault(); scrollTo('#home'); }}>
            Rayyan<span>.</span>Hassan
          </a>
          <p className="footer-copy">
            © 2025 <span>Rayyan Hassan</span>. Built with ♥ & React.
          </p>
          <div className="footer-links">
            <a className="social-icon-btn" href="https://github.com/RAYYANHASSAN321" target="_blank" rel="noopener noreferrer" title="GitHub">
              <FiGithub size={17} />
            </a>
            <a className="social-icon-btn" href="https://pk.linkedin.com/in/rayyanhasn" target="_blank" rel="noopener noreferrer" title="LinkedIn">
              <FiLinkedin size={17} />
            </a>
            <a className="social-icon-btn" href="mailto:rayyanhassan321@email.com" title="Email">
              <FiMail size={17} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ====== APP ROOT ====== */
export default function App() {
  const [dark, setDark] = useState(true);
  const [backTop, setBackTop] = useState(false);
  const progress = useScrollProgress();
  useScrollReveal();

  useEffect(() => {
    document.body.classList.toggle('light-mode', !dark);
  }, [dark]);

  useEffect(() => {
    const h = () => setBackTop(window.scrollY > 400);
    window.addEventListener('scroll', h);
    return () => window.removeEventListener('scroll', h);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <>
      {/* Progress bar */}
      <div className="nav-progress" style={{ width: `${progress}%` }} />

      {/* Navbar */}
      <Navbar dark={dark} toggleDark={() => setDark(d => !d)} />

      {/* Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <GitHub />
        <EducationExperience />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to top */}
      <button
        id="back-to-top"
        className={`back-to-top${backTop ? ' visible' : ''}`}
        onClick={scrollTop}
        aria-label="Back to top"
      >
        <FiArrowUp size={20} />
      </button>
    </>
  );
}
