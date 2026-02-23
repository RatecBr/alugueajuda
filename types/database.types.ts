export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          role: 'user' | 'professional' | 'admin' | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          price_per_minute: number | null
          stripe_account_id: string | null
          ai_verified: boolean | null
          ai_score: number | null
          created_at: string
        }
        Insert: {
          id: string
          role?: 'user' | 'professional' | 'admin' | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          price_per_minute?: number | null
          stripe_account_id?: string | null
          ai_verified?: boolean | null
          ai_score?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          role?: 'user' | 'professional' | 'admin' | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          price_per_minute?: number | null
          stripe_account_id?: string | null
          ai_verified?: boolean | null
          ai_score?: number | null
          created_at?: string
        }
      }
      sessions: {
        Row: {
          id: string
          user_id: string | null
          professional_id: string | null
          status: 'pending' | 'active' | 'finished' | 'cancelled' | null
          started_at: string | null
          ended_at: string | null
          total_minutes: number | null
          total_amount: number | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id?: string | null
          professional_id?: string | null
          status?: 'pending' | 'active' | 'finished' | 'cancelled' | null
          started_at?: string | null
          ended_at?: string | null
          total_minutes?: number | null
          total_amount?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string | null
          professional_id?: string | null
          status?: 'pending' | 'active' | 'finished' | 'cancelled' | null
          started_at?: string | null
          ended_at?: string | null
          total_minutes?: number | null
          total_amount?: number | null
          created_at?: string
        }
      }
    }
  }
}
