import { Instagram, Facebook, Phone, Mail, Search, MessageCircle, Plus } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Profile } from "../../types/profile";
import Link from 'next/link';

interface ProfileInfoProps {
  profile: Profile;
  academicHistoryCount: number;
  awardsCount: number;
}

export function ProfileInfo({ profile, academicHistoryCount, awardsCount }: ProfileInfoProps) {
  return (
    <div className="flex-1 space-y-6">
      <div>
        <h2 className="text-3xl font-semibold text-twhite mb-3">
          {profile?.title || "Título no definido"}
        </h2>
        <div className="flex flex-wrap gap-2 text-sm">
          {profile?.skills ? (
            profile.skills.split(",").map((skill: string, index: number) => (
              <span key={index} className="bg-gray-700 px-3 py-1 rounded-full text-blue-300">
                {skill.trim()}
              </span>
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
              <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-5.394 10.692 6.33 6.33 0 0 0 10.857-4.424V8.687a8.182 8.182 0 0 0 4.773 1.526V6.79a4.831 4.831 0 0 1-1.003-.104z" />
            </svg>
          </a>
        )}
      </div>

      <div className="flex items-center gap-6 text-sm">
        <div className="flex items-center gap-1">
          <span className="font-semibold text-blue-400">{academicHistoryCount}</span>
          <span className="text-gray-300">Logros académicos</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="font-semibold text-blue-400">{awardsCount}</span>
          <span className="text-gray-300">Distinciones</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        <Link href="/dashboard">
          <Button variant="default" className="bg-blue-500 hover:bg-blue-600 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Agregar
          </Button>
        </Link>
        {/* <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
          <MessageCircle className="w-4 h-4 mr-2" />
          Mensaje
        </Button>
        <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white transition-colors">
          <Search className="w-4 h-4 mr-2" />
          Buscar
        </Button> */}
      </div>
    </div>
  );
}
