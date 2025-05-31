export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      application_settings: {
        Row: {
          id: string
          deadline: string
        }
        Insert: {
          id?: string
          deadline: string
        }
        Update: {
          id?: string
          deadline?: string
        }
      }
      applications: {
        Row: {
          id: string
          user_id: string
          name: string
          email: string
          register_no: string
          dept_first_pref: string
          reason_first_pref: string | null
          dept_second_pref: string
          reason_second_pref: string | null
          reason_priority: string | null
          links: string | null
          status: string
          reviewer: string | null
          submitted_at: string
        }
        Insert: {
          id?: string
          user_id: string
          name: string
          email: string
          register_no: string
          dept_first_pref: string
          reason_first_pref?: string | null
          dept_second_pref: string
          reason_second_pref?: string | null
          reason_priority?: string | null
          links?: string | null
          status?: string
          reviewer?: string | null
          submitted_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          name?: string
          email?: string
          register_no?: string
          dept_first_pref?: string
          reason_first_pref?: string | null
          dept_second_pref?: string
          reason_second_pref?: string | null
          reason_priority?: string | null
          links?: string | null
          status?: string
          reviewer?: string | null
          submitted_at?: string
        }
      }
      recruiter_departments: {
        Row: {
          id: string
          user_id: string
          department_name: string
        }
        Insert: {
          id?: string
          user_id: string
          department_name: string
        }
        Update: {
          id?: string
          user_id?: string
          department_name?: string
        }
      }
    }
  }
}