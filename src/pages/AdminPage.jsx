// src/pages/AdminPage.jsx
import React, { useState, useEffect } from 'react';
import { getAnnouncements, createAnnouncement, deleteAnnouncement } from '../utils/storage';
import '../styles/AdminPage.css';

const ADMIN_PASSWORD = "foruadmin__";

export const AdminPage = ({ navigateTo }) => {
  const [passwordInput, setPasswordInput] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [announcements, setAnnouncements] = useState([]);
  const [message, setMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      loadAnnouncements();
    } else {
      alert('Неверный пароль!');
    }
  };

  const loadAnnouncements = async () => {
    const data = await getAnnouncements();
    setAnnouncements(data);
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
  loadAnnouncements();
  setTimeout(() => setMessage(''), 3000);
} catch (err) {
  // Выводим точный текст ошибки от Supabase в консоль и в alert
  console.error('Детали ошибки Supabase:', err);
  alert('Ошибка при публикации: ' + (err.message || JSON.stringify(err)));
}
  };

  const handleDelete = async (id) => {
    if (window.confirm('Удалить это объявление?')) {
      await deleteAnnouncement(id);
      loadAnnouncements();
    }
  };

  // 1. Форма входа по паролю
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

  // 2. Панель управления
  return (
    <div className="page-container">
      <div className="admin-header">
        <h2>Управление объявлениями и обновлениями</h2>
        <button className="nav-link" onClick={() => setIsAuthenticated(false)}>Выйти</button>
      </div>

      {message && <div className="admin-success-msg">{message}</div>}

      <form onSubmit={handleCreate} className="admin-create-form">
        <h3>Опубликовать новое объявление</h3>
        
        <div className="form-group">
          <label className="form-label">Заголовок (например: "Обновление v1.2" или оставить пустым):</label>
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
            placeholder="Опишите обновление или новость платформы..."
          />
        </div>

        <button type="submit" className="landing-cta">Опубликовать на сайт</button>
      </form>

      <hr style={{ margin: '40px 0', borderColor: '#EAE3D9' }} />

      <h3>Опубликованные объявления ({announcements.length})</h3>
      <div className="admin-list">
        {announcements.map((item) => (
          <div key={item.id} className="admin-item-card">
            <div>
              {item.title && <strong>{item.title}</strong>}
              <p>{item.content}</p>
              <small>{new Date(item.created_at).toLocaleString()}</small>
            </div>
            <button className="delete-btn" onClick={() => handleDelete(item.id)}>Удалить</button>
          </div>
        ))}
      </div>
    </div>
  );
};