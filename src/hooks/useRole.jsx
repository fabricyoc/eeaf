import { useEffect, useState } from "react";

import { supabase } from "../utils/supabase";

export function useRole() {

  const [role, setRole] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState(null);

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

        const {
          data,
          error,
        } = await supabase
          .from("users")
          .select("role")
          .eq("id", user.id)
          .single();

        if (error) throw error;

        setRole(data.role);

      } catch (err) {

        console.error(
          "Erro ao carregar role:",
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

  return {

    role,

    loading,

    error,

    isAdmin:
      role === "admin",

    isCoordinator:
      role === "coordinator",

    isTeacher:
      role === "teacher",

    canEditStudents:
      role === "admin" ||
      role === "coordinator"||
      role === "teacher",

  };

}