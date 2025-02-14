"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, UserPlus, Users } from "lucide-react";

const SuperAdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/users");
        const { users, error } = await response.json();

        if (error) {
          setError(error);
          setLoading(false);
          return;
        }

        const investigatorsResponse = await fetch("/api/investigadores");
        const { investigators } = await investigatorsResponse.json();

        const investigatorIds = new Set(investigators.map((i) => i.id_cuenta));

        const updatedUsers = users.map((user) => ({
          id: user.id,
          email: user.email,
          isInvestigator: investigatorIds.has(user.id),
        }));
        setUsers(updatedUsers);
      } catch (err) {
        console.error("Error al cargar usuarios:", err);
        setError("Error al cargar usuarios");
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const toggleInvestigator = async (userId: string, isInvestigator: boolean) => {
    setLoading(true);
    setError(null);

    try {
      if (isInvestigator) {
        const response = await fetch("/api/investigadores", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error("Error al eliminar investigador");
      } else {
        const response = await fetch("/api/investigadores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId }),
        });

        if (!response.ok) throw new Error("Error al agregar investigador");
      }

      setUsers((prevUsers) =>
        prevUsers.map((user) =>
          user.id === userId ? { ...user, isInvestigator: !isInvestigator } : user
        )
      );
    } catch (err) {
      console.error(err);
      setError(err.message || "Error al actualizar el rol del usuario");
    } finally {
      setLoading(false);
    }
  };

  const filteredUsers = users.filter((user) =>
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen  text-white p-8">
      <Card className="max-w-6xl mx-auto bg-gray-800 border-none shadow-lg">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-white">Administrar Usuarios</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="bg-red-500/20 border border-red-500 text-red-500 px-4 py-2 rounded-md mb-4">
              {error}
            </div>
          )}
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center space-x-2">
              <Search className="text-gray-400" />
              <Input
                type="text"
                placeholder="Buscar por email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-gray-700 border-gray-600 text-white placeholder-gray-400"
              />
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-blue-400 text-blue-400 hover:bg-blue-400 hover:text-white">
                <UserPlus className="mr-2 h-4 w-4" />
                Agregar Usuario
              </Button>
              <div className="flex items-center space-x-2 text-gray-300">
                <Users className="h-5 w-5" />
                <span>Total: {users.length}</span>
              </div>
            </div>
          </div>
          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
              <p className="mt-4 text-blue-400">Cargando usuarios...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-blue-400">Email</TableHead>
                  <TableHead className="text-blue-400 text-center">Investigador</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.map((user) => (
                  <TableRow key={user.id} className="border-t border-gray-700">
                    <TableCell className="font-medium text-white">{user.email}</TableCell>
                    <TableCell className="text-center">
                      <Switch
                        checked={user.isInvestigator}
                        onCheckedChange={() => toggleInvestigator(user.id, user.isInvestigator)}
                        disabled={loading}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SuperAdminDashboard;
