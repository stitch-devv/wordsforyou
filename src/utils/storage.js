// src/utils/storage.js
import { supabase } from './supabaseClient';

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
  try {
    const { data, error } = await supabase
      .from('letters')
      .select('*')
      .eq('id', id)
      .single();

    if (error || !data) return null;

    return {
      id: data.id,
      createdAt: data.created_at,
      poemId: data.poem_id,
      poemText: data.poem_text,
      poemAuthor: data.poem_author,
      recipient: data.recipient,
      sender: data.sender,
      note: data.note,
      lang: data.lang
    };
  } catch (e) {
    return null;
  }
};