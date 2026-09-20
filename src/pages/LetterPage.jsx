// src/pages/LetterPage.jsx
import React from 'react';
import { StoryCard } from '../components/StoryCard';
import '../styles/LetterPage.css';

export const LetterPage = ({ letter, navigateTo, t }) => {
  if (!letter) {
    return (
      <div className="letter-not-found">
        <h2>Письмо не найдено или было удалено</h2>
        <button className="action-btn" onClick={() => navigateTo('home')}>
          {t.navHome}
        </button>
      </div>
    );
  }

  return (
    <div className="letter-page-container">
      <div className="letter-badge">Тебе пришло особое послание</div>
      
      <div className="letter-card-wrapper">
        <StoryCard 
          poemText={letter.poemText}
          poemAuthor={letter.poemAuthor}
          recipient={letter.recipient}
          sender={letter.sender}
          note={letter.note}
        />
      </div>

      <div className="letter-actions">
        <button className="cta-btn" onClick={() => navigateTo('create')}>
          Написать ответное письмо →
        </button>
      </div>
    </div>
  );
};