// src/pages/GeneratePage.tsx
import React, { useState } from 'react';
import AppHeader from '../components/layout/AppHeader';
import Button from '../components/common/Button';
import InsightCard from '../components/cards/InsightCard';
import { Card as InsightCardData } from '../types/card';
import { useNavigate } from 'react-router-dom';

// ... (OpenAI API 호출 함수, 로컬 스토리지 헬퍼, 임시 카드 저장 로직은 이전과 동일) ...
const callOpenAIToSummarize = async (text: string): Promise<Omit<InsightCardData, 'id' | 'isSaved' | 'createdAt' | 'source'>> => { /* ... */
    return new Promise(resolve => {
        setTimeout(() => {
            const bullets = text.split(/[.!?\n]/).filter(s => s.trim().length > 10).slice(0, 3).map(s => `- ${s.trim()}`);
            if (bullets.length === 0) bullets.push("- 요약할 내용이 충분하지 않습니다.");
            resolve({ title: text.substring(0, 20) + (text.length > 20 ? "..." : "") + " 요약", insight: `입력된 내용 기반 요약입니다:\n${bullets.join('\n')}`, tags: ["AI생성", "요약"], });
        }, 1500);
    });
};
const getSavedCardIdsFromStorage = (): string[] => JSON.parse(localStorage.getItem('savedInfocusCardIds') || '[]');
const addCardIdToStorage = (cardId: string): void => { /* ... */
    let savedIds = getSavedCardIdsFromStorage();
    if (!savedIds.includes(cardId)) { savedIds.push(cardId); localStorage.setItem('savedInfocusCardIds', JSON.stringify(savedIds)); window.dispatchEvent(new Event('storage')); }
};
if (!(window as any).tempGeneratedCards) { (window as any).tempGeneratedCards = []; }
const tempGeneratedCards: InsightCardData[] = (window as any).tempGeneratedCards;


const GeneratePage: React.FC = () => {
    const navigate = useNavigate();
    const [inputText, setInputText] = useState<string>('');
    const [generatedCard, setGeneratedCard] = useState<InsightCardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const handleSummarize = async () => { /* ... (이전과 동일) ... */
        if (!inputText.trim()) { setError("요약할 내용을 입력해주세요."); return; }
        setIsLoading(true); setError(null); setGeneratedCard(null);
        try {
            const summaryData = await callOpenAIToSummarize(inputText);
            const newCard: InsightCardData = { ...summaryData, id: `gen-<span class="math-inline">\{Date\.now\(\)\}\-</span>{Math.random().toString(36).substring(2, 7)}`, source: "AI 요약 엔진 (Infocus)", createdAt: new Date().toISOString(), isSaved: false, };
            setGeneratedCard(newCard);
            if (!tempGeneratedCards.find(c => c.id === newCard.id)) { tempGeneratedCards.push(newCard); }
        } catch (err) { setError("요약 생성 중 오류가 발생했습니다."); console.error(err); }
        finally { setIsLoading(false); }
    };
    const handleSaveGeneratedCard = (cardId: string) => { /* ... (이전과 동일) ... */
        if (generatedCard && cardId === generatedCard.id && !generatedCard.isSaved) {
            addCardIdToStorage(cardId);
            setGeneratedCard(prev => prev ? { ...prev, isSaved: true } : null);
            const cardInTemp = tempGeneratedCards.find(c => c.id === cardId);
            if (cardInTemp) cardInTemp.isSaved = true;
            alert("카드가 저장되었습니다!");
        }
    };
    const handleShareGeneratedCard = async (cardId: string) => { /* ... (이전과 동일) ... */ };
    const handleTagClickOnGenerated = (tag: string) => navigate(`/?topic=${tag}`);
    const handleViewDetails = (cardId: string) => { if (generatedCard && cardId === generatedCard.id) navigate(`/card/${cardId}`); };

    return (
        <div className="pb-20 bg-infocus-canvas min-h-screen"> {/* 페이지 배경색 */}
            <AppHeader userInfo={{ name: "홍길동", email: "hong@example.com", profileImage: "" }} />
            <div className="container mx-auto p-3 sm:p-4">
                <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    placeholder="당신의 인사이트를 여기에 입력하세요."
                    rows={10}
                    className="w-full p-3 border border-infocus-divider rounded-md focus:ring-2 focus:ring-infocus-primary focus:border-infocus-primary resize-none bg-infocus-surface text-infocus-text placeholder-infocus-muted"
                />
                <Button onClick={handleSummarize} disabled={isLoading} className="w-full mt-4 py-2.5" variant="primary">
                    {isLoading ? '요약 중...' : 'AI 요약하기'}
                </Button>
                {/* 테마 에러 색상 적용 */}
                {error && <p className="text-infocus-error mt-4 text-center">{error}</p>}
                {generatedCard && (
                    <div className="mt-6">
                        {/* 테마 텍스트 색상 적용 */}
                        <h3 className="text-lg font-semibold mb-3 text-infocus-text">생성된 인사이트 카드:</h3>
                        <InsightCard
                            card={generatedCard}
                            onSaveToggle={() => handleSaveGeneratedCard(generatedCard.id)}
                            onShare={() => handleShareGeneratedCard(generatedCard.id)}
                            onTagClick={handleTagClickOnGenerated}
                            onViewDetails={handleViewDetails}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default GeneratePage;