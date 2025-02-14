import Image from "next/image";
import { Profile, User } from "../../types/profile";
import { ProfileInfo } from "./ProfileInfo";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface ProfileHeaderProps {
  profile: Profile;
  user: User;
  academicHistoryCount: number;
  awardsCount: number;
  onEditProfile: () => void;
}

export function ProfileHeader({
  profile,
  user,
  academicHistoryCount,
  awardsCount,
  onEditProfile,
}: ProfileHeaderProps) {
  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold text-twhite">
          {profile.full_name || user.email || "Mi Perfil"}
        </h1>
        <Button
          variant="outline"
          size="sm"
          onClick={onEditProfile}
          className="text-blue-400 border-blue-400 hover:bg-blue-400 hover:text-white transition-colors"
        >
          <Edit className="h-4 w-4 mr-2" />
          Editar Perfil
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="relative w-48 h-48">
          <Image
            src={profile.avatar_url || "/placeholder.svg"}
            alt="Foto de perfil"
            layout="fill"
            objectFit="cover"
            className="rounded-full"
          />
          <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-4 border-gray-800" />
        </div>
        <ProfileInfo
          profile={profile}
          academicHistoryCount={academicHistoryCount}
          awardsCount={awardsCount}
        />
      </div>
    </div>
  );
}
