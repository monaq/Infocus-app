import { useState, useCallback, useEffect } from 'react';
import { InsightCardData } from '@/types/card';
import { supabase, fromSupabaseToInsightCardData } from '@/services/supabaseClient';

const fetchHomePageInsights = async (topic?: string): Promise<InsightCardData[]> => {
  try {
    let query = supabase
      .from('insights')
      .select('*')

    if (topic) {
      query = query.contains('tags', [topic]);
    }

    const { data, error } = await query;

    console.log('data ', data);

    if (error) {
      console.error('Supabase 데이터 조회 실패:', error);
      throw error;
    }

    if (!data) {
      return [];
    }

    // Supabase 데이터를 InsightCardData 형식으로 변환
    const insights = data.map(fromSupabaseToInsightCardData);
    
    // 랜덤하게 1-3개의 카드 선택
    const shuffled = insights.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 1);
  } catch (error) {
    console.error('인사이트 로딩 중 오류 발생:', error);
    throw error;
  }
};

export const useInsights = (initialTopic?: string) => {
  const [insights, setInsights] = useState<InsightCardData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  const loadAvailableTopics = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('insights')
        .select('tags');

      if (error) {
        console.error('토픽 로딩 실패:', error);
        return;
      }

      if (data) {
        const allTags = data.flatMap(item => item.tags || []);
        const uniqueTags = [...new Set(allTags)].sort();
        setAvailableTopics(uniqueTags);
      }
    } catch (err) {
      console.error('토픽 로딩 중 오류 발생:', err);
    }
  }, []);

  const loadInsights = useCallback(async (topic?: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchHomePageInsights(topic);
      setInsights(data);
    } catch (err) {
      setError('인사이트를 불러오는 데 실패했습니다.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadInsights(initialTopic);
    loadAvailableTopics();
  }, [loadInsights, loadAvailableTopics, initialTopic]);

  return {
    insights,
    isLoading,
    error,
    loadInsights,
    availableTopics
  };
}; 