import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { supabase } from "../utils/supabase";

function TeacherRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [permitido, setPermitido] = useState(false);

  useEffect(() => {
    verificarPermissao();
  }, []);

  async function verificarPermissao() {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setPermitido(false);
      setLoading(false);
      return;
    }

    const { data } = await supabase
      .from("users")
      .select("role")
      .eq("id", user.id)
      .single();

    setPermitido(data?.role === "teacher");
    setLoading(false);
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (!permitido) {
    return <Navigate to="/" replace />;
  }

  return children;
}

export default TeacherRoute;