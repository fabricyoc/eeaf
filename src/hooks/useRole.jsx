import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

const hierarchy = {
  common: 0,
  teacher: 1,
  coordinator: 2,
  admin: 3,
};

export function useRole() {
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function carregarRole() {
      try {
        setLoading(true);
        setError(null);

        const {
          data: { user },
          error: authError,
        } = await supabase.auth.getUser();

        if (authError) throw authError;

        if (!user) {
          setRole(null);
          return;
        }

        const { data, error } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setRole(data.role);
      } catch (err) {
        console.error("Erro ao carregar role:", err);

        setError(err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }

    carregarRole();
  }, []);

  /**
   * Verifica se a role atual possui
   * a permissão mínima exigida
   */
  function hasRole(requiredRole) {
    if (!role) return false;

    return (
      hierarchy[role] >= hierarchy[requiredRole]
    );
  }

  return {
    role,
    loading,
    error,

    hasRole,

    isAdmin: role === "admin",
    isCoordinator: role === "coordinator",
    isTeacher: role === "teacher",

    // Permissões
    canAccessTeacher: hasRole("teacher"),
    canAccessCoordinator: hasRole("coordinator"),
    canAccessAdmin: hasRole("admin"),

    canEditStudents: hasRole("teacher"),
    canManageTeachers: hasRole("coordinator"),
    canManageSystem: hasRole("admin"),
  };
}