// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { 
  getAnnouncements, 
  createAnnouncement, 
  deleteAnnouncement,
  getStoredLetters,
  deleteLetter 
} from '../utils/storage';
import '../styles/AdminPage.css';

const ADMIN_PASSWORD = "foruadmin__";

export const AdminPage = ({ navigateTo }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [letters, setLetters] = useState([]);
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadAllData();
    } else {
      alert('Неверный пароль!');
    }
  };

  const loadAllData = async () => {
    const annData = await getAnnouncements();
    const lettersData = await getStoredLetters();
    setAnnouncements(annData || []);
    setLetters(lettersData || []);
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!content.trim() && !title.trim()) {
      alert('Заполните хотя бы одно поле!');
      return;
    }

    try {
      await createAnnouncement(title, content);
      setTitle('');
      setContent('');
      setMessage('Объявление успешно опубликовано!');
      loadAllData();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      console.error('Детали ошибки Supabase:', err);
      alert('Ошибка при публикации: ' + (err.message || JSON.stringify(err)));
    }
  };

  const handleDeleteAnnouncement = async (id) => {
    if (window.confirm('Удалить это объявление?')) {
      await deleteAnnouncement(id);
      loadAllData();
    }
  };

const handleDeleteLetter = async (id) => {
    console.log('Попытка удаления письма с ID:', id);

    if (!id) {
      alert('Ошибка: У письма отсутствует ID!');
      return;
    }

    if (window.confirm('Удалить это письмо из галереи?')) {
      console.log('Подтверждение получено...');
      try {
        const result = await deleteLetter(id);
        console.log('Результат удаления из Supabase:', result);

        if (result && result.length === 0) {
          alert('Внимание: Запись с таким ID не найдена в базе!');
        } else {
          alert('Письмо успешно удалено!');
          loadAllData(); // Обновляем список на экране
        }
      } catch (err) {
        console.error('Ошибка при удалении:', err);
        alert('Ошибка при удалении: ' + (err.message || 'Неизвестная ошибка'));
      }
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="page-container admin-login-container">
        <h2>Вход в панель администратора</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input 
            type="password" 
            placeholder="Введите пароль..."
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className="form-input"
          />
          <button type="submit" className="landing-cta">Войти</button>
        </form>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <div className="admin-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Панель администратора</h2>
        <button className="nav-link" onClick={() => setIsAuthenticated(false)}>Выйти</button>
      </div>

      {message && <div className="admin-success-msg">{message}</div>}

      {/* Форма создания объявлений */}
      <form onSubmit={handleCreate} className="admin-create-form" style={{ marginTop: '20px' }}>
        <h3>Опубликовать новое объявление</h3>
        
        <div className="form-group">
          <label className="form-label">Заголовок:</label>
          <input 
            type="text" 
            className="form-input" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Заголовок объявления..."
          />
        </div>

        <div className="form-group">
          <label className="form-label">Текст сообщения:</label>
          <textarea 
            className="form-textarea" 
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            placeholder="Опишите обновление или новость..."
          />
        </div>

        <button type="submit" className="landing-cta">Опубликовать</button>
      </form>

      <hr style={{ margin: '40px 0', borderColor: '#EAE3D9' }} />

      {/* Секция объявлений */}
      <h3>Опубликованные объявления ({announcements.length})</h3>
      <div className="admin-list" style={{ marginBottom: '40px' }}>
        {announcements.length === 0 ? (
          <p style={{ color: '#888' }}>Объявлений пока нет.</p>
        ) : (
          announcements.map((item) => (
            <div key={item.id} className="admin-item-card" style={styles.adminCard}>
              <div>
                {item.title && <strong>{item.title}</strong>}
                <p>{item.content}</p>
                <small>{new Date(item.created_at).toLocaleString()}</small>
              </div>
              <button className="delete-btn" onClick={() => handleDeleteAnnouncement(item.id)}>Удалить</button>
            </div>
          ))
        )}
      </div>

      <hr style={{ margin: '40px 0', borderColor: '#EAE3D9' }} />

      {/* Секция управления публичными письмами */}
      <h3>Публичные письма в галерее ({letters.length})</h3>
      <div className="admin-list">
        {letters.length === 0 ? (
          <p style={{ color: '#888' }}>Писем в галерее пока нет.</p>
        ) : (
          letters.map((letter) => (
            <div key={letter.id} style={styles.adminCard}>
              <div>
                <strong>Кому: {letter.recipient || 'Без имени'} | От: {letter.sender || 'Аноним'}</strong>
                <p style={{ margin: '8px 0', fontStyle: 'italic' }}>"{letter.poemText}"</p>
                <small style={{ color: '#8C6D58' }}>Автор стиха: {letter.poemAuthor || 'Не указан'}</small>
              </div>
              <button 
                style={styles.deleteBtn}
               onClick={() => handleDeleteLetter(letter.id)}
              >
                Удалить письмо 🗑️
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  adminCard: {
    backgroundColor: '#FAF6EF',
    border: '1px solid #EAE3D9',
    borderRadius: '12px',
    padding: '15px',
    marginBottom: '15px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '15px',
  },
  deleteBtn: {
    backgroundColor: '#DC2626',
    color: '#FFF',
    border: 'none',
    borderRadius: '8px',
    padding: '8px 12px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  },
};

import { deleteAllLetters } from '../utils/storage';

// Внутри компонента AdminPage:
const handleDeleteAll = async () => {
  if (window.confirm('ВНИМАНИЕ! Вы точно хотите очистить ВСЮ галерею и удалить ВСЕ письма?')) {
    try {
      await deleteAllLetters();
      alert('Все письма успешно удалены!');
      loadAllData(); // Обновляем список на странице
    } catch (err) {
      alert('Ошибка при удалении: ' + err.message);
    }
  }
};

// Вставьте кнопку над списком писем в JSX:
<button 
  onClick={handleDeleteAll}
  style={{
    backgroundColor: '#DC2626',
    color: '#FFFFFF',
    padding: '10px 18px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    // marginBottom: '20px'
    margin: '0 auto',
    zIndex: '100'
  }}
>
  🔥 Очистить всю галерею (Удалить все письма)
</button>