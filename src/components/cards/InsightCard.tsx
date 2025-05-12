// src/components/cards/InsightCard.tsx
import React from 'react';
import { InsightCardData } from '@/types/card';
import TagChip from '@/components/common/TagChip';
import IconButton from '@/components/common/IconButton';
import { Bookmark, Share2, ExternalLink } from 'lucide-react';

interface InsightCardProps {
  card: InsightCardData;
  onSaveToggle: (cardId: string, currentIsSaved: boolean) => void;
  onShare: (cardId: string) => void;
  onTagClick: (tag: string) => void;
  onViewDetails?: (cardId: string) => void;
  isDetailedView?: boolean;
}

const InsightCard: React.FC<InsightCardProps> = ({
  card,
  onSaveToggle,
  onShare,
  onTagClick,
  onViewDetails,
  isDetailedView = false,
}) => {
  const { id, title, insight, tags, imageUrl, isSaved, source, createdAt } = card;

  const insightDisplay = isDetailedView ? insight : insight.split('\n').slice(0, 3).join('\n');

  const formattedDate = createdAt ? new Date(createdAt).toLocaleDateString('ko-KR', {
    year: 'numeric', month: 'short', day: 'numeric'
  }) : '';

  return (
    // 테마의 borderRadius 및 boxShadow 적용
    <article className="bg-infocus-surface shadow-card rounded-card overflow-hidden m-1 flex flex-col transition-shadow hover:shadow-lg">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="w-full h-40 sm:h-48 object-cover" />
      )}
      <div className="p-4 sm:p-5 flex flex-col flex-grow">
        <h3 className="text-md sm:text-lg font-semibold text-infocus-text mb-1">{title}</h3>
        {source && <p className="text-xs text-infocus-muted mb-2 italic">{source}</p>}
        <div
          className={`text-infocus-subtext mb-3 text-sm leading-relaxed flex-grow ${isDetailedView ? 'prose prose-sm max-w-none text-infocus-subtext' : 'whitespace-pre-line'}`}
          onClick={() => !isDetailedView && onViewDetails && onViewDetails(id)}
        >
          {isDetailedView
            ? insight.split('\n').map((line, idx) => (
              <p key={idx} className="my-1 text-infocus-subtext"> {/* prose 스타일 상속 주의, 직접 색상 지정 */}
                {line.startsWith('- ') || line.startsWith('• ') ? `• ${line.substring(2)}` : line}
              </p>
            ))
            : insightDisplay}
        </div>

        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 my-3">
            {tags.map((tag) => (
              <TagChip
                key={tag}
                tag={tag}
                onClick={() => onTagClick(tag)}
              />
            ))}
          </div>
        )}
        {formattedDate && !isDetailedView && (
          <p className="text-xs text-infocus-muted mt-2 mb-1">{formattedDate}</p>
        )}

        <div className="mt-auto flex items-center justify-between pt-3 border-t border-infocus-divider">
          <div className="flex space-x-1 sm:space-x-2">
            <IconButton
              icon={<Bookmark fill={isSaved ? 'currentColor' : 'none'} size={20} />}
              ariaLabel={isSaved ? '저장 취소' : '저장하기'}
              onClick={() => onSaveToggle(id, !!isSaved)}
              className={isSaved ? 'text-infocus-accent' : 'text-infocus-muted'}
            >
              <Bookmark fill={isSaved ? 'currentColor' : 'none'} size={20} />
            </IconButton>
            <IconButton
              icon={<Share2 size={20} />}
              ariaLabel="공유하기"
              onClick={() => onShare(id)}
              className="text-infocus-muted"
            >
              <Share2 size={20} />
            </IconButton>
          </div>
        </div>
      </div>
    </article>
  );
};

export default InsightCard;