// Работа с сохранением и неизменяемостью записей

const STORAGE_KEY = "words_for_you_letters_v1";

export const getStoredLetters = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    console.error("Failed to fetch letters", e);
    return [];
  }
};

export const saveLetter = (letterData) => {
  const currentLetters = getStoredLetters();
  
  const newLetter = {
    id: 'letter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    createdAt: new Date().toISOString(),
    isImmutable: true,
    ...letterData
  };

  const updated = [newLetter, ...currentLetters];
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return newLetter;
};

export const getLetterById = (id) => {
  const letters = getStoredLetters();
  return letters.find(item => item.id === id);
};



// src/utils/storage.js

// Удаление конкретного письма по его ID
export const deleteLetterById = (id) => {
  const letters = getStoredLetters();
  const updated = letters.filter(letter => letter.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  return updated;
};

// Полная очистка всех писем (сброс базы)
export const clearAllLetters = () => {
  localStorage.removeItem(STORAGE_KEY);
};