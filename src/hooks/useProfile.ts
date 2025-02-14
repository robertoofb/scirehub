import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import { User, Profile, AcademicHistory, Award } from "../types/profile";

export function useProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [profile, setProfile] = useState<Profile | null>(null);
    const [academicHistory, setAcademicHistory] = useState<AcademicHistory[]>([]);
    const [awards, setAwards] = useState<Award[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const router = useRouter();
  
    useEffect(() => {
      const fetchUserProfile = async () => {
        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();
  
        if (authError || !user) {
          console.error("Error al obtener el usuario autenticado:", authError);
          router.push("/login");
          return;
        }
  
        setUser(user);
  
        try {
          const { data: profileData, error: profileError } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .single();
  
          if (profileError) {
            console.error("Error al obtener el perfil:", profileError.message);
            return;
          }
  
          setProfile(profileData);
  
          const { data: academicData, error: academicError } = await supabase
            .from("academic_history")
            .select("*")
            .eq("user_id", user.id);
  
          if (academicError) {
            console.error("Error al obtener el historial académico:", academicError.message);
          }
  
          setAcademicHistory(academicData || []);
  
          const { data: awardsData, error: awardsError } = await supabase
            .from("awards")
            .select("*")
            .eq("user_id", user.id);
  
          if (awardsError) {
            console.error("Error al obtener distinciones:", awardsError.message);
          }
  
          setAwards(awardsData || []);
        } catch (error) {
          console.error("Error inesperado:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchUserProfile();
    }, [router]);
  
    return {
      user,
      profile,
      setProfile,
      academicHistory,
      setAcademicHistory,
      awards,
      setAwards,
      loading,
    };
  }
  