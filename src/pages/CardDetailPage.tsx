// src/pages/CardDetailPage.tsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AppHeader from '@/components/layout/AppHeader';
import InsightCard from '@/components/cards/InsightCard';
import { Card as InsightCardData } from '@/types/card';
import Button from '@/components/common/Button';
import { ArrowLeft } from 'lucide-react';
import data from '@/mocks/mock_cards.json'

const getSavedCardIdsFromStorage = (): string[] => JSON.parse(localStorage.getItem('savedInfocusCardIds') || '[]');
const toggleSaveCardInStorage = (cardId: string, currentIsSaved: boolean): void => { /* ... */
    let savedIds = getSavedCardIdsFromStorage();
    if (currentIsSaved) savedIds = savedIds.filter(id => id !== cardId);
    else if (!savedIds.includes(cardId)) savedIds.push(cardId);
    localStorage.setItem('savedInfocusCardIds', JSON.stringify(savedIds));
    window.dispatchEvent(new Event('storage'));
};
const getTempGeneratedCards = (): InsightCardData[] => (window as any).tempGeneratedCards || [];
const fetchCardByIdFromAllSources = async (id: string): Promise<InsightCardData | null> => { /* ... */
    const tempGenerated = getTempGeneratedCards();
    let card = tempGenerated.find(c => c.id === id) || null;
    if (!card) card = data.find(c => c.id === id) || null;
    if (card) { const savedIds = getSavedCardIdsFromStorage(); card.isSaved = savedIds.includes(card.id); }
    return new Promise(resolve => setTimeout(() => resolve(card), 100));
};


const CardDetailPage: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [card, setCard] = useState<InsightCardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => { /* ... (이전과 동일) ... */
        if (id) {
            setIsLoading(true);
            fetchCardByIdFromAllSources(id)
                .then(data => { if (data) setCard(data); else navigate('/', { replace: true }); setIsLoading(false); })
                .catch(err => { console.error("카드 상세 정보 로딩 실패:", err); setIsLoading(false); navigate('/', { replace: true }); });
        }
    }, [id, navigate]);

    useEffect(() => { /* ... (스토리지 핸들러 동일) ... */
        const handleStorageChange = () => {
            if (card && id) {
                const savedIds = getSavedCardIdsFromStorage();
                if (card.isSaved !== savedIds.includes(id)) setCard(prev => prev ? { ...prev, isSaved: savedIds.includes(id) } : null);
            }
        };
        window.addEventListener('storage', handleStorageChange);
        return () => window.removeEventListener('storage', handleStorageChange);
    }, [card, id]);

    const handleSaveToggle = (cardId: string, currentIsSaved: boolean) => { /* ... (이전과 동일, 임시 카드 상태 업데이트 포함) ... */
        if (!card) return;
        toggleSaveCardInStorage(cardId, currentIsSaved);
        setCard(prev => (prev ? { ...prev, isSaved: !currentIsSaved } : null));
        const tempCard = getTempGeneratedCards().find(c => c.id === cardId);
        if (tempCard) tempCard.isSaved = !currentIsSaved;
    };
    const handleShare = async (cardId: string) => { /* ... (이전과 동일) ... */ };
    const handleTagClick = (tag: string) => navigate(`/?topic=${tag}`);

    // 테마 텍스트 색상 적용
    if (isLoading) return <div className="p-4 text-center text-infocus-subtext">카드 정보를 불러오는 중...</div>;
    if (!card) return <div className="p-4 text-center text-infocus-subtext">카드를 찾을 수 없습니다. <Button onClick={() => navigate('/')}>홈으로</Button></div>;

    return (
        <div className="pb-20 bg-infocus-canvas min-h-screen"> {/* 페이지 배경색 */}
            <AppHeader userInfo={{ name: "홍길동", email: "hong@example.com", profileImage: "" }} title={card.title} />
            <div className="container mx-auto p-3 sm:p-4">
                <Button variant="ghost" onClick={() => navigate(-1)} className="mb-4 text-sm text-infocus-subtext">
                    <ArrowLeft size={18} className="mr-1" /> 뒤로가기
                </Button>
                <InsightCard
                    card={card}
                    onSaveToggle={handleSaveToggle}
                    onShare={handleShare}
                    onTagClick={handleTagClick}
                    isDetailedView={true}
                />
            </div>
        </div>
    );
};
export default CardDetailPage;