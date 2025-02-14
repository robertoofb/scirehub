import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { supabase } from "../../../lib/supabase";

interface EditAboutDialogProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  aboutText: string;
  setAboutText: (text: string) => void;
  currentImageUrl: string | null;
  onSave: (updatedProfile: { bio: string; image_url: string | null }) => void;
  userId: string;
}

export function EditAboutDialog({
  isOpen,
  setIsOpen,
  aboutText,
  setAboutText,
  currentImageUrl,
  onSave,
  userId,
}: EditAboutDialogProps) {
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(currentImageUrl || "/placeholder.svg");

  const handleImageUpload = async () => {
    if (!newImage) return currentImageUrl;

    const filePath = `profile/${userId}/about/${Date.now()}_${newImage.name}`;
    const { data, error } = await supabase.storage.from("profile").upload(filePath, newImage);

    if (error) {
      console.error("Error al cargar imagen:", error.message);
      return currentImageUrl;
    }

    return supabase.storage.from("profile").getPublicUrl(data.path).data.publicUrl;
  };

  const handleSave = async () => {
    const uploadedImageUrl = await handleImageUpload();
    onSave({ bio: aboutText, image_url: uploadedImageUrl });
    setIsOpen(false);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    if (file) {
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file)); // Mostrar la vista previa
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#0a161a] text-white">
        <DialogHeader>
          <DialogTitle>Editar Acerca de mí</DialogTitle>
        </DialogHeader>
        <Textarea
          placeholder="Escribe sobre ti..."
          className="bg-[#0d1b21] border-gray-700 text-white"
          value={aboutText}
          onChange={(e) => setAboutText(e.target.value)}
        />
        <div className="mt-4">
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="bg-[#0d1b21] border-gray-700 text-white"
          />
          <div className="mt-2">
            <img
              src={previewImage || "/placeholder.svg"}
              alt="Vista previa"
              className="w-32 h-32 object-cover rounded-md border border-gray-600"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
