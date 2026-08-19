export interface User {
  id: string;
  email?: string;
  role?: string;
  phone?: string;
  created_at?: string;
  updated_at?: string;
  name?: string;
  first_name?: string;
  middle_name?: string | null;
  paternal_last_name?: string;
  maternal_last_name?: string;
}
export interface SignInCredentials {
  email: string;
  password: string;
}
export interface Session {
  access_token: string;
  refresh_token: string;
  user: User;
}

export interface SignUpCredentials {
  email: string;
  password: string;
  name?: string; // Full name (combined)
  first_name: string;
  middle_name?: string | null;
  paternal_last_name: string;
  maternal_last_name: string;
  phone?: string;
  role?: string;
  status?: string;
}

export type ProfessionalProfileType = {
  id: string;
  whatsapp_no: string;
  city: string;
  country: string;
  speciality: string;
  professional_id: string;
  is_verified: boolean;
  created_at: string; // ISO date string
  user_id: string;
};
