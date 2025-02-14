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
import { supabase } from "../../../lib/supabase";

export function EditAcademicDialog({ isOpen, setIsOpen, academic, onSave, userId }) {
  const [academicData, setAcademicData] = useState({ degree: "", institution: "", year: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (academic) {
      setAcademicData(academic);
      setImage(academic.image_url);
    } else {
      setAcademicData({ degree: "", institution: "", year: "" });
      setImage(null);
    }
  }, [academic]);

  const handleSave = async () => {
    try {
      let imageUrl = image;

      if (image && image instanceof File) {
        const { data, error } = await supabase.storage
          .from("profile") // Usamos el bucket 'profile'
          .upload(`${userId}/academic/${Date.now()}_${image.name}`, image);

        if (error) throw error;

        imageUrl = supabase.storage
          .from("profile")
          .getPublicUrl(data.path).data.publicUrl;
      }

      const newAcademic = { ...academicData, image_url: imageUrl, user_id: userId };

      if (academic) {
        // Actualizar
        const { error } = await supabase
          .from("academic_history")
          .update(newAcademic)
          .eq("id", academic.id);

        if (error) throw error;
      } else {
        // Insertar
        const { data, error } = await supabase
          .from("academic_history")
          .insert(newAcademic)
          .select();

        if (error) throw error;
        newAcademic.id = data[0].id;
      }

      onSave(newAcademic);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al guardar logro académico:", error.message);
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="bg-[#0a161a] text-white">
        <DialogHeader>
          <DialogTitle>{academic ? "Editar" : "Agregar"} Logro Académico</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Título"
          className="bg-[#0d1b21] border-gray-700 text-white"
          value={academicData.degree}
          onChange={(e) => setAcademicData({ ...academicData, degree: e.target.value })}
        />
        <Input
          placeholder="Institución"
          className="bg-[#0d1b21] border-gray-700 text-white"
          value={academicData.institution}
          onChange={(e) => setAcademicData({ ...academicData, institution: e.target.value })}
        />
        <Input
          placeholder="Año"
          type="number"
          className="bg-[#0d1b21] border-gray-700 text-white"
          value={academicData.year}
          onChange={(e) => setAcademicData({ ...academicData, year: e.target.value })}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-[#0d1b21] border-gray-700 text-white"
        />
        {image && (typeof image === "string" ? (
          <img src={image} alt="Academic achievement" className="mt-2 max-w-full h-auto" />
        ) : (
          <p className="mt-2">Imagen seleccionada: {image.name}</p>
        ))}
        <DialogFooter>
          <Button type="submit" onClick={handleSave}>
            Guardar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
