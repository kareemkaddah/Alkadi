import './App.css';
import logo from './assets/logo.png';
import arztBild from './assets/Arzt Bild von Usman Yousaf.jpg';
import brainImg from './assets/brain.png';
import { useState, useEffect, useRef } from 'react';
import React from 'react';

import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  useLocation,
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
  // Animation state for leistungen fade-in
  const [fadeInIndexes, setFadeInIndexes] = useState<number[]>([]);
  // Animation state for leistungen fade-out
  const [collapsing, setCollapsing] = useState(false);
  const [fadeOutIndexes, setFadeOutIndexes] = useState<number[]>([]);

  // Determine which cards to show (move this up so it's available for hooks)
  let visibleLeistungen: typeof leistungenData;
  if (showAll || collapsing) {
    visibleLeistungen = leistungenData;
  } else {
    visibleLeistungen = leistungenData.slice(0, 4);
  }

  // --- Slide-in animation state ---
  const [cardShown, setCardShown] = useState<boolean[]>([]);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [buttonShown, setButtonShown] = useState(false);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    // Show pills after a short delay (after text appears)
    const timer = setTimeout(() => setShowPills(true), 2200);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (showAll) {
      // Animate only the newly revealed cards (indexes 4+)
      const newIndexes = leistungenData.map((_, idx) => idx).slice(4);
      setFadeInIndexes(newIndexes);
      // Remove animation class after animation duration
      const timeout = setTimeout(() => setFadeInIndexes([]), 700);
      return () => clearTimeout(timeout);
    }
  }, [showAll]);

  // Handle collapse (fade-out)
  useEffect(() => {
    if (collapsing) {
      // Animate only the cards to be hidden (indexes 4+)
      const outIndexes = leistungenData.map((_, idx) => idx).slice(4);
      setFadeOutIndexes(outIndexes);
      // After animation, actually collapse
      const timeout = setTimeout(() => {
        setShowAll(false);
        setCollapsing(false);
        setFadeOutIndexes([]);
      }, 600); // match fade-out duration
      return () => clearTimeout(timeout);
    }
  }, [collapsing]);

  // --- Slide-in observer logic for cards ---
  useEffect(() => {
    // Reset shown state when visibleLeistungen changes
    setCardShown(Array(visibleLeistungen.length).fill(false));
    // eslint-disable-next-line
  }, [showAll, collapsing, visibleLeistungen.length]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    cardRefs.current.forEach((ref, idx) => {
      if (!ref) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setCardShown((prev) => {
                if (prev[idx]) return prev;
                const next = [...prev];
                next[idx] = true;
                return next;
              });
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(ref);
      observers.push(observer);
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, [visibleLeistungen.length]);

  // --- Slide-in observer logic for button ---
  useEffect(() => {
    if (!buttonRef.current) return;
    const observer = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setButtonShown(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );
    observer.observe(buttonRef.current);
    return () => observer.disconnect();
  }, [showAll, collapsing]);

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
          {visibleLeistungen.map((leistung, idx) => {
            let boxClass = 'leistung-box';
            if (showAll && idx >= 4 && fadeInIndexes.includes(idx)) {
              boxClass += ' fade-in';
            }
            if (collapsing && idx >= 4 && fadeOutIndexes.includes(idx)) {
              boxClass += ' fade-out';
            }
            // --- Slide-in animation ---
            boxClass += ' slide-in-left';
            if (cardShown[idx]) boxClass += ' show';
            return (
              <div
                className={boxClass}
                key={idx}
                ref={(el) => {
                  cardRefs.current[idx] = el;
                }}
              >
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
            );
          })}
        </div>
        {leistungenData.length > 4 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <button
              className={`show-more-leistungen-btn slide-in-left${
                buttonShown ? ' show' : ''
              }`}
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
              onClick={() => {
                if (showAll) {
                  setCollapsing(true);
                } else {
                  setShowAll(true);
                }
              }}
              disabled={collapsing}
              ref={buttonRef}
            >
              {showAll || collapsing
                ? 'Weniger anzeigen'
                : 'Weitere Leistungen'}
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

// Add new component for Recklinghausen details page
function RecklinghausenInfoPage() {
  const [boxesVisible, setBoxesVisible] = React.useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    const timer = setTimeout(() => setBoxesVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className='praxis-info-page'
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, var(--blue-100) 0%, var(--white) 100%)',
        backgroundAttachment: 'fixed',
        padding: '2.5rem 0',
      }}
    >
      <div
        className='praxis-info-boxes'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          marginBottom: '2.5rem',
        }}
      >
        {/* Contact Box */}
        <div
          className={
            `praxis-info-box leistung-box fade-in-box${
              boxesVisible ? ' show' : ''
            }` + (boxesVisible ? '' : '')
          }
          style={{
            flex: '1 1 320px',
            minWidth: 280,
            maxWidth: 400,
            background: '#fff',
            borderRadius: '1.2rem',
            boxShadow: '0 2px 12px rgba(98,190,204,0.09)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.1rem',
            textAlign: 'left',
            opacity: boxesVisible ? 1 : 0,
            animationDelay: boxesVisible ? '0.1s' : '0s',
          }}
        >
          <div
            className='praxis-info-title'
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '0.5rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Kontakt
          </div>
          <div>
            <span className='praxis-label'>Adresse:</span>
            <div>
              Bochumer Straße 124A,
              <br />
              45661 Recklinghausen
            </div>
          </div>
          <div>
            <span className='praxis-label'>Telefon:</span>
            <div>
              <a href='tel:02361653962'>02361 653962</a>
            </div>
          </div>
          <div>
            <span className='praxis-label'>E-Mail:</span>
            <div>
              <a href='mailto:info@neurologie-alkadi.de'>
                info@neurologie-alkadi.de
              </a>
            </div>
          </div>
          <div>
            <a
              href='https://www.doctolib.de/neurologie/recklinghausen/assad-alkadi'
              target='_blank'
              rel='noopener noreferrer'
              className='standort-btn'
              style={{
                marginTop: '0.7rem',
                padding: '0.5rem 1.2rem',
                borderRadius: '1.2rem',
                background: 'var(--blue-600)',
                color: '#fff',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Online-Termin vereinbaren
            </a>
          </div>
        </div>
        {/* Opening/Vacation/Replacement Box */}
        <div
          className={`praxis-info-box leistung-box fade-in-box delay-1${
            boxesVisible ? ' show' : ''
          }`}
          style={{
            flex: '1 1 320px',
            minWidth: 280,
            maxWidth: 400,
            background: '#fff',
            borderRadius: '1.2rem',
            boxShadow: '0 2px 12px rgba(98,190,204,0.09)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            alignItems: 'flex-start',
            textAlign: 'left',
            opacity: boxesVisible ? 1 : 0,
            animationDelay: boxesVisible ? '0.25s' : '0s',
          }}
        >
          <div
            className='praxis-info-title'
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '0.5rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Öffnungszeiten
          </div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <span className='praxis-label'>Öffnungszeiten:</span>
            <div>
              <b>Mo:</b> 8:00 - 14:30
            </div>
            <div>
              <b>Di, Do:</b> 8:00 - 12:00, 14:30 - 17:30
            </div>
            <div>
              <b>Mi:</b> 8:00 - 12:30
            </div>
            <div>
              <b>Fr:</b> 8:00 - 13:00
            </div>
          </div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <span className='praxis-label'>Urlaubszeiten:</span>
            <div>Urlaub vom 01.08.2025 bis 15.08.2025 (Platzhalter)</div>
            <div>Urlaub vom 23.12.2025 bis 01.01.2026 (Platzhalter)</div>
          </div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <span className='praxis-label'>Vertretungsärzte:</span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
                marginTop: '0.5rem',
                alignItems: 'center',
              }}
            >
              <div
                className='vertretungsarzt-box leistung-box'
                style={{
                  background: 'var(--blue-50)',
                  borderRadius: '0.8rem',
                  padding: '0.7rem 1rem',
                  boxShadow: '0 1px 4px rgba(98,190,204,0.07)',
                  textAlign: 'left',
                  width: '100%',
                  maxWidth: 320,
                }}
              >
                <div style={{ fontWeight: 600 }}>Dr. Max Mustermann</div>
                <div>Beispielstraße 1, 12345 Musterstadt</div>
                <div>Tel: 01234 567890</div>
              </div>
              <div
                className='vertretungsarzt-box leistung-box'
                style={{
                  background: 'var(--blue-50)',
                  borderRadius: '0.8rem',
                  padding: '0.7rem 1rem',
                  boxShadow: '0 1px 4px rgba(98,190,204,0.07)',
                  textAlign: 'left',
                  width: '100%',
                  maxWidth: 320,
                }}
              >
                <div style={{ fontWeight: 600 }}>Dr. Erika Musterfrau</div>
                <div>Anderweg 2, 54321 Beispielstadt</div>
                <div>Tel: 09876 543210</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Placeholder for more content about the practice */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '2.5rem 0',
        }}
        className='praxis-map-responsive'
      >
        <a
          href='https://www.google.com/maps/search/?api=1&query=Bochumer+Stra%C3%9Fe+124A%2C+45661+Recklinghausen'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            display: 'block',
            width: '100%',
            maxWidth: 840,
            borderRadius: '1rem',
            overflow: 'hidden',
          }}
        >
          <iframe
            title='Praxis Standort Karte'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.393964479836!2d7.186000076789839!3d51.58780097178213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e3e2e2e2e2e3%3A0x123456789abcdef!2sBochumer%20Stra%C3%9Fe%20124A%2C%2045661%20Recklinghausen!5e0!3m2!1sde!2sde!4v1710000000000!5m2!1sde!2sde'
            width='100%'
            height='350'
            style={{ border: 0, display: 'block' }}
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </a>
      </div>
      {/* Praxis image gallery below the map */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 0 2.5rem 0',
        }}
        className='praxis-carousel-responsive'
      >
        <PraxisImageCarousel />
      </div>
    </div>
  );
}

