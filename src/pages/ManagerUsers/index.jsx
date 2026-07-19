import styles from "./ManagerUsers.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { useUsers } from "../../hooks/useUsers";

import Loading from "../../components/Loading";
import UserGrid from "../../components/UserGrid";
import UserRoleModal from "../../components/UserRoleModal";
import HeaderDashboard from "../../components/HeaderDashboard";

function ManagerUsers() {

  const navigate = useNavigate();

  const [
    usuarioSelecionado,
    setUsuarioSelecionado
  ] = useState(null);

  const {
    users,
    loading,
    carregarUsers
  } = useUsers();

  if (loading) {
    return <Loading text="Carregando usuários..." />;
  }

  return (
    <section className={styles.manager_users}>
      <HeaderDashboard
        title="Gerenciamento de Usuários"
      >
      </HeaderDashboard>


      <div
        className={styles.container_content}
      >
        {/* CONTEÚDO */}
        <div
          className={styles.content}
        >
          <UserGrid
            users={users}
            onEdit={(usuario) =>
              setUsuarioSelecionado(usuario)
            }
          />
        </div>

        {
          usuarioSelecionado && (
            <UserRoleModal
              usuario={usuarioSelecionado}
              onClose={() =>
                setUsuarioSelecionado(null)
              }
              onSuccess={() => {
                carregarUsers();
                setUsuarioSelecionado(null);
              }
              }
            />
          )
        }

      </div>
    </section>

  );

}

export default ManagerUsers;
