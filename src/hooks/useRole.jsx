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


        const {
          data: {
            user
          },
          error
        } = await supabase.auth.getUser();



        if (error)
          throw error;



        if (!user) {

          setRole(null);

          return;

        }

        const {
          data,
          error: userError

        } = await supabase
          .from("users")
          .select("role")
          .eq(
            "id",
            user.id
          )
          .single();
        if (userError)
          throw userError;
        setRole(
          data.role
        );
      } catch (err) {
        console.error(
          "Erro role:",
          err
        );
        setError(err);
        setRole(null);
      } finally {
        setLoading(false);
      }
    }
    carregarRole();
  }, []);

  function hasRole(requiredRole) {

    if (!role) return false;

    return (
      hierarchy[role] >=
      hierarchy[requiredRole]
    );
  }

  /*
    Regra para alteração de permissões
  */
  function canChangeRole(targetRole) {

    // ADMIN pode tudo
    if (role === "admin") return true;

    // COORDENADOR NÃO PROMOVE PARA ADMIN
    if (role === "coordinator") {
      return (
        targetRole === "common" ||
        targetRole === "teacher" ||
        targetRole === "coordinator"
      );
    }
    return false;
  }

  return {
    role,
    loading,
    error,
    hasRole,
    canChangeRole,

    isAdmin: role === "admin",
    isCoordinator: role === "coordinator",
    isTeacher: role === "teacher",
    canEditStudents: hasRole("teacher"),
    canAccessTeacher: hasRole("teacher"),
    canAccessCoordinator: hasRole("coordinator"),
    canAccessAdmin: hasRole("admin"),
  };
}