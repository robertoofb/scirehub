'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { supabase } from "../../../lib/supabase"
import { ImagePlus, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

interface OnboardingFormProps {
  isOpen: boolean
  onComplete: () => void
}

export function OnboardingForm({ isOpen, onComplete }: OnboardingFormProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [profileImage, setProfileImage] = useState<string>("/placeholder.svg")
  const [skills, setSkills] = useState<string[]>([])
  const [currentSkill, setCurrentSkill] = useState("")

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Previsualizar la imagen localmente
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string); // Actualizar previsualización inmediata
      };
      reader.readAsDataURL(file);

      // Subir la imagen al bucket "avatars"
      const fileName = `${Date.now()}-${file.name}`;
      try {
        const { data, error } = await supabase.storage
          .from("avatars") // Asegúrate de usar el nombre correcto del bucket
          .upload(fileName, file);

        if (error) {
          console.error("Error al subir la imagen:", error.message);
          alert("Error al subir la imagen. Inténtalo nuevamente.");
          return;
        }

        // Obtener URL pública de la imagen
        const { data: publicUrlData } = supabase.storage
          .from("avatars")
          .getPublicUrl(fileName);

        setProfileImage(publicUrlData?.publicUrl || "/placeholder.svg"); // Actualizar con la URL del servidor
      } catch (error) {
        console.error("Error inesperado al subir la imagen:", error);
        alert("Ocurrió un error inesperado al subir la imagen.");
      }
    }
  };

  const handleAddSkill = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && currentSkill.trim()) {
      e.preventDefault()
      setSkills([...skills, currentSkill.trim()])
      setCurrentSkill("")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Obtener el usuario autenticado
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        console.error("Error al obtener el usuario autenticado:", authError);
        alert("No se encontró un usuario autenticado.");
        setIsLoading(false);
        return;
      }

      // Insertar o actualizar el perfil en la tabla `profiles`
      const { error: profileError } = await supabase
        .from("profiles")
        .upsert({
          id: user.id, // El ID del usuario autenticado como clave primaria
          full_name: (document.getElementById("name") as HTMLInputElement)?.value,
          title: (document.getElementById("title") as HTMLInputElement)?.value,
          bio: (document.getElementById("bio") as HTMLTextAreaElement)?.value,
          avatar_url: profileImage, // URL de la imagen subida al bucket
          skills: skills, // Lista de habilidades ingresadas
          social_links: {
            instagram: (document.getElementById("instagram") as HTMLInputElement)?.value,
            facebook: (document.getElementById("facebook") as HTMLInputElement)?.value,
            tiktok: (document.getElementById("tiktok") as HTMLInputElement)?.value,
            linkedin: (document.getElementById("linkedin") as HTMLInputElement)?.value,
          },
        });

      if (profileError) {
        console.error("Error al guardar el perfil:", profileError.message);
        alert("Error al guardar el perfil: " + profileError.message);
      } else {
        alert("Perfil completado con éxito.");
        onComplete(); // Cierra el formulario
        router.push("/profile"); // Redirige al perfil
      }
    } catch (error) {
      console.error("Error inesperado al guardar el perfil:", error);
      alert("Ocurrió un error inesperado.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={() => {}}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Complete tu perfil</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="relative w-32 h-32">
              <Image
                src={profileImage}
                alt="Profile picture"
                className="rounded-full object-cover"
                fill
              />
              <Label
                htmlFor="picture"
                className="absolute bottom-0 right-0 p-2 bg-primary rounded-full cursor-pointer hover:bg-primary/90"
              >
                <ImagePlus className="w-4 h-4 text-white" />
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </Label>
            </div>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" placeholder="Tu nombre" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Título profesional</Label>
              <Input id="title" placeholder="Ej: Investigador, Diseñador, etc." required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="skills">Habilidades</Label>
              <Input
                id="skills"
                placeholder="Presiona Enter para agregar"
                value={currentSkill}
                onChange={(e) => setCurrentSkill(e.target.value)}
                onKeyDown={handleAddSkill}
              />
              <div className="flex flex-wrap gap-2 mt-2">
                {skills.map((skill, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer"
                    onClick={() => setSkills(skills.filter((_, i) => i !== index))}
                  >
                    {skill} ×
                  </Badge>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Acerca de mí</Label>
              <Textarea
                id="bio"
                placeholder="Cuéntanos sobre ti..."
                className="min-h-[100px]"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Redes sociales</Label>
              <div className="grid grid-cols-2 gap-4">
                <Input id="instagram" placeholder="Instagram" />
                <Input id="facebook" placeholder="Facebook" />
                <Input id="tiktok" placeholder="TikTok" />
                <Input id="linkedin" placeholder="LinkedIn" />
              </div>
            </div>
          </div>

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Guardando...
              </>
            ) : (
              'Completar perfil'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
