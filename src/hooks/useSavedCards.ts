import { useState, useEffect } from 'react';

const getSavedCardIdsFromStorage = (): string[] => 
  JSON.parse(localStorage.getItem('savedInfocusCardIds') || '[]');

const toggleSaveCardInStorage = (cardId: string, currentIsSaved: boolean): void => {
  let savedIds = getSavedCardIdsFromStorage();
  if (currentIsSaved) {
    savedIds = savedIds.filter(id => id !== cardId);
  } else if (!savedIds.includes(cardId)) {
    savedIds.push(cardId);
  }
  localStorage.setItem('savedInfocusCardIds', JSON.stringify(savedIds));
  window.dispatchEvent(new Event('storage'));
};

export const useSavedCards = (cards: any[]) => {
  const [savedCards, setSavedCards] = useState(cards.map(card => ({
    ...card,
    isSaved: getSavedCardIdsFromStorage().includes(card.id)
  })));

  useEffect(() => {
    const handleStorageChange = () => {
      const currentSavedIds = getSavedCardIdsFromStorage();
      setSavedCards(prev => prev.map(card => ({
        ...card,
        isSaved: currentSavedIds.includes(card.id)
      })));
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSaveToggle = (cardId: string, currentIsSaved: boolean) => {
    toggleSaveCardInStorage(cardId, currentIsSaved);
    setSavedCards(prev => prev.map(card => {
      if (card.id === cardId) {
        return { ...card, isSaved: !currentIsSaved };
      }
      return card;
    }));
  };

  return { savedCards, handleSaveToggle };
}; 