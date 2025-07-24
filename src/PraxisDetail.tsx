import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';

const PRAXIS_DATA = {
  recklinghausen: {
    name: 'Recklinghausen',
    images: [
      'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80',
    ],
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.432!2d7.197!3d51.614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e2b2b2b2b2b2%3A0x1234567890abcdef!2sRecklinghausen!5e0!3m2!1sen!2sde!4v1234567890',
    kontakt: {
      adresse: 'Musterstraße 1, 45657 Recklinghausen',
      telefon: '02361 123456',
      email: 'info@neurologie-alkadi.de',
    },
    zeiten: [
      { tag: 'Mo, Di, Do', zeit: '9 am–5 pm' },
      { tag: 'Mi, Fr', zeit: '9 am–1 pm' },
      { tag: 'Sa, So', zeit: 'geschlossen' },
    ],
    info: 'Die Praxis in Recklinghausen bietet moderne neurologische Diagnostik und individuelle Betreuung in freundlicher Atmosphäre.',
  },
  'oer-erkenschwick': {
    name: 'Oer-Erkenschwick',
    images: [
      'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
      'https://images.unsplash.com/photo-1511174511562-5f97f2b2e2b9?auto=format&fit=crop&w=600&q=80',
    ],
    mapEmbed:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2522.432!2d7.197!3d51.614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b8e2b2b2b2b2b2%3A0xabcdefabcdefabcd!2sOer-Erkenschwick!5e0!3m2!1sen!2sde!4v1234567890',
    kontakt: {
      adresse: 'Beispielweg 2, 45739 Oer-Erkenschwick',
      telefon: '02368 654321',
      email: 'info@neurologie-alkadi.de',
    },
    zeiten: [
      { tag: 'Mo, Di, Do', zeit: '9 am–5 pm' },
      { tag: 'Mi, Fr', zeit: '9 am–1 pm' },
      { tag: 'Sa, So', zeit: 'geschlossen' },
    ],
    info: 'Die Praxis in Oer-Erkenschwick steht für kompetente neurologische Versorgung und persönliche Beratung.',
  },
};

export default function PraxisDetail() {
  const { praxisId } = useParams();
  const praxis = PRAXIS_DATA[praxisId as keyof typeof PRAXIS_DATA];
  const [imgIdx, setImgIdx] = useState(0);
  const touchStartX = useRef<number | null>(null);

  if (!praxis) return <div>Praxis nicht gefunden.</div>;

  const handlePrev = () =>
    setImgIdx((idx) => (idx === 0 ? praxis.images.length - 1 : idx - 1));
  const handleNext = () =>
    setImgIdx((idx) => (idx === praxis.images.length - 1 ? 0 : idx + 1));

  // Touch swipe handlers
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) handlePrev();
    if (deltaX < -50) handleNext();
    touchStartX.current = null;
  };

  return (
    <div
      className='praxis-detail-page'
      style={{ maxWidth: 900, margin: '0 auto', padding: '2rem 1rem' }}
    >
      <h1 className='praxis-title'>{praxis.name}</h1>
      <div
        className='praxis-gallery-carousel'
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginBottom: '1.5rem',
          position: 'relative',
          width: '100%',
          maxWidth: 600,
        }}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        <div
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 500,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {praxis.images.length > 1 && (
            <button
              aria-label='Vorheriges Bild'
              onClick={handlePrev}
              style={{
                position: 'absolute',
                left: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                borderRadius: 0,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 36,
                color: '#62becc',
                zIndex: 2,
              }}
            >
              &#8592;
            </button>
          )}
          <img
            src={praxis.images[imgIdx]}
            alt={praxis.name + ' Bild ' + (imgIdx + 1)}
            style={{
              width: '100%',
              maxWidth: 500,
              height: 'auto',
              aspectRatio: '5/3',
              objectFit: 'cover',
              borderRadius: '1rem',
              boxShadow: '0 2px 8px rgba(98,190,204,0.08)',
              display: 'block',
              margin: '0 auto',
            }}
          />
          {praxis.images.length > 1 && (
            <button
              aria-label='Nächstes Bild'
              onClick={handleNext}
              style={{
                position: 'absolute',
                right: 0,
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                borderRadius: 0,
                width: 36,
                height: 36,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                fontSize: 36,
                color: '#62becc',
                zIndex: 2,
              }}
            >
              &#8594;
            </button>
          )}
        </div>
        {praxis.images.length > 1 && (
          <div
            style={{
              display: 'flex',
              gap: 6,
              marginTop: 12,
              justifyContent: 'center',
            }}
          >
            {praxis.images.map((_, i) => (
              <span
                key={i}
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: '50%',
                  background: i === imgIdx ? '#62becc' : '#cce6ea',
                  display: 'inline-block',
                }}
              />
            ))}
          </div>
        )}
      </div>
      <div
        className='praxis-info-blocks'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '2rem',
          marginBottom: '2rem',
        }}
      >
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2>Kontakt</h2>
          <div>
            <b>Adresse:</b> {praxis.kontakt.adresse}
          </div>
          <div>
            <b>Telefon:</b>{' '}
            <a href={`tel:${praxis.kontakt.telefon}`}>
              {praxis.kontakt.telefon}
            </a>
          </div>
          <div>
            <b>E-Mail:</b>{' '}
            <a href={`mailto:${praxis.kontakt.email}`}>
              {praxis.kontakt.email}
            </a>
          </div>
        </div>
        <div style={{ flex: 1, minWidth: 220 }}>
          <h2>Öffnungszeiten</h2>
          {praxis.zeiten.map((z, i) => (
            <div key={i}>
              <b>{z.tag}:</b> {z.zeit}
            </div>
          ))}
        </div>
      </div>
      <div className='praxis-map' style={{ marginBottom: '2rem' }}>
        <h2>Standort</h2>
        <iframe
          src={praxis.mapEmbed}
          width='100%'
          height='250'
          style={{ border: 0, borderRadius: '1rem' }}
          allowFullScreen
          loading='lazy'
          title={'Karte ' + praxis.name}
        ></iframe>
      </div>
      <div
        className='praxis-info'
        style={{ fontSize: '1.1rem', color: '#444', marginTop: '1.5rem' }}
      >
        {praxis.info}
      </div>
    </div>
  );
}
