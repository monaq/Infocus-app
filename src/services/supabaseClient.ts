// src/services/supabaseClient.ts
import { createClient } from '@supabase/supabase-js';
import { InsightCardData } from '../types/card'; // 타입 경로 확인

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Supabase URL or Anon Key is missing. Check your .env file.");
}

// Database 인터페이스 정의 (테이블과 컬럼명 기준)
// 실제 DB 스키마와 일치해야 합니다.
export interface Database {
  public: {
    Tables: {
      insights: {
        Row: { // select 시 반환되는 행의 타입
          id: string;
          created_at: string;
          title: string;
          source?: string | null;
          tags?: string[] | null;
          insight: string;
          image_url?: string | null;
        };
        Insert: { // insert 시 필요한 타입 (id, created_at은 자동 생성될 수 있음)
          id?: string; // UUID는 자동 생성되므로 필수가 아님
          title: string;
          source?: string | null;
          tags?: string[] | null;
          insight: string;
          image_url?: string | null;
        };
        Update: { // update 시 필요한 타입
          title?: string;
          source?: string | null;
          tags?: string[] | null;
          insight?: string;
          image_url?: string | null;
        };
      };
    };
    Views: {
      // ... 뷰가 있다면 정의
    };
    Functions: {
      // ... 함수가 있다면 정의
    };
  };
}

// 타입 파라미터로 Database 인터페이스를 전달
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Supabase Row -> InsightCardData 변환 함수
export const fromSupabaseToInsightCardData = (row: Database['public']['Tables']['insights']['Row']): InsightCardData => {
  return {
    id: row.id,
    title: row.title,
    source: row.source || undefined, // null을 undefined로
    tags: row.tags || [],           // null을 빈 배열로
    insight: row.insight,
    imageUrl: row.image_url || undefined,
    createdAt: row.created_at,
    // isSaved는 클라이언트 측에서 localStorage 기반으로 동적으로 설정
  };
};