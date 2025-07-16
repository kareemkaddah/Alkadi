import './App.css';
import logo from './assets/logo.png';
import arztBild from './assets/Arzt Bild von Usman Yousaf.jpg';
import { useState, useEffect } from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
} from 'react-router-dom';

const leistungenData = [
  {
    title: 'EEG (Elektroenzephalografie)',
    image:
      'https://images.unsplash.com/photo-1511174511562-5f97f2b2e2b9?auto=format&fit=crop&w=400&q=80',
    description:
      'Messung der elektrischen Aktivität des Gehirns zur Diagnose von Epilepsie und anderen neurologischen Erkrankungen.',
    available: ['Recklinghausen', 'Oer-Erkenschwick'],
  },
  {
    title: 'ENG (Elektroneurografie)',
    image:
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description:
      'Untersuchung der Nervenleitgeschwindigkeit zur Diagnose von Nervenerkrankungen.',
    available: ['Recklinghausen'],
  },
  {
    title: 'MS-Diagnostik',
    image:
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Umfassende Diagnostik und Betreuung bei Multipler Sklerose.',
    available: ['Oer-Erkenschwick'],
  },
  {
    title: 'Demenzabklärung',
    image:
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
    description: 'Früherkennung und Behandlung von Demenz und Alzheimer.',
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
  return (
    <div
      className='leistungen-page'
      style={{
        minHeight: '100vh',
        background: 'var(--blue-50)',
        paddingBottom: '3rem',
      }}
    >
      <div
        style={{
          maxWidth: 900,
          margin: '0 auto',
          textAlign: 'center',
          paddingTop: '4rem',
        }}
      >
        <h1 className='hero-title'>Unsere neurologischen Leistungen</h1>
        <h2 className='hero-desc'>
          Wir bieten Ihnen ein breites Spektrum moderner neurologischer
          Diagnostik und Therapie.
        </h2>
        <div className='leistungen-grid'>
          {leistungenData.map((leistung, idx) => (
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
      </div>
    </div>
  );
}

// Remove the old fixed logo div and header bar, replace with a single header
function MainHeader() {
  return (
    <header className='main-header-bar'>
      <Link to='/'>
        <img src={logo} alt='Alkadi Logo' className='main-header-logo' />
      </Link>
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
                <b>Adresse:</b> Musterstraße 1, 45657 Recklinghausen
              </div>
              <div>
                <b>Telefon:</b> 02361 123456
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
              <button className='standort-btn standort-btn-secondary standort-btn-small'>
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
                <b>Adresse:</b> Beispielweg 2, 45739 Oer-Erkenschwick
              </div>
              <div>
                <b>Telefon:</b> 02368 654321
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
              <button className='standort-btn standort-btn-secondary standort-btn-small'>
                Praxis Details
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function DesktopLogo() {
  const [isDesktop, setIsDesktop] = useState(false);
  useEffect(() => {
    const checkDesktop = () => setIsDesktop(window.innerWidth > 1024);
    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);
  if (!isDesktop) return null;
  return (
    <Link
      to='/'
      style={{ position: 'fixed', top: '0.7rem', left: '1.7rem', zIndex: 100 }}
    >
      <img
        src={logo}
        alt='Alkadi Logo'
        style={{
          height: '6.5rem',
          width: 'auto',
          background: 'none',
          margin: 0,
          padding: 0,
          display: 'block',
        }}
      />
    </Link>
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
      <DesktopLogo />
      <MainHeader />
      <div style={{ height: '7.5rem' }} />
      <Routes>
        <Route path='/' element={<MainPage />} />
        <Route path='/leistungen' element={<LeistungenPage />} />
      </Routes>
    </Router>
  );
}
