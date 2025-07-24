import './App.css';
import logo from './assets/logo.png';
import arztBild from './assets/Arzt Bild von Usman Yousaf.jpg';
import brainImg from './assets/brain.png';
import { useState, useEffect, useRef } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from 'react-router-dom';

const leistungenData = [
  {
    title: 'Allgemeine neurologische Diagnostik & Anamnese',
    image: brainImg,
    description:
      'Umfassendes Erstgespräch zur Krankengeschichte und neurologische Untersuchung von Reflexen, Motorik, Sensibilität und Kognition.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'Duplex-Ultraschall / Duplex-Sonografie',
    image: brainImg,
    description:
      'Gefäßdiagnostik zur Beurteilung der Durchblutung von Hirn- und Halsgefäßen.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'Elektroenzephalografie (EEG)',
    image: brainImg,
    description:
      'Messung der elektrischen Aktivität des Gehirns, z. B. bei Epilepsie.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'Elektromyografie (EMG)',
    image: brainImg,
    description:
      'Untersuchung der Muskel- und Nervenfunktion zur Diagnostik neuromuskulärer Störungen.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'Nervenleitgeschwindigkeit (NLG)',
    image: brainImg,
    description:
      'Messung der Leitgeschwindigkeit peripherer Nerven zur Diagnostik von Nervenschäden.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'Bildgebende Verfahren (CT, MRT)',
    image: brainImg,
    description:
      'Veranlassung von CT- oder MRT-Untersuchungen zur Darstellung des Gehirns und Rückenmarks.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'Schlafpolygrafie',
    image: brainImg,
    description:
      'Untersuchung von Schlafstörungen mithilfe ambulanter Schlafdiagnostik.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'Labor- und Ultraschalldiagnostik',
    image: brainImg,
    description:
      'Blutuntersuchungen und ergänzende Ultraschalldiagnostik zur Erkennung von Begleiterkrankungen.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
];

function IntroScreen({ onComplete }: { onComplete: () => void }) {
  const [showLogo, setShowLogo] = useState(false);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Show logo after 2 seconds
    const logoTimer = setTimeout(() => {
      setShowLogo(true);
    }, 2000);

    // Start fade out after 4 seconds
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 4000);

    // Complete transition after 5 seconds
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 5000);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(fadeTimer);
      clearTimeout(completeTimer);
    };
  }, [onComplete]);

  return (
    <div className={`intro-screen ${fadeOut ? 'fade-out' : ''}`}>
      <div className='intro-background'>
        <img
          src='https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&w=1920&q=80'
          alt='Landscape'
          className='intro-bg-image'
        />
        <div className='intro-overlay'></div>
      </div>

      <div className='intro-logo-container'>
        <img
          src={logo}
          alt='Alkadi Logo'
          className={`intro-logo ${showLogo ? 'show' : ''}`}
        />
      </div>
    </div>
  );
}

function LeistungenPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const gridRef = useRef<HTMLDivElement>(null);
  const [showAll, setShowAll] = useState(false);
  // Animation state for pills
  const [showPills, setShowPills] = useState(false);
  useEffect(() => {
    // Show pills after a short delay (after text appears)
    const timer = setTimeout(() => setShowPills(true), 2200);
    return () => clearTimeout(timer);
  }, []);
  const krankheiten = [
    'Demenz',
    'Migräne',
    'Epilepsie',
    'Parkinson',
    'MS',
    'Schwindel',
    'Polyneuropathie',
    '…und mehr',
  ];
  const handleScrollToGrid = () => {
    if (gridRef.current) {
      gridRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const visibleLeistungen = showAll
    ? leistungenData
    : leistungenData.slice(0, 4);
  return (
    <div
      className='leistungen-page'
      style={{
        minHeight: '100vh',
        background: 'var(--blue-50)',
        paddingBottom: '3rem',
      }}
    >
      {/* Vertically centered hero section for heading and description */}
      <section
        className='hero-content'
        style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          paddingTop: 0,
          paddingBottom: 0,
        }}
      >
        <h1 className='hero-title animated-text'>
          Unsere neurologischen Leistungen
        </h1>
        <h2
          className='hero-desc animated-text'
          style={{ marginBottom: '2.2rem' }}
        >
          Moderne Diagnostik, persönliche Beratung und gezielte Therapie für Ihr
          Wohlbefinden.
          <br />
          Behandelte Erkrankungen im Überblick:
        </h2>
        {/* Krankheitsliste as pill boxes */}
        <div
          className='krankheiten-list-container'
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.7rem',
            justifyContent: 'center',
            marginBottom: '2.5rem',
            maxWidth: 700,
            marginLeft: 'auto',
            marginRight: 'auto',
          }}
        >
          {krankheiten.map((krankheit, idx) => (
            <span
              key={idx}
              className={`krankheit-pill krankheit-pill-animate${
                showPills ? ' show' : ''
              }`}
              style={{
                display: 'inline-block',
                padding: '0.38em 0.95em',
                borderRadius: '2em',
                background: 'var(--blue-100, #e6f7fa)',
                color: 'var(--blue-700, #217a8a)',
                fontWeight: 600,
                fontSize: '0.97em',
                boxShadow: '0 1px 4px rgba(98,190,204,0.08)',
                whiteSpace: 'nowrap',
                border: '1px solid var(--blue-200, #c2e4ec)',
                marginBottom: '0.2em',
                cursor: 'pointer',
                transition: 'background 0.22s, color 0.22s, transform 0.22s',
                transitionDelay: showPills ? `${idx * 70}ms` : '0ms',
                opacity: showPills ? 1 : 0,
                transform: showPills ? 'translateY(0)' : 'translateY(30px)',
              }}
            >
              {krankheit}
            </span>
          ))}
        </div>
        {/* Mobile-only scroll button */}
        <button
          className='scroll-to-leistungen-btn animated-buttons'
          style={{
            // display removed so button is always visible
            padding: '0.6rem 1.3rem',
            fontSize: '0.98rem',
            borderRadius: '1.5rem',
            background: 'var(--blue-600)',
            color: '#fff',
            border: 'none',
            boxShadow: '0 2px 8px rgba(98,190,204,0.13)',
            cursor: 'pointer',
            fontWeight: 600,
            letterSpacing: '0.02em',
            transition: 'background 0.2s',
          }}
          onClick={handleScrollToGrid}
        >
          Zu den Leistungen
        </button>
      </section>
      {/* Leistungen grid below, visible after scrolling */}
      <section>
        <div
          ref={gridRef}
          className='leistungen-grid'
          style={{ maxWidth: 900, margin: '0 auto' }}
        >
          {visibleLeistungen.map((leistung, idx) => (
            <div className='leistung-box' key={idx}>
              <img
                src={leistung.image}
                alt={leistung.title}
                className='leistung-img'
              />
              <div className='leistung-title'>{leistung.title}</div>
              <div className='leistung-desc'>{leistung.description}</div>
              <div
                style={{
                  display: 'flex',
                  gap: '0.7rem',
                  justifyContent: 'center',
                  marginTop: 'auto',
                }}
              >
                {leistung.available.map((ort) => (
                  <div
                    className='leistung-available'
                    key={ort}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      minWidth: 0,
                    }}
                  >
                    <span
                      style={{
                        color: 'var(--blue-600)',
                        fontSize: '1.2em',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <svg
                        width='18'
                        height='18'
                        viewBox='0 0 20 20'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2.2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <polyline points='4 11 8 15 16 6' />
                      </svg>
                    </span>
                    <span style={{ whiteSpace: 'nowrap', fontWeight: 600 }}>
                      {ort}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {leistungenData.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              className='show-more-leistungen-btn'
              style={{
                padding: '0.7rem 2.2rem',
                fontSize: '1.08rem',
                borderRadius: '1.5rem',
                background: 'var(--blue-600)',
                color: '#fff',
                border: 'none',
                boxShadow: '0 2px 8px rgba(98,190,204,0.13)',
                cursor: 'pointer',
                fontWeight: 600,
                letterSpacing: '0.02em',
                transition: 'background 0.2s',
              }}
              onClick={() => setShowAll((v) => !v)}
            >
              {showAll ? 'Weniger anzeigen' : 'Weitere Leistungen'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// Remove the old fixed logo div and header bar, replace with a single header
function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Lock scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  return (
    <header className='main-header-bar'>
      <Link to='/'>
        <img src={logo} alt='Alkadi Logo' className='main-header-logo' />
      </Link>
      {/* Burger menu only on mobile */}
      <button
        className={`burger-menu-btn${menuOpen ? ' open' : ''}`}
        aria-label='Menü öffnen'
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className='burger-bar'></span>
        <span className='burger-bar'></span>
        <span className='burger-bar'></span>
      </button>
      {/* Animated mobile menu */}
      <nav className={`mobile-nav-menu${menuOpen ? ' show' : ''}`}>
        <Link
          to='/'
          className='mobile-nav-link'
          onClick={() => setMenuOpen(false)}
        >
          Home
        </Link>
        <Link
          to='/leistungen'
          className='mobile-nav-link'
          onClick={() => setMenuOpen(false)}
        >
          Leistungen
        </Link>
      </nav>
      {/* Overlay for menu */}
      {menuOpen && (
        <div
          className='mobile-nav-overlay'
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </header>
  );
}

function MainPage() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };
  const navigate = useNavigate();

  return (
    <>
      {/* Animated Hero Section */}
      <section className='animated-hero no-bg'>
        <div className='hero-content'>
          <h1 className='hero-title animated-text'>
            Willkommen bei Ihren Fachärzten für Neurologie
            <br />
            <span className='hero-title-blue'>
              Dr. med. Assad Al Kadi & Hazem Al Kadi
            </span>
          </h1>
          <h2 className='hero-desc animated-text'>
            Modernste neurologische Diagnostik und Behandlung an zwei
            Standorten. Wählen Sie Ihre bevorzugte Praxis für weitere
            Informationen.
          </h2>
          <div className='location-buttons animated-buttons'>
            <button
              className='location-btn'
              onClick={() => scrollToSection('recklinghausen')}
            >
              <span className='location-icon'>
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#62becc'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 10.5a8.38 8.38 0 0 1-1.9 5.4c-1.5 1.9-4.6 5.1-6.1 6.6a1.7 1.7 0 0 1-2.4 0c-1.5-1.5-4.6-4.7-6.1-6.6A8.38 8.38 0 0 1 3 10.5a9 9 0 1 1 18 0z' />
                  <circle cx='12' cy='10.5' r='3.5' />
                </svg>
              </span>
              Recklinghausen
            </button>
            <button
              className='location-btn'
              onClick={() => scrollToSection('oer-erkenschwick')}
            >
              <span className='location-icon'>
                <svg
                  width='28'
                  height='28'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='#62becc'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M21 10.5a8.38 8.38 0 0 1-1.9 5.4c-1.5 1.9-4.6 5.1-6.1 6.6a1.7 1.7 0 0 1-2.4 0c-1.5-1.5-4.6-4.7-6.1-6.6A8.38 8.38 0 0 1 3 10.5a9 9 0 1 1 18 0z' />
                  <circle cx='12' cy='10.5' r='3.5' />
                </svg>
              </span>
              Oer-Erkenschwick
            </button>
          </div>
        </div>
      </section>
      {/* Rest of the sections */}
      <section id='recklinghausen' className='standort-section'>
        <div className='standort-content'>
          <img
            src={arztBild}
            alt='Recklinghausen Arzt'
            className='standort-img'
          />
          <div className='standort-info'>
            <div className='standort-title'>Recklinghausen</div>
            <div className='standort-doctor'>Dr. med. Assad Al Kadi</div>
            <div className='standort-details'>
              <div>
                <b>Mo, Di, Do:</b> 9 am–5 pm
              </div>
              <div>
                <b>Mi, Fr:</b> 9 am–1 pm
              </div>
              <div>
                <b>Sa, So:</b> geschlossen
              </div>
              <div>
                <b>Adresse:</b> Bochumer Straße 124A,
                <br /> 45661 Recklinghausen
              </div>
              <div>
                <b>Telefon:</b> 02361 653962
              </div>
              <div>
                <b>Fax:</b> 02361 657519
              </div>
            </div>
            <div className='standort-btn-row'>
              <a
                className='standort-btn standort-btn-small'
                href='https://www.doctolib.de/neurologie/recklinghausen/assad-alkadi'
                target='_blank'
                rel='noopener noreferrer'
              >
                Termin vereinbaren
              </a>
              <button
                className='standort-btn standort-btn-secondary standort-btn-small'
                onClick={() => navigate('/leistungen')}
              >
                Leistungen
              </button>
              <button
                className='standort-btn standort-btn-secondary standort-btn-small'
                onClick={() => navigate('/praxis/recklinghausen')}
              >
                Praxis Details
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id='oer-erkenschwick' className='standort-section'>
        <div className='standort-content'>
          <img
            src={arztBild}
            alt='Oer-Erkenschwick Arzt'
            className='standort-img'
          />
          <div className='standort-info'>
            <div className='standort-title'>Oer-Erkenschwick</div>
            <div className='standort-doctor'>Dr. med. Hazem Al Kadi</div>
            <div className='standort-details'>
              <div>
                <b>Mo, Di, Do:</b> 9 am–5 pm
              </div>
              <div>
                <b>Mi, Fr:</b> 9 am–1 pm
              </div>
              <div>
                <b>Sa, So:</b> geschlossen
              </div>
              <div>
                <b>Adresse:</b> Konrad-Adenauer-Straße 13,
                <br /> 45739 Oer-Erkenschwick
              </div>
              <div>
                <b>Telefon:</b> 02368 8920049
              </div>
              <div>
                <b>Fax:</b> 02368 8920048
              </div>
            </div>
            <div className='standort-btn-row'>
              <a
                className='standort-btn standort-btn-small'
                href='https://www.doctolib.de/einzelpraxis/oer-erkenschwick/neurologiepraxis-dr-alkadi?pid=practice-541381&utm_source=google_appointment_redirect&utm_campaign=gmb&utm_medium=organic&hl=en-DE&gei=-tZqaOH2N--sxc8PmqHj8AM&rwg_token=ACgRB3fIYmRhI1ib8gqsCRTFIg0C_lv9tP8x0CxMnr1rxa_xL_A5NL7uwS8trBL8uNOC8jPXBeoauSnb0WasJlooxzx9qm16cw%3D%3D'
                target='_blank'
                rel='noopener noreferrer'
              >
                Termin vereinbaren
              </a>
              <button
                className='standort-btn standort-btn-secondary standort-btn-small'
                onClick={() => navigate('/leistungen')}
              >
                Leistungen
              </button>
              <button
                className='standort-btn standort-btn-secondary standort-btn-small'
                onClick={() => navigate('/praxis/oer-erkenschwick')}
              >
                Praxis Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Footer() {
  return (
    <footer className='main-footer'>
      <div>
        <nav style={{ marginBottom: '1.1rem' }}>
          <Link to='/' className='footer-link'>
            Home
          </Link>
          <span style={{ margin: '0 0.7rem', color: '#bbb' }}>|</span>
          <Link to='/leistungen' className='footer-link'>
            Leistungen
          </Link>
        </nav>
        <div
          style={{
            marginBottom: '0.7rem',
            fontWeight: 600,
            fontSize: '1.15rem',
          }}
        >
          Neurologische Praxis Dr. med. Assad Al Kadi & Hazem Al Kadi
        </div>
        <div style={{ marginBottom: '0.3rem' }}>
          Musterstraße 1, 45657 Recklinghausen & Beispielweg 2, 45739
          Oer-Erkenschwick
        </div>
        <div style={{ marginBottom: '0.3rem' }}>
          Telefon: <a href='tel:02361123456'>02361 123456</a> |{' '}
          <a href='tel:02368654321'>02368 654321</a>
        </div>
        <div style={{ marginBottom: '0.3rem' }}>
          E-Mail:{' '}
          <a href='mailto:info@neurologie-alkadi.de'>
            info@neurologie-alkadi.de
          </a>
        </div>
        <div
          style={{ marginTop: '1.1rem', fontSize: '0.98rem', color: '#666' }}
        >
          &copy; {new Date().getFullYear()} Neurologische Praxis Dr. med. Assad
          Al Kadi & Hazem Al Kadi. Alle Rechte vorbehalten.
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  const [showIntro, setShowIntro] = useState(true);

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  if (showIntro) {
    return <IntroScreen onComplete={handleIntroComplete} />;
  }

  return (
    <Router>
      <MainHeader />
      <div style={{ height: '7.5rem' }} />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/leistungen' element={<LeistungenPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}
