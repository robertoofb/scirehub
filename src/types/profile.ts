export interface User {
    id: string;
    email: string;
  }
  
  export interface Profile {
    id: string;
    full_name: string;
    avatar_url: string;
    title: string;
    skills: string;
    bio: string;
    email?: string;
    phone?: string;
    instagram_url?: string;
    facebook_url?: string;
    tiktok_url?: string;
  }
  
  export interface AcademicHistory {
    id: string;
    user_id: string;
    degree: string;
    institution: string;
    year: string;
  }
  
  export interface Award {
    id: string;
    user_id: string;
    name: string;
    institution: string;
    date: string;
  }
  