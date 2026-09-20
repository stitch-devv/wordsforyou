import React from 'react';

export const StoryCard = ({ poemText, poemAuthor, recipient, sender, note, cardRef }) => {
  return (
    <div ref={cardRef} style={styles.cardWrapper}>
      <div style={styles.header}>for {recipient || 'You'}</div>
      
      <div style={styles.divider}></div>
      
      <div style={styles.poemText}>
        «{poemText}»
      </div>
      
      <div style={styles.author}>— {poemAuthor}</div>

      {note && (
        <div style={styles.personalBlock}>
          <div style={styles.subDivider}></div>
          <div style={styles.noteText}>"{note}"</div>
        </div>
      )}

      <div style={styles.footer}>
        <span>from {sender || 'Anonymous'}</span>
        <span style={styles.brand}>WORDS FOR YOU</span>
      </div>
    </div>
  );
};

const styles = {
  cardWrapper: {
    width: '320px',
    minHeight: '480px',
    background: '#FFFDF9',
    border: '1px solid #EADEC9',
    borderRadius: '16px',
    padding: '36px 28px',
    boxShadow: '0 10px 30px rgba(0,0,0,0.04)',
    display: 'flex',
    flexDirection: 'column',
    justify: 'space-between',
    margin: '0 auto',
    fontFamily: 'Georgia, serif'
  },
  header: { fontSize: '1.2rem', color: '#A0522D', fontStyle: 'italic', textAlign: 'center' },
  divider: { height: '1px', background: '#EADEC9', margin: '16px auto', width: '60%' },
  subDivider: { height: '1px', background: '#F0E6D2', margin: '12px auto', width: '40%' },
  poemText: { fontSize: '0.95rem', lineHeight: '1.6', color: '#2C2520', whiteSpace: 'pre-line', textAlign: 'center' },
  author: { textAlign: 'right', fontSize: '0.85rem', color: '#8C7A6B', marginTop: '12px', fontWeight: 'bold' },
  personalBlock: { marginTop: '16px', background: '#FAF6EF', padding: '12px', borderRadius: '8px' },
  noteText: { fontSize: '0.9rem', color: '#4A3E3D', fontStyle: 'italic', textAlign: 'center' },
  footer: { display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#A09383', marginTop: '24px', fontFamily: 'sans-serif' },
  brand: { fontWeight: 'bold', letterSpacing: '0.5px' }
};