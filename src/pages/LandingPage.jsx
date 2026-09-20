import React from 'react';

export const LandingPage = ({ navigateTo, t }) => {
  return (
    <div className="page-container" style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heading}>{t.heroHeading}</h1>
        <p style={styles.desc}>{t.heroDesc}</p>
        <button style={styles.ctaBtn} onClick={() => navigateTo('create')}>
          {t.navWrite} →
        </button>
      </div>

      <div style={styles.section}>
        <h3>{t.ruleTitle}</h3>
        <p style={{ color: '#665A4E', lineHeight: '1.6' }}>{t.ruleDesc}</p>
      </div>
    </div>
  );
};

const styles = {
  container: { maxWidth: '750px', margin: '0 auto', padding: '40px 20px', textAlign: 'center' },
  hero: { padding: '40px 0' },
  heading: { fontSize: '2.4rem', color: '#3A322C', marginBottom: '20px', fontFamily: 'Georgia, serif' },
  desc: { fontSize: '1.1rem', color: '#6A5D52', lineHeight: '1.7', marginBottom: '32px' },
  ctaBtn: { background: '#A0522D', color: '#fff', border: 'none', padding: '16px 36px', fontSize: '1.1rem', borderRadius: '30px', cursor: 'pointer' },
  section: { marginTop: '40px', background: '#FAF6EF', padding: '30px', borderRadius: '16px', border: '1px solid #EAE3D9' }
};