"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import Image from "next/image";
import { Instagram, Facebook, Search, MessageCircle, Plus, Phone, Mail } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProfilePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params); // Usar `use()` para extraer `id`
  const [profile, setProfile] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [isOwnProfile, setIsOwnProfile] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const { data: { user }, error: authError } = await supabase.auth.getUser();

        // if (authError) {
        //   console.error("Error al obtener el usuario autenticado:", authError);
        //   setIsOwnProfile(false);
        // } else {
        //   setIsOwnProfile(user?.id === id);
        // }

        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", id)
          .single();

        if (profileError) {
          console.error("Error al obtener el perfil:", profileError.message);
          router.push("/404");
          return;
        }

        const { data: academicData, error: academicError } = await supabase
          .from("academic_history")
          .select("*")
          .eq("user_id", id);

        if (academicError) {
          console.error("Error al obtener el historial académico:", academicError.message);
        }

        const { data: awardsData, error: awardsError } = await supabase
          .from("awards")
          .select("*")
          .eq("user_id", id);

        if (awardsError) {
          console.error("Error al obtener distinciones:", awardsError.message);
        }

        const { count: articleCount, error: articleError } = await supabase
          .from("investigaciones")
          .select("*", { count: "exact" })
          .eq("id_autor", id);

        if (articleError) {
          console.error("Error al obtener artículos:", articleError.message);
        }

        const { count: followersCount, error: followersError } = await supabase
          .from("followers")
          .select("*", { count: "exact" })
          .eq("user_id", id);

        if (followersError) {
          console.error("Error al obtener seguidores:", followersError.message);
        }

        setProfile({
          ...profileData,
          academic_history: academicData || [],
          awards: awardsData || [],
          articleCount: articleCount || 0,
          followersCount: followersCount || 0,
        });
      } catch (err) {
        console.error("Error inesperado:", err);
        router.push("/404");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchUserProfile();
  }, [id, router]);

  if (loading) {
    return <div className="text-center text-white">Cargando perfil...</div>;
  }

  if (!profile) {
    return <div className="text-center text-white">Perfil no encontrado.</div>;
  }

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <Card className="bg-[#1C323D] border-none shadow-lg mb-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
              <div className="relative w-48 h-48">
                <Image
                  src={profile.avatar_url || "/placeholder.svg"}
                  alt={profile.full_name}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full"
                />
                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800" />
              </div>
              <div className="flex-1 space-y-6">
                <div>
                  <h1 className="text-4xl font-bold text-white mb-2">
                    {profile.full_name || "Perfil no encontrado"}
                  </h1>
                  <h2 className="text-2xl font-semibold text-gray-300 mb-3">
                    {profile.title || "Título no definido"}
                  </h2>
                  <div className="flex flex-wrap gap-2 text-sm">
                    {profile.skills ? (
                      profile.skills.split(",").map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="bg-blue-500/20 text-blue-300">
                          {skill.trim()}
                        </Badge>
                      ))
                    ) : (
                      <span className="text-gray-400">Sin habilidades definidas</span>
                    )}
                  </div>
                </div>

                <div className="flex flex-col gap-2 text-gray-300">
                  {profile.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span>{profile.email}</span>
                    </div>
                  )}
                  {profile.phone && (
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <span>{profile.phone}</span>
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  {profile.social_links?.instagram && (
                    <a href={profile.social_links.instagram} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Instagram className="w-6 h-6" />
                    </a>
                  )}
                  {profile.social_links?.facebook && (
                    <a href={profile.social_links.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <Facebook className="w-6 h-6" />
                    </a>
                  )}
                  {profile.social_links?.tiktok && (
                    <a href={profile.social_links.tiktok} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">
                      <svg
                        viewBox="0 0 24 24"
                        className="w-6 h-6 fill-current"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z"/>
                      </svg>
                    </a>
                  )}
                </div>

                <div className="flex items-center gap-6 text-sm">
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-blue-400">{profile.articleCount}</span>
                    <span className="text-gray-300">Artículos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-blue-400">{profile.followersCount}</span>
                    <span className="text-gray-300">Seguidores</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-blue-400">{profile.academic_history.length}</span>
                    <span className="text-gray-300">Logros académicos</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-semibold text-blue-400">{profile.awards.length}</span>
                    <span className="text-gray-300">Distinciones</span>
                  </div>
                </div>

                {!isOwnProfile && (
                  <div className="flex flex-wrap gap-3">
                    <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Seguir
                    </Button>
                    <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Mensaje
                    </Button>
                    <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-[#1C323D] border-none shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Acerca de mí</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300 text-sm leading-relaxed">
              {profile.bio || "Sin descripción disponible."}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-[#1C323D] border-none shadow-lg mb-8">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Historial Académico</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.academic_history.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {profile.academic_history.map((item: any) => (
                  <Card key={item.id} className="bg-gray-700 border-none overflow-hidden">
                    <CardContent className="p-0">
                      {item.image_url && (
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <Image
                            src={item.image_url}
                            alt={item.degree}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-t-lg"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">{item.degree}</h4>
                        <p className="text-gray-300 mb-1">{item.institution}</p>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                          {item.year}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No se ha agregado información académica.</p>
            )}
          </CardContent>
        </Card>

        <Card className="bg-[#1C323D] border-none shadow-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-white">Distinciones</CardTitle>
          </CardHeader>
          <CardContent>
            {profile.awards.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2">
                {profile.awards.map((award: any) => (
                  <Card key={award.id} className="bg-gray-700 border-none overflow-hidden">
                    <CardContent className="p-0">
                      {award.image_url && (
                        <div className="relative w-full" style={{ paddingTop: '56.25%' }}>
                          <Image
                            src={award.image_url}
                            alt={award.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-t-lg"
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h4 className="text-lg font-bold text-blue-400 mb-2">{award.name}</h4>
                        <p className="text-gray-300 mb-1">{award.institution}</p>
                        <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">{award.date}</Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-400">No se han agregado distinciones.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