// Add new component for Oer-Erkenschwick details page
function OerErkenschwickInfoPage() {
  const [boxesVisible, setBoxesVisible] = React.useState(false);
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  React.useEffect(() => {
    const timer = setTimeout(() => setBoxesVisible(true), 50);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className='praxis-info-page'
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(180deg, var(--blue-100) 0%, var(--white) 100%)',
        backgroundAttachment: 'fixed',
        padding: '2.5rem 0',
      }}
    >
      <div
        className='praxis-info-boxes'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          justifyContent: 'center',
          marginBottom: '2.5rem',
        }}
      >
        {/* Contact Box */}
        <div
          className={
            `praxis-info-box leistung-box fade-in-box${
              boxesVisible ? ' show' : ''
            }` + (boxesVisible ? '' : '')
          }
          style={{
            flex: '1 1 320px',
            minWidth: 280,
            maxWidth: 400,
            background: '#fff',
            borderRadius: '1.2rem',
            boxShadow: '0 2px 12px rgba(98,190,204,0.09)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: '1.1rem',
            textAlign: 'left',
            opacity: boxesVisible ? 1 : 0,
            animationDelay: boxesVisible ? '0.1s' : '0s',
          }}
        >
          <div
            className='praxis-info-title'
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '0.5rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Kontakt
          </div>
          <div>
            <span className='praxis-label'>Adresse:</span>
            <div>
              Konrad-Adenauer-Straße 13,
              <br />
              45739 Oer-Erkenschwick
            </div>
          </div>
          <div>
            <span className='praxis-label'>Telefon:</span>
            <div>
              <a href='tel:023688920049'>02368 8920049</a>
            </div>
          </div>
          <div>
            <span className='praxis-label'>E-Mail:</span>
            <div>
              <a href='mailto:info@neurologie-alkadi.de'>
                info@neurologie-alkadi.de
              </a>
            </div>
          </div>
          <div>
            <a
              href='https://www.doctolib.de/einzelpraxis/oer-erkenschwick/neurologiepraxis-dr-alkadi?pid=practice-541381&utm_source=google_appointment_redirect&utm_campaign=gmb&utm_medium=organic&hl=en-DE&gei=-tZqaOH2N--sxc8PmqHj8AM&rwg_token=ACgRB3fIYmRhI1ib8gqsCRTFIg0C_lv9tP8x0CxMnr1rxa_xL_A5NL7uwS8trBL8uNOC8jPXBeoauSnb0WasJlooxzx9qm16cw%3D%3D'
              target='_blank'
              rel='noopener noreferrer'
              className='standort-btn'
              style={{
                marginTop: '0.7rem',
                padding: '0.5rem 1.2rem',
                borderRadius: '1.2rem',
                background: 'var(--blue-600)',
                color: '#fff',
                fontWeight: 600,
                textDecoration: 'none',
                display: 'inline-block',
              }}
            >
              Online-Termin vereinbaren
            </a>
          </div>
        </div>
        {/* Opening/Vacation/Replacement Box */}
        <div
          className={`praxis-info-box leistung-box fade-in-box delay-1${
            boxesVisible ? ' show' : ''
          }`}
          style={{
            flex: '1 1 320px',
            minWidth: 280,
            maxWidth: 400,
            background: '#fff',
            borderRadius: '1.2rem',
            boxShadow: '0 2px 12px rgba(98,190,204,0.09)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.1rem',
            alignItems: 'flex-start',
            textAlign: 'left',
            opacity: boxesVisible ? 1 : 0,
            animationDelay: boxesVisible ? '0.25s' : '0s',
          }}
        >
          <div
            className='praxis-info-title'
            style={{
              fontWeight: 700,
              fontSize: '1.25rem',
              marginBottom: '0.5rem',
              width: '100%',
              textAlign: 'center',
            }}
          >
            Öffnungszeiten
          </div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <span className='praxis-label'>Öffnungszeiten:</span>
            <div>
              <b>Mo, Di, Do:</b> 9:00 - 17:00
            </div>
            <div>
              <b>Mi, Fr:</b> 9:00 - 13:00
            </div>
          </div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <span className='praxis-label'>Urlaubszeiten:</span>
            <div>Urlaub vom 10.07.2025 bis 24.07.2025 (Platzhalter)</div>
            <div>Urlaub vom 24.12.2025 bis 02.01.2026 (Platzhalter)</div>
          </div>
          <div style={{ textAlign: 'left', width: '100%' }}>
            <span className='praxis-label'>Vertretungsärzte:</span>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.7rem',
                marginTop: '0.5rem',
                alignItems: 'center',
              }}
            >
              <div
                className='vertretungsarzt-box leistung-box'
                style={{
                  background: 'var(--blue-50)',
                  borderRadius: '0.8rem',
                  padding: '0.7rem 1rem',
                  boxShadow: '0 1px 4px rgba(98,190,204,0.07)',
                  textAlign: 'left',
                  width: '100%',
                  maxWidth: 320,
                }}
              >
                <div style={{ fontWeight: 600 }}>Dr. Anna Beispiel</div>
                <div>Praxisweg 3, 45739 Oer-Erkenschwick</div>
                <div>Tel: 02368 111222</div>
              </div>
              <div
                className='vertretungsarzt-box leistung-box'
                style={{
                  background: 'var(--blue-50)',
                  borderRadius: '0.8rem',
                  padding: '0.7rem 1rem',
                  boxShadow: '0 1px 4px rgba(98,190,204,0.07)',
                  textAlign: 'left',
                  width: '100%',
                  maxWidth: 320,
                }}
              >
                <div style={{ fontWeight: 600 }}>Dr. Bernd Muster</div>
                <div>Beispielallee 4, 45657 Recklinghausen</div>
                <div>Tel: 02361 333444</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Placeholder for more content about the practice */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '2.5rem 0',
        }}
        className='praxis-map-responsive'
      >
        <a
          href='https://www.google.com/maps/search/?api=1&query=Konrad-Adenauer-Stra%C3%9Fe+13%2C+45739+Oer-Erkenschwick'
          target='_blank'
          rel='noopener noreferrer'
          style={{
            display: 'block',
            width: '100%',
            maxWidth: 840,
            borderRadius: '1rem',
            overflow: 'hidden',
          }}
        >
          <iframe
            title='Praxis Standort Karte'
            src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.393964479836!2d7.246000076789839!3d51.64280097178213!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e3e2e2e2e2e4%3A0xabcdef123456789!2sKonrad-Adenauer-Stra%C3%9Fe%2013%2C%2045739%20Oer-Erkenschwick!5e0!3m2!1sde!2sde!4v1710000000001!5m2!1sde!2sde'
            width='100%'
            height='350'
            style={{ border: 0, display: 'block' }}
            allowFullScreen={true}
            loading='lazy'
            referrerPolicy='no-referrer-when-downgrade'
          ></iframe>
        </a>
      </div>
      {/* Praxis image gallery below the map */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          margin: '0 0 2.5rem 0',
        }}
        className='praxis-carousel-responsive'
      >
        <PraxisImageCarousel />
      </div>
    </div>
  );
}

