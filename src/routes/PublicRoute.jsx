import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../utils/supabase";

function PublicRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function verificarUsuario() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      setUser(user);
      setLoading(false);
    }

    verificarUsuario();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  return user ? (
    <Navigate to="/dashboard" replace />
  ) : (
    children
  );
}

export default PublicRoute;
