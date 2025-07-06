import './App.css';
import logo from './assets/logo.png';
import arztBild from './assets/Arzt Bild von Usman Yousaf.jpg';

function App() {
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 10,
          padding: '2rem 0 0 2rem',
        }}
      >
        <img
          src={logo}
          alt='Alkadi Logo'
          style={{ height: '5rem', width: 'auto' }}
        />
      </div>
      <section
        className='hero'
        style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}
      >
        <h1 className='hero-title'>
          Willkommen bei Ihren Fachärzten für Neurologie
          <br />
          <span className='hero-title-blue'>
            Dr. med. Assad Al Kadi & Hazem Al Kadi
          </span>
        </h1>
        <h2 className='hero-desc'>
          Modernste neurologische Diagnostik und Behandlung an zwei Standorten.
          Wählen Sie Ihre bevorzugte Praxis für weitere Informationen.
        </h2>
        <div className='location-buttons'>
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
      </section>
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
              <button className='standort-btn standort-btn-small'>
                Termin vereinbaren
              </button>
              <button className='standort-btn standort-btn-secondary standort-btn-small'>
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
              <button className='standort-btn standort-btn-small'>
                Termin vereinbaren
              </button>
              <button className='standort-btn standort-btn-secondary standort-btn-small'>
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

export default App;
