// src/pages/GalleryPage.jsx
import React, { useEffect, useState } from 'react';
import { getStoredLetters, getAnnouncements } from '../utils/storage';

export const GalleryPage = ({ navigateTo }) => {
  const [letters, setLetters] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [lettersData, announcementsData] = await Promise.all([
          getStoredLetters(),
          getAnnouncements(),
        ]);
        setLetters(lettersData || []);
        setAnnouncements(announcementsData || []);
      } catch (err) {
        console.error('Ошибка загрузки галереи:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
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

      {/* Секция объявлений от админа */}
      {announcements.length > 0 && (
        <div style={{ marginBottom: '30px' }}>
          {announcements.map((ann) => (
            <div key={ann.id} style={styles.announcementCard}>
              <span style={styles.badge}>📢 Объявление</span>
              {ann.title && <h3 style={styles.annTitle}>{ann.title}</h3>}
              <p style={styles.annContent}>{ann.content}</p>
              <small style={styles.annDate}>
                {new Date(ann.created_at).toLocaleDateString()}
              </small>
            </div>
          ))}
        </div>
      )}

      {/* Секция карточек-письма */}
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
              <div style={styles.cardHeader}>
                <span style={styles.recipientTag}>
                  Для: {item.recipient || 'Кому-то важному'}
                </span>
                <span style={styles.authorTag}>
                  От: {item.sender || 'Аноним'}
                </span>
              </div>

              <p style={styles.poemSnippet}>
                "{item.poemText || item.poem_text}"
              </p>

              <div style={styles.poemAuthor}>
                — {item.poemAuthor || item.poem_author || 'Автор не указан'}
              </div>

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
  announcementCard: {
    backgroundColor: '#FFF8E7',
    border: '2px solid #F0C987',
    borderRadius: '16px',
    padding: '20px',
    marginBottom: '15px',
    boxShadow: '0 4px 12px rgba(0,0,0,0.03)',
  },
  badge: {
    fontSize: '0.75rem',
    fontWeight: 'bold',
    color: '#D97706',
    backgroundColor: '#FEF3C7',
    padding: '4px 8px',
    borderRadius: '6px',
    textTransform: 'uppercase',
  },
  annTitle: {
    margin: '10px 0 5px 0',
    color: '#3A322C',
    fontSize: '1.1rem',
  },
  annContent: {
    margin: '5px 0',
    color: '#554B43',
    lineHeight: '1.5',
  },
  annDate: {
    color: '#A09388',
    fontSize: '0.8rem',
  },
  card: {
    backgroundColor: '#FAF6EF',
    border: '2px solid #EAE3D9',
    borderRadius: '16px',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
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