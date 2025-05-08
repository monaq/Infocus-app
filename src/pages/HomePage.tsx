// src/pages/HomePage.tsx
import React, { useState, useEffect, useCallback } from 'react';
import AppHeader from '../components/layout/AppHeader';
import InsightCardList from '../components/cards/InsightCardList';
import { Card as InsightCardData } from '../types/card';
import TagChip from '../components/common/TagChip';
import Button from '../components/common/Button';
import { useNavigate, useLocation } from 'react-router-dom';
import mockData from '../mocks/mock_cards.json';

// ... (로컬 스토리지 헬퍼, fetchHomePageInsights 함수는 이전과 동일)
const getSavedCardIdsFromStorage = (): string[] => JSON.parse(localStorage.getItem('savedInfocusCardIds') || '[]');
const toggleSaveCardInStorage = (cardId: string, currentIsSaved: boolean): void => {
  let savedIds = getSavedCardIdsFromStorage();
  if (currentIsSaved) savedIds = savedIds.filter(id => id !== cardId);
  else if (!savedIds.includes(cardId)) savedIds.push(cardId);
  localStorage.setItem('savedInfocusCardIds', JSON.stringify(savedIds));
  window.dispatchEvent(new Event('storage'));
};
const fetchHomePageInsights = async (topic?: string): Promise<InsightCardData[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const cardsToProcess = mockData.map(card => ({ ...card }));
      const filtered = topic ? cardsToProcess.filter(card => card.tags.includes(topic)) : cardsToProcess;
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, Math.floor(Math.random() * 3) + 1));
    }, 300);
  });
};


const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [insights, setInsights] = useState<InsightCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicFromQuery = queryParams.get('topic');
    if (topicFromQuery) setSelectedTopic(topicFromQuery);
    else setSelectedTopic(undefined); // 쿼리 없으면 초기화
  }, [location.search]);

  const availableTopics = React.useMemo(() => {
    const allTags = mockData.flatMap(card => card.tags);
    return [...new Set(allTags)].sort();
  }, []);

  const loadInsights = useCallback(async (topic?: string) => {
    setIsLoading(true); setError(null);
    try {
      const data = await fetchHomePageInsights(topic);
      const currentSavedIds = getSavedCardIdsFromStorage();
      setInsights(data.map(card => ({ ...card, isSaved: currentSavedIds.includes(card.id) })));
    } catch (err) { setError('인사이트를 불러오는 데 실패했습니다.'); console.error(err);
    } finally { setIsLoading(false); }
  }, []);

  useEffect(() => { loadInsights(selectedTopic); }, [loadInsights, selectedTopic]);

  useEffect(() => {
    const handleStorageChange = () => {
      const currentSavedIds = getSavedCardIdsFromStorage();
      setInsights(prev => prev.map(card => ({ ...card, isSaved: currentSavedIds.includes(card.id) })));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const handleSaveToggle = (cardId: string, currentIsSaved: boolean) => {
    toggleSaveCardInStorage(cardId, currentIsSaved);
    setInsights(prev => prev.map(card => card.id === cardId ? { ...card, isSaved: !currentIsSaved } : card ));
  };

  const handleShare = async (cardId: string) => { /* ... (이전과 동일) ... */ };

  const handleTopicSelect = (topic: string) => {
    const newTopic = selectedTopic === topic ? undefined : topic;
    setSelectedTopic(newTopic);
    if (newTopic) navigate(`/?topic=${newTopic}`, { replace: true });
    else navigate('/', { replace: true });
  };
  const handleViewDetails = (cardId: string) => navigate(`/card/${cardId}`);

  return (
    <div className="pb-20 bg-infocus-canvas min-h-screen"> {/* 페이지 배경색 */}
      <AppHeader title="오늘의 Infocus" />
      <div className="container mx-auto p-3 sm:p-4">
        <section className="mb-4 sm:mb-6">
          {/* 테마 텍스트 색상 적용 */}
          <h2 className="text-sm font-medium mb-3 text-infocus-subtext">주제별로 보기:</h2>
          <div className="flex flex-wrap gap-2 items-center">
            {availableTopics.map(topic => (
              <TagChip
                key={topic}
                tag={topic}
                onClick={() => handleTopicSelect(topic)}
                // isActive prop으로 활성 상태 스타일링
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

        <InsightCardList
          cards={insights}
          isLoading={isLoading}
          error={error}
          onSaveToggle={handleSaveToggle}
          onShare={handleShare}
          onTagClick={handleTopicSelect}
          onViewDetails={handleViewDetails}
        />
      </div>
    </div>
  );
};
export default HomePage;