// src/pages/CreatePage.jsx
import React, { useState } from 'react';
import { createLetter } from '../utils/storage';
import { POEMS } from '../data/poems';

export const CreateLetterPage = ({ navigateTo, lang = 'ru' }) => {
  const [mode, setMode] = useState('poem'); 
  const [selectedPoemId, setSelectedPoemId] = useState(POEMS[0]?.id || 1);
  const [customText, setCustomText] = useState('');
  
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedPoem = POEMS.find(p => p.id === Number(selectedPoemId)) || POEMS[0];

  const handleSubmit = async (e) => {
    e.preventDefault();

    const poemText = mode === 'poem' ? selectedPoem?.text : customText;
    const poemAuthor = mode === 'poem' 
      ? (selectedPoem?.author || 'Неизвестен') 
      : (sender.trim() || 'Авторское послание');

    if (!poemText || !poemText.trim()) {
      alert('Пожалуйста, введите или выберите текст послания.');
      return;
    }

    setIsSubmitting(true);

    try {
      const newLetter = {
        id: Date.now().toString(36) + Math.random().toString(36).substring(2),
        poem_id: mode === 'poem' ? Number(selectedPoemId) : null,
        poem_text: poemText,
        poem_author: poemAuthor,
        recipient,
        sender,
        note,
        lang
      };

      await createLetter(newLetter);
      // Передаем newLetter вторым параметром для мгновенной отрисовки
      navigateTo(`letter/${newLetter.id}`, newLetter);
    } catch (err) {
      console.error('Ошибка создания:', err);
      alert('Ошибка при сохранении письма.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="page-container" style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h2>Создать послание</h2>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.toggleGroup}>
          <button
            type="button"
            style={{ ...styles.toggleBtn, ...(mode === 'poem' ? styles.toggleActive : {}) }}
            onClick={() => setMode('poem')}
          >
            📜 Выбрать песню / стих
          </button>
          <button
            type="button"
            style={{ ...styles.toggleBtn, ...(mode === 'custom' ? styles.toggleActive : {}) }}
            onClick={() => setMode('custom')}
          >
            ✍️ Написать свое послание
          </button>
        </div>

        {mode === 'poem' ? (
          <div style={styles.field}>
            <label style={styles.label}>Выберите произведение из библиотеки:</label>
            <select 
              value={selectedPoemId} 
              onChange={(e) => setSelectedPoemId(e.target.value)}
              style={styles.input}
            >
              {POEMS.map(p => {
                const firstLine = p.text.split('\n')[0];
                return (
                  <option key={p.id} value={p.id}>
                    {p.author} — «{firstLine.length > 35 ? firstLine.substring(0, 35) + '...' : firstLine}»
                  </option>
                );
              })}
            </select>

            {/* 👁️ Окно с полным текстом выбранной песни */}
            {selectedPoem && (
              <div style={styles.previewBox}>
                <div style={styles.previewHeader}>
                  <strong>Автор:</strong> {selectedPoem.author}
                </div>
                <div style={styles.previewText}>
                  {selectedPoem.text}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div style={styles.field}>
            <label style={styles.label}>Текст вашего послания (до 500 символов):</label>
            <textarea
              rows={5}
              maxLength={500}
              placeholder="Напишите здесь свои слова, пожелания или мысль..."
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
              style={styles.textarea}
            />
            <small style={{ color: '#888', display: 'block', textAlign: 'right' }}>
              {customText.length}/500
            </small>
          </div>
        )}

        <div style={styles.field}>
          <label style={styles.label}>Кому:</label>
          <input
            type="text"
            placeholder="Имя получателя"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>От кого:</label>
          <input
            type="text"
            placeholder="Ваше имя или псевдоним"
            value={sender}
            onChange={(e) => setSender(e.target.value)}
            style={styles.input}
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Личная записка (необязательно):</label>
          <input
            type="text"
            placeholder="Короткий комментарий..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={styles.input}
          />
        </div>

        <button type="submit" disabled={isSubmitting} style={styles.submitBtn}>
          {isSubmitting ? 'Создаем...' : 'Опубликовать и создать открытку ✨'}
        </button>
      </form>
    </div>
  );
};

const styles = {
  form: { display: 'flex', flexDirection: 'column', gap: '16px' },
  toggleGroup: { display: 'flex', gap: '10px', marginBottom: '10px' },
  toggleBtn: {
    flex: 1,
    padding: '10px',
    border: '1px solid #EAE3D9',
    background: '#FAF6EF',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '0.95rem'
  },
  toggleActive: {
    background: '#A0522D',
    color: '#fff',
    borderColor: '#A0522D'
  },
  field: { display: 'flex', flexDirection: 'column', gap: '6px' },
  label: { fontWeight: 'bold', color: '#3A322C', fontSize: '0.9rem' },
  input: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc' },
  textarea: { padding: '10px', borderRadius: '6px', border: '1px solid #ccc', resize: 'vertical' },
  previewBox: {
    marginTop: '12px',
    padding: '14px 18px',
    backgroundColor: '#FAF6EF',
    border: '1px dashed #A0522D',
    borderRadius: '10px',
    textAlign: 'left'
  },
  previewHeader: {
    fontSize: '0.9rem',
    color: '#A0522D',
    marginBottom: '8px',
    borderBottom: '1px solid #EAE3D9',
    paddingBottom: '4px'
  },
  previewText: {
    whiteSpace: 'pre-line',
    fontStyle: 'italic',
    color: '#4A3E3D',
    lineHeight: '1.5',
    fontSize: '0.95rem'
  },
  submitBtn: {
    padding: '14px',
    background: '#A0522D',
    color: '#fff',
    border: 'none',
    borderRadius: '25px',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '10px'
  }
};