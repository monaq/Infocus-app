import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export const useTopicSelection = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [selectedTopic, setSelectedTopic] = useState<string | undefined>(undefined);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const topicFromQuery = queryParams.get('topic');
    if (topicFromQuery) {
      setSelectedTopic(topicFromQuery);
    } else {
      setSelectedTopic(undefined);
    }
  }, [location.search]);

  const handleTopicSelect = (topic: string) => {
    const newTopic = selectedTopic === topic ? undefined : topic;
    setSelectedTopic(newTopic);
    if (newTopic) {
      navigate(`/?topic=${newTopic}`, { replace: true });
    } else {
      navigate('/', { replace: true });
    }
  };

  return {
    selectedTopic,
    handleTopicSelect
  };
}; 