// src/App.jsx
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from './data/translations';
import { getLetterById } from './utils/storage';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { CreatePage } from './pages/CreatePage';
import { GalleryPage } from './pages/GalleryPage';
import { LetterPage } from './pages/LetterPage';

export default function App() {
  const [lang, setLang] = useState('ru');
  const [page, setPage] = useState('home'); // 'home' | 'create' | 'gallery' | 'letter'
  const [currentLetter, setCurrentLetter] = useState(null);

  const t = TRANSLATIONS[lang];

  // Функция для чтения URL и открытия нужной страницы/письма
 const handleHashChange = async () => {
  const hash = window.location.hash;

  if (hash.startsWith('#letter/')) {
    const letterId = hash.replace('#letter/', '');
    const foundLetter = await getLetterById(letterId);

    setCurrentLetter(foundLetter);
    setPage('letter');
  }
};

  useEffect(() => {
    // Проверяем hash при открытии сайта
    handleHashChange();

    // Слушаем изменения URL (если человек переходит по ссылкам)
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newPage) => {
    // Очищаем hash при обычном переходе по меню
    if (newPage !== 'letter') {
      window.location.hash = '';
    }
    setPage(newPage);
  };

  return (
    <div className="app-main">
      <Navbar 
        currentLang={lang} 
        setLang={setLang} 
        activePage={page} 
        navigateTo={navigateTo} 
        t={t} 
      />

      <main>
        {page === 'home' && <LandingPage navigateTo={navigateTo} t={t} />}
        {page === 'create' && <CreatePage lang={lang} t={t} navigateTo={navigateTo} />}
        {page === 'gallery' && <GalleryPage t={t} />}
        {page === 'letter' && <LetterPage letter={currentLetter} navigateTo={navigateTo} t={t} />}
      </main>
    </div>
  );
}