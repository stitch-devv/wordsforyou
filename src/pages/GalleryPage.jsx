// Публичная галерея сохраненных писем

import React, { useEffect, useState } from 'react';
import { getStoredLetters } from '../utils/storage';
import { StoryCard } from '../components/StoryCard';

export const GalleryPage = ({ t }) => {
  const [letters, setLetters] = useState([]);

  useEffect(() => {
  const fetchLetters = async () => {
    const data = await getStoredLetters();
    setLetters(data);
  };
  fetchLetters();
}, []);

  return (
    <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>
      <h2 style={{ textAlign: 'center', color: '#3A322C' }}>{t.galleryTitle}</h2>
      <p style={{ textAlign: 'center', color: '#8C7A6B', marginBottom: '40px' }}>{t.galleryDesc}</p>

      {letters.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#A09383' }}>Пока нет сохраненных писем. Будьте первыми!</p>
      ) : (
        <div style={styles.grid}>
          {letters.map(item => (
            <StoryCard 
              key={item.id}
              poemText={item.poemText}
              poemAuthor={item.poemAuthor}
              recipient={item.recipient}
              sender={item.sender}
              note={item.note}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }
};