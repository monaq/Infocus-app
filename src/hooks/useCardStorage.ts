import { useCallback } from 'react';
import { InsightCardData } from '../types/card';

const getSavedCardIdsFromStorage = (): string[] => {
    return JSON.parse(localStorage.getItem('savedInfocusCardIds') || '[]');
};

export const useCardStorage = () => {
    const addCardIdToStorage = useCallback((cardId: string): void => {
        let savedIds = getSavedCardIdsFromStorage();
        if (!savedIds.includes(cardId)) {
            savedIds.push(cardId);
            localStorage.setItem('savedInfocusCardIds', JSON.stringify(savedIds));
            window.dispatchEvent(new Event('storage'));
        }
    }, []);

    const saveCard = useCallback((card: InsightCardData): InsightCardData => {
        if (!card.isSaved) {
            addCardIdToStorage(card.id);
            return { ...card, isSaved: true };
        }
        return card;
    }, [addCardIdToStorage]);

    return {
        addCardIdToStorage,
        saveCard,
        getSavedCardIdsFromStorage,
    };
};