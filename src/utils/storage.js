// src/utils/storage.js
import { supabase } from './supabaseClient';

// Добавьте или проверьте наличие этой функции в src/utils/storage.js
export const createLetter = async (letterData) => {
  const { data, error } = await supabase
    .from('letters')
    .insert([
      {
        id: letterData.id,
        poem_id: letterData.poem_id,
        poem_text: letterData.poem_text,
        poem_author: letterData.poem_author,
        recipient: letterData.recipient,
        sender: letterData.sender,
        note: letterData.note,
        lang: letterData.lang
      }
    ])
    .select();

  if (error) {
    console.error('Ошибка сохранения письма в Supabase:', error);
    throw error;
  }

  return data[0];
};

// Получить все письма для Общей Галереи
export const getStoredLetters = async () => {
  try {
    const { data, error } = await supabase
      .from('letters')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Ошибка получения писем:', error);
      return [];
    }

    return data.map(item => ({
      id: item.id,
      createdAt: item.created_at,
      poemId: item.poem_id,
      poemText: item.poem_text,
      poemAuthor: item.poem_author,
      recipient: item.recipient,
      sender: item.sender,
      note: item.note,
      lang: item.lang
    }));
  } catch (e) {
    console.error('Ошибка соединения с Supabase:', e);
    return [];
  }
};

// Сохранить новое письмо в общую базу
export const saveLetter = async (letterData) => {
  const newLetter = {
    id: 'letter_' + Date.now() + '_' + Math.random().toString(36).substr(2, 5),
    poem_id: letterData.poemId,
    poem_text: letterData.poemText,
    poem_author: letterData.poemAuthor,
    recipient: letterData.recipient,
    sender: letterData.sender,
    note: letterData.note,
    lang: letterData.lang
  };

  const { data, error } = await supabase
    .from('letters')
    .insert([newLetter])
    .select();

  if (error) {
    console.error('Ошибка сохранения:', error);
    throw error;
  }

  const saved = data[0];
  return {
    id: saved.id,
    createdAt: saved.created_at,
    poemId: saved.poem_id,
    poemText: saved.poem_text,
    poemAuthor: saved.poem_author,
    recipient: saved.recipient,
    sender: saved.sender,
    note: saved.note,
    lang: saved.lang
  };
};

// Получить конкретное письмо по ID (для перехода по ссылке)
export const getLetterById = async (id) => {
  const { data, error } = await supabase
    .from('letters')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Ошибка получения письма:', error);
    return null;
  }
  return data;
};

// ============Administration=========

// Получить список активных объявлений
export const getAnnouncements = async () => {
  try {
    const { data, error } = await supabase
      .from('announcements')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) return [];
    return data;
  } catch (e) {
    return [];
  }
};

// Создать новое объявление
export const createAnnouncement = async (title, content) => {
  const { data, error } = await supabase
    .from('announcements')
    .insert([{ title, content }])
    .select();

  if (error) throw error;
  return data[0];
};

// Удалить объявление по ID
export const deleteAnnouncement = async (id) => {
  const { error } = await supabase
    .from('announcements')
    .delete()
    .eq('id', id);

  if (error) throw error;
};