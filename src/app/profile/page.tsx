"use client";

import { useState } from "react";
import { useProfile } from "../../hooks/useProfile";
import { ProfileHeader } from "./ProfileHeader";
import { AboutSection } from "./AboutSection";
import { AcademicHistorySection } from "./AcademicHistorySection";
import { AwardsSection } from "./AwardsSection";
import { EditAcademicDialog } from "./EditAcademicDialog";
import { EditAwardDialog } from "./EditAwardDialog";
import { EditProfileDialog } from "./EditProfileDialog";
import { EditAboutDialog } from "./EditAboutDialog";
import { supabase } from "../../../lib/supabase";
import { Loader2 } from 'lucide-react';

export default function ProfilePage() {
  const {
    user,
    profile,
    academicHistory,
    awards,
    setProfile,
    setAcademicHistory,
    setAwards,
    loading,
  } = useProfile();

  const [isAboutDialogOpen, setIsAboutDialogOpen] = useState(false);
  const [aboutText, setAboutText] = useState(profile?.bio || "");
  const [isAcademicDialogOpen, setIsAcademicDialogOpen] = useState(false);
  const [editingAcademic, setEditingAcademic] = useState(null);
  const [isAwardDialogOpen, setIsAwardDialogOpen] = useState(false);
  const [editingAward, setEditingAward] = useState(null);
  const [isProfileDialogOpen, setIsProfileDialogOpen] = useState(false);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center">
        <p className="text-xl font-semibold">Perfil no encontrado.</p>
      </div>
    );
  }

  const handleSaveAbout = async (updatedProfile) => {
    try {
      const { error } = await supabase
        .from("profiles")
        .update({ bio: updatedProfile.bio, image_url: updatedProfile.image_url })
        .eq("id", user.id);

      if (error) throw error;

      setProfile((prevProfile) => ({ ...prevProfile, ...updatedProfile }));
      setIsAboutDialogOpen(false);
    } catch (error) {
      console.error("Error al guardar Acerca de mí:", error.message);
    }
  };

  const handleEditAcademic = (academic) => {
    setEditingAcademic(academic);
    setIsAcademicDialogOpen(true);
  };

  const handleEditAward = (award) => {
    setEditingAward(award);
    setIsAwardDialogOpen(true);
  };

  const handleDeleteAcademic = async (id) => {
    try {
      const { error } = await supabase
        .from("academic_history")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAcademicHistory(academicHistory.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar logro académico:", error.message);
    }
  };

  const handleDeleteAward = async (id) => {
    try {
      const { error } = await supabase
        .from("awards")
        .delete()
        .eq("id", id);

      if (error) throw error;

      setAwards(awards.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Error al eliminar distinción:", error.message);
    }
  };

  const handleEditProfile = () => {
    setIsProfileDialogOpen(true);
  };

  const handleSaveProfile = (updatedProfile) => {
    setProfile((prevProfile) => ({
      ...prevProfile,
      ...updatedProfile,
    }));
  };

  return (
    <div className="min-h-screen text-white">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <ProfileHeader
          profile={profile}
          user={user!}
          academicHistoryCount={academicHistory.length}
          awardsCount={awards.length}
          onEditProfile={handleEditProfile}
        />
        <div className="mt-12 space-y-12">
          <AboutSection
            profile={profile}
            onEdit={() => setIsAboutDialogOpen(true)}
          />
          <AcademicHistorySection
            academicHistory={academicHistory}
            onAdd={() => {
              setEditingAcademic(null);
              setIsAcademicDialogOpen(true);
            }}
            onEdit={handleEditAcademic}
            onDelete={handleDeleteAcademic}
          />
          <AwardsSection
            awards={awards}
            onAdd={() => {
              setEditingAward(null);
              setIsAwardDialogOpen(true);
            }}
            onEdit={handleEditAward}
            onDelete={handleDeleteAward}
          />
        </div>
      </div>

      <EditAboutDialog
        isOpen={isAboutDialogOpen}
        setIsOpen={setIsAboutDialogOpen}
        aboutText={aboutText}
        setAboutText={setAboutText}
        currentImageUrl={profile.image_url}
        onSave={handleSaveAbout}
        userId={user.id}
      />

      <EditAcademicDialog
        isOpen={isAcademicDialogOpen}
        setIsOpen={setIsAcademicDialogOpen}
        academic={editingAcademic}
        onSave={(newAcademic) => {
          if (editingAcademic) {
            setAcademicHistory(
              academicHistory.map((item) =>
                item.id === editingAcademic.id ? newAcademic : item
              )
            );
          } else {
            setAcademicHistory([...academicHistory, newAcademic]);
          }
          setIsAcademicDialogOpen(false);
        }}
        userId={user.id}
      />

      <EditAwardDialog
        isOpen={isAwardDialogOpen}
        setIsOpen={setIsAwardDialogOpen}
        award={editingAward}
        onSave={(newAward) => {
          if (editingAward) {
            setAwards(
              awards.map((item) =>
                item.id === editingAward.id ? newAward : item
              )
            );
          } else {
            setAwards([...awards, newAward]);
          }
          setIsAwardDialogOpen(false);
        }}
        userId={user.id}
      />

      <EditProfileDialog
        isOpen={isProfileDialogOpen}
        setIsOpen={setIsProfileDialogOpen}
        profile={profile}
        onSave={handleSaveProfile}
      />
    </div>
  );
}
