// src/pages/LetterPage.jsx
import React, { useState } from 'react';

export const LetterPage = ({ letter, navigateTo }) => {
  const [copyStatus, setCopyStatus] = useState('');

  // 1. Копировать как текст
  const handleCopyText = () => {
    if (!letter) return;
    const authorName = letter.poem_author || letter.sender || 'Аноним';
    const textToCopy = `"${letter.poem_text}"\n\n— Автор: ${authorName}\nДля: ${letter.recipient || 'Кому-то важному'}\nОт: ${letter.sender || 'Аноним'}`;

    navigator.clipboard.writeText(textToCopy);
    setCopyStatus('Текст скопирован!');
    setTimeout(() => setCopyStatus(''), 2500);
  };

  // 2. Копировать ссылку на письмо
  const handleCopyLink = () => {
    const fullUrl = `${window.location.origin}${window.location.pathname}#letter/${letter?.id}`;
    navigator.clipboard.writeText(fullUrl);
    setCopyStatus('Ссылка скопирована!');
    setTimeout(() => setCopyStatus(''), 2500);
  };

  if (!letter) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <h3>Письмо не найдено или загружается...</h3>
        <button onClick={() => navigateTo('gallery')} style={styles.actionBtn}>
          🖼️ Перейти в галерею
        </button>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '650px', margin: '0 auto', padding: '20px', textAlign: 'center' }}>
      
      {/* Карточка-открытка */}
      <div style={styles.card}>
        {letter.recipient && (
          <div style={styles.recipient}>Дорогой(ая) {letter.recipient},</div>
        )}

        <p style={styles.poemText}>"{letter.poem_text}"</p>

        {/* Имя автора песни / стихотворения */}
        <div style={styles.author}>
          — {letter.poem_author || letter.sender || 'Аноним'}
        </div>

        {letter.note && (
          <div style={styles.note}>
            <small>Записка: {letter.note}</small>
          </div>
        )}

        {letter.sender && (
          <div style={styles.sender}>От кого: {letter.sender}</div>
        )}
      </div>

      {/* Уведомление о скопированном тексте/ссылке */}
      {copyStatus && <div style={styles.copyNotice}>{copyStatus}</div>}

      {/* 🔘 ТРИ КНОПКИ ДЕЙСТВИЙ */}
      <div style={styles.btnGroup}>
        <button onClick={handleCopyText} style={styles.actionBtn}>
          📋 Скопировать как текст
        </button>
        
        <button onClick={handleCopyLink} style={styles.actionBtn}>
          🔗 Скопировать ссылку
        </button>

        <button onClick={() => navigateTo('gallery')} style={{ ...styles.actionBtn, background: '#6A5D52' }}>
          🖼️ В галерею
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    backgroundColor: '#FAF6EF',
    border: '1px solid #EAE3D9',
    borderRadius: '16px',
    padding: '35px 25px',
    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
    marginBottom: '25px',
    lineHeight: '1.6'
  },
  recipient: { fontSize: '1.1rem', color: '#A0522D', fontWeight: 'bold', marginBottom: '15px' },
  poemText: { fontSize: '1.15rem', color: '#2C2523', whiteSpace: 'pre-line', fontStyle: 'italic', margin: '20px 0' },
  author: { fontSize: '0.95rem', color: '#8C6D58', fontWeight: 'bold', textAlign: 'right', marginTop: '10px' },
  note: { marginTop: '15px', color: '#665A4E', borderTop: '1px dashed #EAE3D9', paddingTop: '10px' },
  sender: { fontSize: '0.9rem', color: '#8C6D58', marginTop: '8px', textAlign: 'right' },
  btnGroup: { display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' },
  actionBtn: {
    padding: '12px 20px',
    background: '#A0522D',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  copyNotice: { color: '#2e7d32', fontWeight: 'bold', marginBottom: '15px' }
};