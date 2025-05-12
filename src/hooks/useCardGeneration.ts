import { useState } from 'react';
import { InsightCardData } from '../types/card';

// 임시 카드 저장소 초기화
if (!(window as any).tempGeneratedCards) {
    (window as any).tempGeneratedCards = [];
}
const tempGeneratedCards: InsightCardData[] = (window as any).tempGeneratedCards;

// OpenAI API 호출 함수
const callOpenAIToSummarize = async (text: string): Promise<Omit<InsightCardData, 'id' | 'isSaved' | 'createdAt' | 'source'>> => {
    return new Promise(resolve => {
        setTimeout(() => {
            const bullets = text.split(/[.!?\n]/).filter(s => s.trim().length > 10).slice(0, 3).map(s => `- ${s.trim()}`);
            if (bullets.length === 0) bullets.push("- 요약할 내용이 충분하지 않습니다.");
            resolve({
                title: text.substring(0, 20) + (text.length > 20 ? "..." : "") + " 요약",
                insight: `입력된 내용 기반 요약입니다:\n${bullets.join('\n')}`,
                tags: ["AI생성", "요약"],
            });
        }, 1500);
    });
};

export const useCardGeneration = () => {
    const [generatedCard, setGeneratedCard] = useState<InsightCardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const generateCard = async (inputText: string) => {
        if (!inputText.trim()) {
            setError("요약할 내용을 입력해주세요.");
            return;
        }

        setIsLoading(true);
        setError(null);
        setGeneratedCard(null);

        try {
            const summaryData = await callOpenAIToSummarize(inputText);
            const newCard: InsightCardData = {
                ...summaryData,
                id: `gen-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
                source: "AI 요약 엔진 (Infocus)",
                createdAt: new Date().toISOString(),
                isSaved: false,
            };
            setGeneratedCard(newCard);
            if (!tempGeneratedCards.find(c => c.id === newCard.id)) {
                tempGeneratedCards.push(newCard);
            }
        } catch (err) {
            setError("요약 생성 중 오류가 발생했습니다.");
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        generatedCard,
        isLoading,
        error,
        generateCard,
        setGeneratedCard,
    };
};