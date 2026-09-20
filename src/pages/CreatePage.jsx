import React, { useState, useRef } from 'react';
import { POEMS } from '../data/poems';
import { validateContent } from '../utils/moderation';
import { saveLetter } from '../utils/storage';
import { StoryCard } from '../components/StoryCard';

export const CreatePage = ({ lang, t, navigateTo }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedPoem, setSelectedPoem] = useState(POEMS[0]);
  const [recipient, setRecipient] = useState('');
  const [sender, setSender] = useState('');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const [createdLetter, setCreatedLetter] = useState(null);

  const filteredPoems = selectedCategory === 'all' 
    ? POEMS 
    : POEMS.filter(p => p.category === selectedCategory);

  const handlePublish = async () => {
    setError('');
    

    // Модерация
    const checkNote = validateContent(note);
    const checkRecipient = validateContent(recipient);
    const checkSender = validateContent(sender);

    if (!checkNote.isValid) return setError(checkNote.error);
    if (!checkRecipient.isValid) return setError(checkRecipient.error);
    if (!checkSender.isValid) return setError(checkSender.error);

    const letterData = {
      poemId: selectedPoem.id,
      poemText: selectedPoem[lang] || selectedPoem.ru,
      poemAuthor: selectedPoem.author,
      recipient,
      sender,
      note,
      lang
    };

  const saved = await saveLetter(letterData);
  setCreatedLetter(saved);
  };

  const copyLink = () => {
    const url = `${window.location.origin}/#letter/${createdLetter.id}`;
    navigator.clipboard.writeText(url);
    alert('Ссылка скопирована!');
  };

  const copyText = () => {
    const poem = selectedPoem[lang] || selectedPoem.ru;
    const fullText = `For: ${recipient || 'You'}\n\n«${poem}»\n— ${selectedPoem.author}\n\n${note ? `"${note}"\n` : ''}From: ${sender || 'Anon'}`;
    navigator.clipboard.writeText(fullText);
    alert('Текст скопирован!');
  };

  return (
    <div style={styles.container}>
      <h2 style={{ textAlign: 'center', color: '#3A322C' }}>Создай свое послание</h2>

      {error && <div style={styles.errorBox}>{error}</div>}

      {!createdLetter ? (
        <div style={styles.grid}>
          {/* Левый блок - формы */}
          <div style={styles.formSection}>
            <label style={styles.label}>{t.fieldTo}</label>
            <input 
              style={styles.input} 
              value={recipient} 
              onChange={e => setRecipient(e.target.value)} 
              placeholder="Имя адресата"
            />

            <label style={styles.label}>{t.fieldFrom}</label>
            <input 
              style={styles.input} 
              value={sender} 
              onChange={e => setSender(e.target.value)} 
              placeholder="Ваше имя или Аноним"
            />

            <label style={styles.label}>Выберите категорию строк:</label>
            <div style={styles.cats}>
              {['all', 'love', 'warmth', 'distance'].map(cat => (
                <button 
                  key={cat}
                  style={selectedCategory === cat ? styles.catBtnActive : styles.catBtn}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <label style={styles.label}>Выберите стихотворение:</label>
            <div style={styles.poemPicker}>
              {filteredPoems.map(poem => (
                <div 
                  key={poem.id}
                  style={selectedPoem.id === poem.id ? styles.poemCardActive : styles.poemCard}
                  onClick={() => setSelectedPoem(poem)}
                >
                  «{(poem[lang] || poem.ru).substring(0, 70)}...»
                </div>
              ))}
            </div>

            <label style={styles.label}>{t.fieldNote}</label>
            <textarea 
              style={styles.textarea} 
              value={note} 
              onChange={e => setNote(e.target.value)}
              placeholder={t.placeholderNote}
            />

            <p style={styles.warning}>{t.warningImmutable}</p>

            <button style={styles.submitBtn} onClick={handlePublish}>
              {t.btnPublish}
            </button>
          </div>

          {/* Правый блок - превью */}
          <div style={styles.previewSection}>
            <h4 style={{ textAlign: 'center', color: '#8C7A6B' }}>Предпросмотр:</h4>
            <StoryCard 
              poemText={selectedPoem[lang] || selectedPoem.ru}
              poemAuthor={selectedPoem.author}
              recipient={recipient}
              sender={sender}
              note={note}
            />
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <h3 style={{ color: '#2E7D32' }}>{t.modalSuccess}</h3>
          <div style={{ margin: '30px 0' }}>
            <StoryCard 
              poemText={createdLetter.poemText}
              poemAuthor={createdLetter.poemAuthor}
              recipient={createdLetter.recipient}
              sender={createdLetter.sender}
              note={createdLetter.note}
            />
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={styles.actionBtn} onClick={copyLink}>{t.btnCopyLink}</button>
            <button style={styles.actionBtn} onClick={copyText}>{t.btnCopyText}</button>
            <button style={styles.actionBtn} onClick={() => navigateTo('gallery')}>В галерею</button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: { maxWidth: '900px', margin: '0 auto', padding: '40px 20px' },
  grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginTop: '20px' },
  formSection: { display: 'flex', flexDirection: 'column', gap: '12px' },
  label: { fontSize: '0.9rem', color: '#554A40', fontWeight: 'bold' },
  input: { padding: '10px', borderRadius: '8px', border: '1px solid #DCD0C0', fontSize: '0.95rem' },
  textarea: { padding: '10px', borderRadius: '8px', border: '1px solid #DCD0C0', minHeight: '80px', fontSize: '0.95rem' },
  cats: { display: 'flex', gap: '8px', flexWrap: 'wrap' },
  catBtn: { background: '#EAE3D9', border: 'none', padding: '6px 12px', borderRadius: '12px', cursor: 'pointer' },
  catBtnActive: { background: '#A0522D', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '12px', cursor: 'pointer' },
  poemPicker: { maxHeight: '180px', overflowY: 'auto', border: '1px solid #EAE3D9', padding: '8px', borderRadius: '8px' },
  poemCard: { padding: '8px', borderBottom: '1px solid #FAF6EF', cursor: 'pointer', fontSize: '0.85rem' },
  poemCardActive: { padding: '8px', background: '#FAF6EF', borderLeft: '4px solid #A0522D', cursor: 'pointer', fontSize: '0.85rem', fontWeight: 'bold' },
  warning: { fontSize: '0.8rem', color: '#8C6D58', fontStyle: 'italic' },
  submitBtn: { background: '#A0522D', color: '#fff', padding: '14px', border: 'none', borderRadius: '8px', fontSize: '1rem', cursor: 'pointer' },
  errorBox: { background: '#FFEBEE', color: '#C62828', padding: '12px', borderRadius: '8px', marginBottom: '16px' },
  actionBtn: { background: '#3A322C', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer' }
};