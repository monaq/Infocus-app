// src/pages/HomePage.tsx
import React from 'react';
import AppHeader from '../components/layout/AppHeader';
import InsightCardList from '../components/cards/InsightCardList';
import TagChip from '../components/common/TagChip';
import Button from '../components/common/Button';
import { useNavigate } from 'react-router-dom';
import { useInsights } from '../hooks/useInsights';
import { useSavedCards } from '../hooks/useSavedCards';
import { useTopicSelection } from '../hooks/useTopicSelection';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const { selectedTopic, handleTopicSelect } = useTopicSelection();
  const { insights, isLoading, error, loadInsights, availableTopics } = useInsights(selectedTopic);
  const { savedCards, handleSaveToggle } = useSavedCards(insights);

  React.useEffect(() => {
    loadInsights(selectedTopic);
  }, [loadInsights, selectedTopic]);

  const handleShare = async (cardId: string) => {
    // TODO: 공유 기능 구현
  };

  const handleViewDetails = (cardId: string) => navigate(`/card/${cardId}`);

  return (
    <div className="pb-20 bg-infocus-canvas min-h-screen">
      <AppHeader title="오늘의 Infocus" />
      <div className="container mx-auto p-3 sm:p-4">
        <InsightCardList
          cards={insights}
          isLoading={isLoading}
          error={error}
          onSaveToggle={handleSaveToggle}
          onShare={handleShare}
          onTagClick={handleTopicSelect}
          onViewDetails={handleViewDetails}
        />
        <section className="mb-4 sm:mb-6">
          <h2 className="text-sm font-medium mb-3 text-infocus-subtext">주제별로 보기:</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {availableTopics.map(topic => (
              <TagChip
                key={topic}
                tag={topic}
                onClick={() => handleTopicSelect(topic)}
                isActive={selectedTopic === topic}
              />
            ))}
            {selectedTopic && (
              <Button variant="ghost" size="sm" onClick={() => handleTopicSelect(selectedTopic)} className="text-xs !px-2 !py-1">
                선택 해제
              </Button>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;