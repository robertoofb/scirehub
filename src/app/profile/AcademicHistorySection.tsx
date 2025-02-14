import { AcademicHistory } from "../../types/profile";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlusCircle, Pencil, Trash2 } from 'lucide-react';
import Image from "next/image";

interface AcademicHistorySectionProps {
  academicHistory: AcademicHistory[];
  onAdd: () => void;
  onEdit: (academic: AcademicHistory) => void;
  onDelete: (id: string) => void;
}

export function AcademicHistorySection({
  academicHistory,
  onAdd,
  onEdit,
  onDelete,
}: AcademicHistorySectionProps) {
  return (
    <Card className="bg-[#1C323D] border-none shadow-lg">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-2xl font-semibold text-white">Historial Académico</CardTitle>
        <Button variant="ghost" size="sm" onClick={onAdd} className="text-blue-400 hover:bg-blue-400/10">
          <PlusCircle className="h-4 w-4 mr-2" />
          Agregar
        </Button>
      </CardHeader>
      <CardContent>
        {academicHistory.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2">
            {academicHistory.map((item) => (
              <Card key={item.id} className="bg-gray-700 border-none overflow-hidden">
                <CardContent className="p-0">
                  {item.image_url && (
                    <div className="relative w-full" style={{ paddingTop: '56.25%' }}> {/* 16:9 aspect ratio */}
                      <Image
                        src={item.image_url}
                        alt={item.degree}
                        layout="fill"
                        objectFit="contain"
                        className="rounded-t-lg"
                      />
                    </div>
                  )}
                  <div className="p-4 relative">
                    <h4 className="text-lg font-bold text-blue-400 mb-2">{item.degree}</h4>
                    <p className="text-gray-300 mb-1">{item.institution}</p>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-300">
                      {item.year}
                    </Badge>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => onEdit(item)} className="text-blue-400 hover:bg-blue-400/10">
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(item.id)}
                        className="text-red-400 hover:bg-red-400/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No se ha agregado información académica.</p>
        )}
      </CardContent>
    </Card>
  );
}

