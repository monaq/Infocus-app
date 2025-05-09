export type Card = {
  id: string;
  title: string;
  source?: string;
  tags: string[];
  insight: string;
  imageUrl?: string;
  createdAt: string;
  isSaved?: boolean;
};
// src/types/card.ts
export interface InsightTag {
  id: string;
  name: string;
}
