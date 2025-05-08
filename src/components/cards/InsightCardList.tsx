// src/components/cards/InsightCardList.tsx
import React from 'react';
import { Card as InsightCardData } from '../../types/card';
import InsightCard from './InsightCard';

interface InsightCardListProps {
  // ... (props는 이전과 동일)
  cards: InsightCardData[];
  isLoading: boolean;
  error?: string | null;
  onSaveToggle: (cardId: string, isSaved: boolean) => void;
  onShare: (cardId: string) => void;
  onTagClick: (tag: string) => void;
  onViewDetails?: (cardId: string) => void;
  emptyMessage?: string;
}

const InsightCardList: React.FC<InsightCardListProps> = ({
  cards,
  isLoading,
  error,
  onSaveToggle,
  onShare,
  onTagClick,
  onViewDetails,
  emptyMessage = "표시할 인사이트가 없습니다."
}) => {
  if (isLoading) {
    // 테마 색상 적용
    return <div className="flex justify-center items-center h-64 text-infocus-subtext"> 로딩 중... </div>;
  }

  if (error) {
    // 테마 에러 색상 적용
    return <div className="text-infocus-error text-center p-4">오류: {error}</div>;
  }

  if (cards.length === 0) {
    // 테마 텍스트 색상 적용
    return <div className="text-center p-8 text-infocus-subtext"> {emptyMessage} </div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {cards.map((card) => (
        <InsightCard
          key={card.id}
          card={card}
          onSaveToggle={onSaveToggle}
          onShare={onShare}
          onTagClick={onTagClick}
          onViewDetails={onViewDetails}
        />
      ))}
    </div>
  );
};

export default InsightCardList;