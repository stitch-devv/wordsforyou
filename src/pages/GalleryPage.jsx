// src/pages/GalleryPage.jsx
import React, { useEffect, useState } from 'react';
import { getStoredLetters } from '../utils/storage';

export const GalleryPage = ({ navigateTo }) => {
  const [letters, setLetters] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      setIsLoading(true);
      try {
        const data = await getStoredLetters();
        setLetters(data || []);
      } catch (err) {
        console.error('Ошибка загрузки галереи:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGallery();
  }, []);

  if (isLoading) {
    return (
      <div style={{ textAlign: 'center', padding: '50px', color: '#8C6D58' }}>
        Загрузка галереи посланий... 💌
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h2 style={{ textAlign: 'center', color: '#3A322C', marginBottom: '10px' }}>
        Галерея посланий ✨
      </h2>
      <p style={{ textAlign: 'center', color: '#7A6E65', marginBottom: '30px' }}>
        Здесь собраны открытки, созданные нашими пользователями
      </p>

      {letters.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '40px', color: '#888' }}>
          Пока нет публичных посланий. Будьте первыми!
        </div>
      ) : (
        <div style={styles.grid}>
          {letters.map((item) => (
            <div 
              key={item.id} 
              style={styles.card}
              onClick={() => navigateTo && navigateTo(`letter/${item.id}`, item)}
            >
              {/* Шапка карточки */}
              <div style={styles.cardHeader}>
                <span style={styles.recipientTag}>
                  Для: {item.recipient || 'Кому-то важному'}
                </span>
                <span style={styles.authorTag}>
                  От: {item.sender || 'Аноним'}
                </span>
              </div>

              {/* Текст послания */}
              <p style={styles.poemSnippet}>
                "{item.poem_text}"
              </p>

              {/* Подпись автора песни/стиха */}
              <div style={styles.poemAuthor}>
                — {item.poem_author || 'Автор не указан'}
              </div>

              {/* Футер карточки */}
              <div style={styles.cardFooter}>
                <button style={styles.readBtn}>
                  Открыть открытку 💌
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
    gap: '20px',
  },
  card: {
    backgroundColor: '#FAF6EF',
    border: '2px solid #EAE3D9',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between', // Исправлено: justifyContent вместо justify
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.04)',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
  },
  cardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '12px',
    fontSize: '0.85rem',
    borderBottom: '1px solid #EAE3D9',
    paddingBottom: '8px',
  },
  recipientTag: {
    fontWeight: 'bold',
    color: '#A0522D',
  },
  authorTag: {
    color: '#8C6D58',
  },
  poemSnippet: {
    fontSize: '0.95rem',
    color: '#3A322C',
    fontStyle: 'italic',
    lineHeight: '1.5',
    margin: '10px 0',
    display: '-webkit-box',
    WebkitLineClamp: 4,
    WebkitBoxOrient: 'vertical',
    overflow: 'hidden',
  },
  poemAuthor: {
    fontSize: '0.85rem',
    color: '#8C6D58',
    textAlign: 'right',
    fontWeight: 'bold',
    marginBottom: '15px',
  },
  cardFooter: {
    textAlign: 'center',
    marginTop: 'auto',
  },
  readBtn: {
    width: '100%',
    padding: '8px 14px',
    backgroundColor: '#A0522D',
    color: '#FFF',
    border: 'none',
    borderRadius: '20px',
    fontSize: '0.85rem',
    cursor: 'pointer',
  },
};