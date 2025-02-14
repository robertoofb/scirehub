import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { supabase } from "../../../lib/supabase";

export function EditProfileDialog({ isOpen, setIsOpen, profile, onSave }) {
  const [profileData, setProfileData] = useState({
    full_name: "",
    title: "",
    skills: "",
    avatar_url: "",
    email: "",
    phone: "",
    social_links: {
      instagram: "",
      facebook: "",
      tiktok: "",
    },
  });
  const [newAvatar, setNewAvatar] = useState(null);

  useEffect(() => {
    if (profile) {
      setProfileData({
        full_name: profile.full_name || "",
        title: profile.title || "",
        skills: profile.skills || "",
        avatar_url: profile.avatar_url || "",
        email: profile.email || "",
        phone: profile.phone || "",
        social_links: profile.social_links || {
          instagram: "",
          facebook: "",
          tiktok: "",
        },
      });
    }
  }, [profile]);

  const handleSave = async () => {
    try {
      let avatarUrl = profileData.avatar_url;

      if (newAvatar) {
        const { data, error } = await supabase.storage
          .from("avatars")
          .upload(`${profile.id}/${Date.now()}_${newAvatar.name}`, newAvatar);

        if (error) throw error;

        avatarUrl = supabase.storage
          .from("avatars")
          .getPublicUrl(data.path).data.publicUrl;
      }

      const updatedProfile = {
        ...profileData,
        avatar_url: avatarUrl,
      };

      const { error } = await supabase
        .from("profiles")
        .update({
          ...updatedProfile,
          social_links: JSON.stringify(updatedProfile.social_links),
        })
        .eq("id", profile.id);

      if (error) throw error;

      onSave(updatedProfile);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al guardar perfil:", error.message);
    }
  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setNewAvatar(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-gray-800 text-white">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold text-blue-400">Editar Perfil</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name">Nombre completo</Label>
            <Input
              id="full_name"
              placeholder="Nombre completo"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.full_name}
              onChange={(e) => setProfileData({ ...profileData, full_name: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="title">Título</Label>
            <Input
              id="title"
              placeholder="Título"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.title}
              onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="skills">Habilidades</Label>
            <Textarea
              id="skills"
              placeholder="Habilidades (separadas por comas)"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.skills}
              onChange={(e) => setProfileData({ ...profileData, skills: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="email">Correo electrónico</Label>
            <Input
              id="email"
              placeholder="Correo electrónico"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.email}
              onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="phone">Número de teléfono</Label>
            <Input
              id="phone"
              placeholder="Número de teléfono"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.phone}
              onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
            />
          </div>
          <div>
            <Label htmlFor="instagram">URL de Instagram</Label>
            <Input
              id="instagram"
              placeholder="URL de Instagram"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.social_links.instagram}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  social_links: { ...profileData.social_links, instagram: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="facebook">URL de Facebook</Label>
            <Input
              id="facebook"
              placeholder="URL de Facebook"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.social_links.facebook}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  social_links: { ...profileData.social_links, facebook: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="tiktok">URL de TikTok</Label>
            <Input
              id="tiktok"
              placeholder="URL de TikTok"
              className="bg-gray-700 border-gray-600 text-white"
              value={profileData.social_links.tiktok}
              onChange={(e) =>
                setProfileData({
                  ...profileData,
                  social_links: { ...profileData.social_links, tiktok: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="avatar">Foto de perfil</Label>
            <Input
              id="avatar"
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="bg-gray-700 border-gray-600 text-white"
            />
          </div>
          {(profileData.avatar_url || newAvatar) && (
            <div className="mt-2">
              <img 
                src={newAvatar ? URL.createObjectURL(newAvatar) : profileData.avatar_url} 
                alt="Avatar" 
                className="w-24 h-24 rounded-full object-cover"
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave} className="bg-blue-500 hover:bg-blue-600 text-white">
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
