import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

function RoleRoute({ children, roles }) {
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);

  useEffect(() => {
    async function carregarRole() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      const { data } = await supabase
        .from("users")
        .select("role")
        .eq("id", user.id)
        .single();

      setRole(data?.role);
      setLoading(false);
    }

    carregarRole();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return roles.includes(role)
    ? children
    : <Navigate to="/" replace />;
}

export default RoleRoute;