// Add this component above RecklinghausenInfoPage
function PraxisImageCarousel() {
  const images = [
    { src: arztBild, alt: 'Praxis Innenansicht 1' },
    { src: logo, alt: 'Praxis Innenansicht 2' },
  ];
  const [current, setCurrent] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);

  const handlePrev = () => {
    setCurrent((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };
  const handleNext = () => {
    setCurrent((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // Scroll to current image
  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        left: scrollRef.current.offsetWidth * current,
        behavior: 'smooth',
      });
    }
  }, [current]);

  // Touch/swipe support
  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    let startX = 0;
    let scrollStart = 0;
    let isDragging = false;
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      scrollStart = el.scrollLeft;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const dx = startX - e.touches[0].clientX;
      el.scrollLeft = scrollStart + dx;
    };
    const onTouchEnd = () => {
      isDragging = false;
      // Snap to closest image
      const idx = Math.round(el.scrollLeft / el.offsetWidth);
      setCurrent(idx);
    };
    el.addEventListener('touchstart', onTouchStart);
    el.addEventListener('touchmove', onTouchMove);
    el.addEventListener('touchend', onTouchEnd);
    return () => {
      el.removeEventListener('touchstart', onTouchStart);
      el.removeEventListener('touchmove', onTouchMove);
      el.removeEventListener('touchend', onTouchEnd);
    };
  }, []);

  if (typeof window !== 'undefined') {
    const style = document.createElement('style');
    style.innerHTML = `
      .praxis-carousel-scroll::-webkit-scrollbar { display: none; }
      .praxis-carousel-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);
  }

  return (
    <div
      style={{
        width: '100%',
        maxWidth: 840,
        position: 'relative',
        borderRadius: '1rem',
        overflow: 'hidden',
      }}
      className='praxis-carousel-responsive'
    >
      <div
        ref={scrollRef}
        style={{
          display: 'flex',
          overflowX: 'auto',
          scrollSnapType: 'x mandatory',
          width: '100%',
          height: 320,
          scrollbarWidth: 'none', // Firefox
          msOverflowStyle: 'none', // IE/Edge
        }}
        className='praxis-carousel-scroll'
      >
        {images.map((img, idx) => (
          <img
            key={idx}
            src={img.src}
            alt={img.alt}
            style={{
              width: '100%',
              minWidth: '100%',
              maxWidth: '100%',
              height: 320,
              objectFit: 'cover',
              borderRadius: '1rem',
              scrollSnapAlign: 'start',
              transition: 'box-shadow 0.2s',
              boxShadow:
                idx === current ? '0 2px 12px rgba(98,190,204,0.13)' : 'none',
            }}
          />
        ))}
      </div>
      {/* Left/Right buttons */}
      {images.length > 1 && (
        <>
          <span
            onClick={handlePrev}
            style={{
              position: 'absolute',
              top: '50%',
              left: 18,
              transform: 'translateY(-50%)',
              color: 'var(--blue-600)',
              cursor: 'pointer',
              userSelect: 'none',
              zIndex: 2,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
            }}
            aria-label='Vorheriges Bild'
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handlePrev();
            }}
          >
            <svg
              width='38'
              height='38'
              viewBox='0 0 38 38'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <polyline
                points='24 8 14 19 24 30'
                stroke='var(--blue-600)'
                strokeWidth='3.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='none'
              />
            </svg>
          </span>
          <span
            onClick={handleNext}
            style={{
              position: 'absolute',
              top: '50%',
              right: 18,
              transform: 'translateY(-50%)',
              color: 'var(--blue-600)',
              cursor: 'pointer',
              userSelect: 'none',
              zIndex: 2,
              lineHeight: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
            }}
            aria-label='Nächstes Bild'
            role='button'
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') handleNext();
            }}
          >
            <svg
              width='38'
              height='38'
              viewBox='0 0 38 38'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <polyline
                points='14 8 24 19 14 30'
                stroke='var(--blue-600)'
                strokeWidth='3.5'
                strokeLinecap='round'
                strokeLinejoin='round'
                fill='none'
              />
            </svg>
          </span>
        </>
      )}
      {/* Dots */}
      <div
        style={{
          position: 'absolute',
          bottom: 12,
          left: 0,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          gap: 8,
        }}
      >
        {images.map((_, idx) => (
          <span
            key={idx}
            style={{
              width: 10,
              height: 10,
              borderRadius: '50%',
              background: idx === current ? 'var(--blue-600)' : '#c2e4ec',
              display: 'inline-block',
              transition: 'background 0.2s',
            }}
          />
        ))}
      </div>
    </div>
  );
}

// Remove the old fixed logo div and header bar, replace with a single header
function MainHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  // Only use location for scroll-to-top logic
  const location = useLocation();
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

  // Handler for logo click
  const handleLogoClick = (e: React.MouseEvent) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // Let <Link> handle navigation, but also scroll to top after navigation
      // (React Router v6+ will remount MainPage, but for safety)
      // No need to call navigate here, <Link> will do it
    }
  };

  return (
    <header className='main-header-bar'>
      <Link to='/'>
        <img
          src={logo}
          alt='Alkadi Logo'
          className='main-header-logo'
          onClick={handleLogoClick}
          style={{ cursor: 'pointer' }}
        />
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
        <Link
          to='/praxis/recklinghausen'
          className='mobile-nav-link'
          onClick={() => setMenuOpen(false)}
        >
          Recklinghausen
        </Link>
        <Link
          to='/praxis/oer-erkenschwick'
          className='mobile-nav-link'
          onClick={() => setMenuOpen(false)}
        >
          Oer-Erkenschwick
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

  // Animation state for slide-in
  const [showRecklinghausenImg, setShowRecklinghausenImg] = useState(false);
  const [showRecklinghausenText, setShowRecklinghausenText] = useState(false);
  const [showOerImg, setShowOerImg] = useState(false);
  const [showOerText, setShowOerText] = useState(false);

  // Refs for intersection observer
  const recklinghausenImgRef = useRef<HTMLImageElement>(
    null
  ) as React.RefObject<HTMLImageElement>;
  const recklinghausenTextRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;
  const oerImgRef = useRef<HTMLImageElement>(
    null
  ) as React.RefObject<HTMLImageElement>;
  const oerTextRef = useRef<HTMLDivElement>(
    null
  ) as React.RefObject<HTMLDivElement>;

  useEffect(() => {
    // Helper to observe and trigger animation
    function observeAndSet<T extends Element>(
      ref: React.RefObject<T>,
      setter: React.Dispatch<React.SetStateAction<boolean>>,
      delay: number = 0
    ) {
      if (!ref.current) return;
      const observer = new window.IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => setter(true), delay);
              observer.disconnect();
            }
          });
        },
        { threshold: 0.3 }
      );
      observer.observe(ref.current);
    }
    observeAndSet(recklinghausenImgRef, setShowRecklinghausenImg);
    observeAndSet(recklinghausenTextRef, setShowRecklinghausenText, 200);
    observeAndSet(oerImgRef, setShowOerImg);
    observeAndSet(oerTextRef, setShowOerText, 200);
  }, []);

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
            ref={recklinghausenImgRef}
            src={arztBild}
            alt='Recklinghausen Arzt'
            className={`standort-img slide-in-left${
              showRecklinghausenImg ? ' show' : ''
            }`}
          />
          <div
            ref={recklinghausenTextRef}
            className={`standort-info slide-in-left-text${
              showRecklinghausenText ? ' show' : ''
            }`}
          >
            <div className='standort-title'>Recklinghausen</div>
            <div className='standort-doctor' style={{ marginBottom: '0.3em' }}>
              Dr. med. Assad Al Kadi
            </div>
            <div className='standort-details'>
              <span className='praxis-label'>Öffnungszeiten</span>
              <div>
                <b>Mo:</b> 8:00 - 14:30
              </div>
              <div>
                <b>Di, Do:</b> 8:00 - 12:00, 14:30 - 17:30
              </div>
              <div>
                <b>Mi:</b> 8:00 - 12:30
              </div>
              <div>
                <b>Fr:</b> 8:00 - 13:00
              </div>
              <span className='praxis-label'>Adresse</span>
              <div>
                Bochumer Straße 124A,
                <br /> 45661 Recklinghausen
              </div>
              <span className='praxis-label'>Telefon</span>
              <div>02361 653962</div>
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
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </section>
      <section id='oer-erkenschwick' className='standort-section'>
        <div className='standort-content'>
          <img
            ref={oerImgRef}
            src={arztBild}
            alt='Oer-Erkenschwick Arzt'
            className={`standort-img slide-in-left${showOerImg ? ' show' : ''}`}
          />
          <div
            ref={oerTextRef}
            className={`standort-info slide-in-left-text${
              showOerText ? ' show' : ''
            }`}
          >
            <div className='standort-title'>Oer-Erkenschwick</div>
            <div className='standort-doctor' style={{ marginBottom: '0.3em' }}>
              Dr. med. Hazem Al Kadi
            </div>
            <div className='standort-details'>
              <span className='praxis-label'>Öffnungszeiten</span>
              <div>
                <b>Mo, Di, Do:</b> 9:00 - 17:00
              </div>
              <div>
                <b>Mi, Fr:</b> 9:00 - 13:00
              </div>
              <span className='praxis-label'>Adresse</span>
              <div>
                Konrad-Adenauer-Straße 13,
                <br /> 45739 Oer-Erkenschwick
              </div>
              <span className='praxis-label'>Telefon</span>
              <div>02368 8920049</div>
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
                Mehr erfahren
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

// --- Add Impressum Page ---
function ImpressumPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section
      className='impressum-datenschutz-page animated-hero no-bg'
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1 className='hero-title animated-text'>Impressum</h1>
      <div
        className='hero-desc animated-text'
        style={{
          marginBottom: '2.2rem',
          fontSize: '1.1rem',
          color: '#333',
          textAlign: 'left',
          maxWidth: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <b>Angaben gemäß § 5 TMG</b>
        <br />
        <br />
        Dr. med. Assad Al Kadi & Hazem Al Kadi
        <br />
        Musterstraße 1<br />
        45657 Recklinghausen
        <br />
        <br />
        Telefon: 02361 123456
        <br />
        E-Mail: info@neurologie-alkadi.de
        <br />
        <br />
        <b>Berufsbezeichnung:</b> Facharzt für Neurologie (verliehen in
        Deutschland)
        <br />
        <b>Zuständige Kammer:</b> Ärztekammer Westfalen-Lippe
        <br />
        <b>Aufsichtsbehörde:</b> Kassenärztliche Vereinigung Westfalen-Lippe
        <br />
        <br />
        <b>Haftungsausschluss:</b>
        <br />
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich.
        <br />
        <br />
        <b>Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV:</b>
        <br />
        Dr. med. Assad Al Kadi & Hazem Al Kadi
        <br />
        Musterstraße 1, 45657 Recklinghausen
      </div>
    </section>
  );
}

// --- Add Datenschutz Page ---
function DatenschutzPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section
      className='impressum-datenschutz-page animated-hero no-bg'
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2.5rem 1rem',
        maxWidth: 900,
        margin: '0 auto',
        textAlign: 'center',
      }}
    >
      <h1 className='hero-title animated-text'>Datenschutzerklärung</h1>
      <div
        className='hero-desc animated-text'
        style={{
          marginBottom: '2.2rem',
          fontSize: '1.1rem',
          color: '#333',
          textAlign: 'left',
          maxWidth: 700,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}
      >
        <b>Datenschutz</b>
        <br />
        <br />
        Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
        Personenbezogene Daten werden auf dieser Webseite nur im technisch
        notwendigen Umfang erhoben. In keinem Fall werden die erhobenen Daten
        verkauft oder aus anderen Gründen an Dritte weitergegeben.
        <br />
        <br />
        <b>Verantwortliche Stelle:</b>
        <br />
        Dr. med. Assad Al Kadi & Hazem Al Kadi
        <br />
        Musterstraße 1, 45657 Recklinghausen
        <br />
        <br />
        <b>Erhebung und Verarbeitung von Daten:</b>
        <br />
        Beim Besuch dieser Website werden automatisch Informationen in
        Server-Logfiles gespeichert, die Ihr Browser an uns übermittelt. Diese
        Daten sind nicht bestimmten Personen zuordenbar. Eine Zusammenführung
        dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
        <br />
        <br />
        <b>Auskunftsrecht:</b>
        <br />
        Sie haben jederzeit das Recht auf Auskunft über die bezüglich Ihrer
        Person gespeicherten Daten, deren Herkunft und Empfänger sowie den Zweck
        der Speicherung.
        <br />
        <br />
        <b>Weitere Informationen:</b>
        <br />
        Ihr Vertrauen ist uns wichtig. Daher möchten wir Ihnen jederzeit Rede
        und Antwort bezüglich der Verarbeitung Ihrer personenbezogenen Daten
        stehen. Wenn Sie Fragen haben, die Ihnen diese Datenschutzerklärung
        nicht beantworten konnte, wenden Sie sich gerne jederzeit an uns.
        <br />
      </div>
    </section>
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
          <span style={{ margin: '0 0.7rem', color: '#bbb' }}>|</span>
          <Link to='/praxis/recklinghausen' className='footer-link'>
            Recklinghausen
          </Link>
          <span style={{ margin: '0 0.7rem', color: '#bbb' }}>|</span>
          <Link to='/praxis/oer-erkenschwick' className='footer-link'>
            Oer-Erkenschwick
          </Link>
          <span style={{ margin: '0 0.7rem', color: '#bbb' }}>|</span>
          {/* Add Impressum and Datenschutz links */}
          <Link to='/impressum' className='footer-link'>
            Impressum
          </Link>
          <span style={{ margin: '0 0.7rem', color: '#bbb' }}>|</span>
          <Link to='/datenschutz' className='footer-link'>
            Datenschutz
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
        <Route
          path='/praxis/recklinghausen'
          element={<RecklinghausenInfoPage />}
        />
        <Route
          path='/praxis/oer-erkenschwick'
          element={<OerErkenschwickInfoPage />}
        />
        {/* Add Impressum and Datenschutz routes */}
        <Route path='/impressum' element={<ImpressumPage />} />
        <Route path='/datenschutz' element={<DatenschutzPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

// Add this style at the top of the file, after imports, to make map and carousel smaller on mobile
if (typeof window !== 'undefined') {
  const style = document.createElement('style');
  style.innerHTML = `
    .praxis-carousel-scroll::-webkit-scrollbar { display: none; }
    .praxis-carousel-scroll { -ms-overflow-style: none; scrollbar-width: none; }
    @media (max-width: 600px) {
      .praxis-map-responsive, .praxis-carousel-responsive {
        max-width: 94vw !important;
        height: 140px !important;
        margin-left: auto !important;
        margin-right: auto !important;
      }
      .praxis-carousel-responsive img {
        height: 140px !important;
      }
    }
  `;
  document.head.appendChild(style);
}
