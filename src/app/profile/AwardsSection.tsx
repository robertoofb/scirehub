import { Award } from "../../types/profile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import Image from "next/image";

interface AwardsSectionProps {
  awards: Award[];
  onAdd: () => void;
  onEdit: (award: Award) => void;
  onDelete: (id: string) => void;
}

export function AwardsSection({ awards, onAdd, onEdit, onDelete }: AwardsSectionProps) {
  return (
    <Card className="bg-[#1C323D] border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-semibold text-white">Distinciones</CardTitle>
        <Button variant="ghost" size="sm" onClick={onAdd} className="text-blue-400 hover:bg-blue-400/10">
          <PlusCircle className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </CardHeader>
      <CardContent>
        {awards.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {awards.map((award) => (
              <Card key={award.id} className="bg-gray-700 border-none overflow-hidden">
                <CardContent className="p-0">
                  {award.image_url && (
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
                      <Image
                        src={award.image_url}
                        alt={award.name}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-t-lg"
                      />
                    </div>
                  )}
                  <div className="p-4 relative">
                    <h4 className="text-lg font-bold text-blue-400 mb-2">{award.name}</h4>
                    <p className="text-gray-300 mb-1">{award.institution}</p>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">{award.date}</Badge>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(award)} className="text-blue-400 hover:bg-blue-400/10">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => onDelete(award.id)} className="text-red-400 hover:bg-red-400/10">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
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
  );
}

