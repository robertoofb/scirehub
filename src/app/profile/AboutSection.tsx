import { Profile } from "../../types/profile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import Image from "next/image";

interface AboutSectionProps {
  profile: Profile;
  onEdit: () => void;
}

export function AboutSection({ profile, onEdit }: AboutSectionProps) {
  return (
    <Card className="bg-[#1C323D] border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-semibold text-white">Acerca de mí</CardTitle>
        <Button variant="ghost" size="sm" onClick={onEdit} className="text-blue-400 hover:bg-blue-400/10">
          <Pencil className="h-4 w-4 mr-2" />
          Editar
        </Button>
      </CardHeader>
      <CardContent className="flex flex-col md:flex-row items-start gap-6">
        <div className="flex-1">
          <p className="text-gray-300 text-sm leading-relaxed">
            {profile.bio || "Sin descripción disponible."}
          </p>
        </div>
        {profile.image_url && (
          <div className="w-full md:w-1/3 aspect-video relative">
            <Image
              src={profile.image_url}
              alt="Imagen representativa"
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}

