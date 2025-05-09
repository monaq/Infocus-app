// src/components/cards/InsightCardList.tsx
import React from 'react';
import { Card as InsightCardData } from '../../types/card';
import InsightCard from './InsightCard';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import '../../styles/slick-custom.css';

interface InsightCardListProps {
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
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1.3,
    slidesToScroll: 1,
    arrows: false,
    className: "insight-slider",
    centerMode: true,
    centerPadding: '0',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          centerMode: true,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.3,
          slidesToScroll: 1,
          arrows: false,
          centerMode: true,
        }
      }
    ]
  };

  if (isLoading) {
    return <div className="flex justify-center items-center h-64 text-infocus-subtext">로딩 중...</div>;
  }

  if (error) {
    return <div className="text-infocus-error text-center p-4">오류: {error}</div>;
  }

  if (cards.length === 0) {
    return <div className="text-center p-8 text-infocus-subtext">{emptyMessage}</div>;
  }

  return (
    <div className="insight-card-slider">
      <Slider {...settings}>
        {cards.map((card) => (
          <div key={card.id} className="px-2">
            <InsightCard
              card={card}
              onSaveToggle={onSaveToggle}
              onShare={onShare}
              onTagClick={onTagClick}
              onViewDetails={onViewDetails}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default InsightCardList;