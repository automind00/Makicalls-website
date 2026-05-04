/**
 * Supabase tablo tipleri.
 * Migration dosyasındaki şema ile eşleşmeli.
 */

export type ContactSubmissionStatus = "yeni" | "iletisim_kuruldu" | "kapandi";

export interface ContactSubmission {
  id: number;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  message: string;
  status: ContactSubmissionStatus;
  notes: string | null;
  user_agent: string | null;
}

export interface ContactSubmissionInsert {
  name: string;
  email: string;
  company?: string | null;
  message: string;
  user_agent?: string | null;
}

export interface ContactSubmissionUpdate {
  status?: ContactSubmissionStatus;
  notes?: string | null;
}

export interface AdminUser {
  email: string;
  created_at: string;
}

export type Database = {
  public: {
    Tables: {
      contact_submissions: {
        Row: ContactSubmission;
        Insert: ContactSubmissionInsert;
        Update: ContactSubmissionUpdate;
        Relationships: [];
      };
      admin_users: {
        Row: AdminUser;
        Insert: { email: string };
        Update: { email?: string };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      contact_submission_status: ContactSubmissionStatus;
    };
    CompositeTypes: Record<string, never>;
  };
};
