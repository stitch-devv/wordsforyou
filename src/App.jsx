// src/App.jsx
import React, { useState, useEffect } from 'react';
import { TRANSLATIONS } from './data/translations';
import { getLetterById } from './utils/storage';
import { Navbar } from './components/Navbar';
import { LandingPage } from './pages/LandingPage';
import { GalleryPage } from './pages/GalleryPage';
import { LetterPage } from './pages/LetterPage';
import { CreateLetterPage } from './pages/CreatePage';
import { AdminPage } from './pages/AdminPage';

export default function App() {
  const [lang, setLang] = useState('ru');
  const [page, setPage] = useState('home'); // 'home' | 'create' | 'gallery' | 'letter' | 'admin'
  const [currentLetter, setCurrentLetter] = useState(null);

  const t = TRANSLATIONS[lang];

  // Функция для чтения URL и открытия нужной страницы/письма
  const handleHashChange = async () => {
    const hash = window.location.hash;

    if (hash.startsWith('#letter/')) {
      const letterId = hash.replace('#letter/', '');
      const foundLetter = await getLetterById(letterId);

      if (foundLetter) {
        setCurrentLetter(foundLetter);
        setPage('letter');
      }
    }
  };

  // Пасхалка для админа ("admin")
  useEffect(() => {
    let inputBuffer = '';

    const handleKeyDown = (e) => {
      inputBuffer += e.key.toLowerCase();
      if (inputBuffer.length > 5) {
        inputBuffer = inputBuffer.slice(-5);
      }
      if (inputBuffer === 'admin') {
        setPage('admin');
        inputBuffer = '';
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Универсальная навигация
  const navigateTo = (targetPage, letterData = null) => {
    if (targetPage.startsWith('letter/')) {
      // Если передают путь формата 'letter/ID'
      const id = targetPage.replace('letter/', '');
      window.location.hash = `letter/${id}`;
      if (letterData) {
        setCurrentLetter(letterData);
        setPage('letter');
      } else {
        handleHashChange();
      }
    } else {
      // Для обычных страниц очищаем хэш
      window.location.hash = '';
      setCurrentLetter(null);
      setPage(targetPage);
    }
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
        {page === 'create' && <CreateLetterPage lang={lang} t={t} navigateTo={navigateTo} />}
        {page === 'gallery' && <GalleryPage t={t} navigateTo={navigateTo} />}
        {page === 'letter' && <LetterPage letter={currentLetter} navigateTo={navigateTo} t={t} />}
        {page === 'admin' && <AdminPage navigateTo={navigateTo} />}
      </main>
    </div>
  );
}