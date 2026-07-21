import styles from "./ManagerUsers.module.css";

import { useState, useEffect } from "react";
import { useUsers } from "../../hooks/useUsers";

import Loading from "../../components/Loading";
import UserGrid from "../../components/UserGrid";
import UserRoleModal from "../../components/UserRoleModal";
import HeaderDashboard from "../../components/HeaderDashboard";
import SearchBar from "../../components/ui/SearchBar";

const USER_SEARCH_FIELDS = [
  "name",
  "email",
  "role"
];

function ManagerUsers() {

  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const {
    users,
    loading,
    carregarUsers
  } = useUsers();
  const [usuarios, setUsuarios] = useState([]);
  const [buscaAtiva, setBuscaAtiva] = useState(false);

  /*
    Atualiza a lista inicial
    quando os usuários chegam do Supabase
  */
  useEffect(() => {
    setUsuarios(users);
  }, [users]);

  if (loading) {
    return (
      <Loading
        text="Carregando usuários..."
      />
    );
  }

  return (

    <section
      className={styles.manager_users}
    >
      <HeaderDashboard
        title="Gerenciamento de Usuários"
      >
        <SearchBar
          items={users}
          onSearch={setUsuarios}
          setBuscaAtiva={setBuscaAtiva}
          fields={USER_SEARCH_FIELDS}
          placeholder="Nome, email ou permissão (common, secretary, teacher, coordinator)"
        />
      </HeaderDashboard>

      <div
        className={styles.container_content}
      >
        <div
          className={styles.content}
        >
          {
            buscaAtiva && usuarios.length === 0 ? (
              <div
                className={styles.empty}
              >
                Nenhum usuário encontrado.
              </div>
            ) : (
              <UserGrid
                users={usuarios}
                onEdit={(usuario) =>
                  setUsuarioSelecionado(usuario)
                }
              />
            )
          }
        </div>

        {
          usuarioSelecionado && (
            <UserRoleModal
              usuario={usuarioSelecionado}
              onClose={() =>
                setUsuarioSelecionado(null)
              }
              onSuccess={async () => {
                await carregarUsers();
                setUsuarioSelecionado(null);
              }}
            />
          )
        }

      </div>
    </section>
  );
}

export default ManagerUsers;
