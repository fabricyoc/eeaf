import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../utils/supabase";
import styles from "./Dashboard.module.css";
import Loading from "../../components/Loading";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    carregarUsuario();
  }, []);

  async function carregarUsuario() {
    // Usuário autenticado
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      navigate("/login");
      return;
    }

    // Busca na tabela public.users
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", user.id)
      .single();

    if (error) {
      console.error(error);
      return;
    }

    setUserData(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <div className={styles.container}>
      <h1>Dashboard</h1>

      {userData ? (
        <>
          <h2>Bem-vindo, {userData.name}!</h2>

          <p>
            <strong>Perfil:</strong> {userData.role}
          </p>

          <button
            className={styles.btn_logout}
            onClick={handleLogout}
          >
            Sair
          </button>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default Dashboard;