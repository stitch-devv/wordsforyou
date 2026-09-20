// Логика проверки текста на токсичность/мат


import { BAD_WORDS } from '../data/badWords';

export const validateContent = (text) => {
  if (!text) return { isValid: true };
  
  const lowerText = text.toLowerCase();
  const foundBadWord = BAD_WORDS.find(word => lowerText.includes(word));

  if (foundBadWord) {
    return {
      isValid: false,
      error: "Наш сайт создавался как теплое и уютное пространство. Пожалуйста, уберите резкие или нецензурные выражения."
    };
  }

  return { isValid: true };
};