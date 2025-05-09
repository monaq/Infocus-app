import { useState, useCallback, useEffect } from 'react';
import { Card as InsightCardData } from '../types/card';
import mockData from '../mocks/mock_cards.json';

const fetchHomePageInsights = async (topic?: string): Promise<InsightCardData[]> => {
  return new Promise(resolve => {
    setTimeout(() => {
      const cardsToProcess = mockData.map(card => ({ ...card }));
      let filtered = cardsToProcess;
      if (topic) {
        filtered = cardsToProcess.filter(card => card.tags.includes(topic));
      }
      const shuffled = filtered.sort(() => 0.5 - Math.random());
      resolve(shuffled.slice(0, Math.floor(Math.random() * 3) + 1));
    }, 300);
  });
};

export const useInsights = (initialTopic?: string) => {
  const [insights, setInsights] = useState<InsightCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const loadInsights = useCallback(async (topic?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchHomePageInsights(topic);
      setInsights(data);
      console.log(data);
    } catch (err) {
      setError('인사이트를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInsights(initialTopic);
  }, [loadInsights, initialTopic]);

  const availableTopics = [...new Set(mockData.flatMap(card => card.tags))].sort();

  return {
    insights,
    isLoading,
    error,
    loadInsights,
    availableTopics
  };
}; 