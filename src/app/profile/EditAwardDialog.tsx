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

export function EditAwardDialog({ isOpen, setIsOpen, award, onSave, userId }) {
  const [awardData, setAwardData] = useState({ name: "", institution: "", date: "" });
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (award) {
      setAwardData(award);
      setImage(award.image_url);
    } else {
      setAwardData({ name: "", institution: "", date: "" });
      setImage(null);
    }
  }, [award]);

  const handleSave = async () => {
    try {
      let imageUrl = image;

      if (image && image instanceof File) {
        const { data, error } = await supabase.storage
          .from("profile")
          .upload(`awards/${userId}/${Date.now()}_${image.name}`, image);

        if (error) throw error;

        imageUrl = supabase.storage
          .from("profile")
          .getPublicUrl(data.path).data.publicUrl;
      }

      const newAward = { ...awardData, image_url: imageUrl, user_id: userId };

      if (award) {
        const { error } = await supabase
          .from("awards")
          .update(newAward)
          .eq("id", award.id);

        if (error) throw error;
      } else {
        const { data, error } = await supabase
          .from("awards")
          .insert(newAward)
          .select();

        if (error) throw error;
        newAward.id = data[0].id;
      }

      onSave(newAward);
      setIsOpen(false);
    } catch (error) {
      console.error("Error al guardar distinción:", error.message);
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
          <DialogTitle>{award ? "Editar" : "Agregar"} Distinción</DialogTitle>
        </DialogHeader>
        <Input
          placeholder="Nombre de la distinción"
          className="bg-[#0d1b21] border-gray-700 text-white"
          value={awardData.name}
          onChange={(e) => setAwardData({ ...awardData, name: e.target.value })}
        />
        <Input
          placeholder="Institución"
          className="bg-[#0d1b21] border-gray-700 text-white"
          value={awardData.institution}
          onChange={(e) => setAwardData({ ...awardData, institution: e.target.value })}
        />
        <Input
          placeholder="Fecha"
          type="date"
          className="bg-[#0d1b21] border-gray-700 text-white"
          value={awardData.date}
          onChange={(e) => setAwardData({ ...awardData, date: e.target.value })}
        />
        <Input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="bg-[#0d1b21] border-gray-700 text-white"
        />
        {image && (typeof image === "string" ? (
          <img src={image} alt="Award" className="mt-2 max-w-full h-auto" />
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
