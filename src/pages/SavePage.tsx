// src/pages/SavedPage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '@/components/layout/AppHeader';
import InsightCardList from '@/components/cards/InsightCardList';
import { Card as InsightCardData } from '@/types/card';
import Button from '@/components/common/Button';
import { useNavigate } from 'react-router-dom';
import data from '@/mocks/mock_cards.json'
// ... (로컬 스토리지 헬퍼, getTempGeneratedCards 함수는 이전과 동일) ...
const getSavedCardIdsFromStorage = (): string[] => JSON.parse(localStorage.getItem('savedInfocusCardIds') || '[]');
const toggleSaveCardInStorage = (cardId: string, currentIsSaved: boolean): void => {
    let savedIds = getSavedCardIdsFromStorage();
    if (currentIsSaved) savedIds = savedIds.filter(id => id !== cardId);
    else if (!savedIds.includes(cardId)) savedIds.push(cardId);
    localStorage.setItem('savedInfocusCardIds', JSON.stringify(savedIds));
    window.dispatchEvent(new Event('storage'));
};
const getTempGeneratedCards = (): InsightCardData[] => (window as any).tempGeneratedCards || [];


const SavedPage: React.FC = () => {
    const navigate = useNavigate();
    const [savedCards, setSavedCards] = useState<InsightCardData[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sortBy, setSortBy] = useState<'date' | 'title'>('date');

    const loadSavedCards = useCallback(() => {
        setIsLoading(true);
        const savedIds = getSavedCardIdsFromStorage();
        const tempGenerated = getTempGeneratedCards();
        const allAvailableCards = [...data, ...tempGenerated];
        const userSavedCardsData = allAvailableCards
            .filter(card => savedIds.includes(card.id))
            .map(card => ({ ...card, isSaved: true }));

        userSavedCardsData.sort((a, b) => {
            if (sortBy === 'date') {
                const aDate = a.createdAt ? new Date(a.createdAt).getTime() : 0;
                const bDate = b.createdAt ? new Date(b.createdAt).getTime() : 0;
                return bDate - aDate;
            }
            if (sortBy === 'title') return a.title.localeCompare(b.title);
            return 0;
        });
        setSavedCards(userSavedCardsData);
        setIsLoading(false);
    }, [sortBy]);

    useEffect(() => {
        loadSavedCards(); /* ... (스토리지 핸들러 동일) ... */
        const handleStorageChange = () => loadSavedCards();
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [loadSavedCards]);

    const handleUnsave = (cardId: string) => {
        toggleSaveCardInStorage(cardId, true); // 저장 취소
        setSavedCards(prev => prev.filter(card => card.id !== cardId));
    };
    const handleShare = async (cardId: string) => { /* ... (이전과 동일) ... */ };
    const handleTagClick = (tag: string) => navigate(`/?topic=${tag}`);
    const handleViewDetails = (cardId: string) => navigate(`/card/${cardId}`);

    return (
        <div className="pb-20 bg-infocus-canvas min-h-screen"> {/* 페이지 배경색 */}
            <AppHeader userInfo={{ name: "홍길동", email: "hong@example.com", profileImage: "" }} />
            <div className="container mx-auto p-3 sm:p-4">
                <div className="my-4 flex items-center space-x-2">
                    {/* 테마 텍스트 색상 적용 */}
                    <span className="text-sm text-infocus-subtext">정렬:</span>
                    <Button variant={sortBy === 'date' ? 'primary' : 'outline'} size="sm" onClick={() => setSortBy('date')}>최신순</Button>
                    <Button variant={sortBy === 'title' ? 'primary' : 'outline'} size="sm" onClick={() => setSortBy('title')}>제목순</Button>
                </div>
                <InsightCardList
                    cards={savedCards}
                    isLoading={isLoading}
                    onSaveToggle={handleUnsave}
                    onShare={handleShare}
                    onTagClick={handleTagClick}
                    onViewDetails={handleViewDetails}
                    emptyMessage="아직 저장한 카드가 없습니다."
                />
            </div>
        </div>
    );
};
export default SavedPage;