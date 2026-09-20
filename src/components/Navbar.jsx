import React from 'react';
import '../styles/Navbar.css';

export const Navbar = ({ currentLang, setLang, activePage, navigateTo, t }) => {
  return (
    <header className="navbar-header">
      <div className="navbar-container">
        <div className="navbar-logo" onClick={() => navigateTo('home')}>
          <span className="logo-main">WORDS FOR YOU</span>
          <span className="logo-sub">by CASPIY</span>
        </div>

        <nav className="navbar-nav">
          <button 
            className={`nav-link ${activePage === 'home' ? 'active' : ''}`} 
            onClick={() => navigateTo('home')}
          >
            {t.navHome}
          </button>
          <button 
            className={`nav-link ${activePage === 'gallery' ? 'active' : ''}`} 
            onClick={() => navigateTo('gallery')}
          >
            {t.navGallery}
          </button>
          
          <div className="lang-switch">
            <button 
              className={`lang-btn ${currentLang === 'ru' ? 'active' : ''}`} 
              onClick={() => setLang('ru')}
            >
              RU
            </button>
            <span style={{ color: '#ccc' }}>|</span>
            <button 
              className={`lang-btn ${currentLang === 'en' ? 'active' : ''}`} 
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};