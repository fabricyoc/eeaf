import { useState } from "react";
import { toast } from "react-toastify";
import { updateUserRole } from "../../services/userService";
import { useRole } from "../../hooks/useRole";

import styles from "./UserRoleModal.module.css";


function UserRoleModal({
  usuario,
  onClose,
  onSuccess
}) {

  const { role } = useRole();

  const [novaRole, setNovaRole] = useState(
    usuario.role
  );

  const permissoes = {
    admin: [
      "common",
      "teacher",
      "coordinator",
      "admin"
    ],
    coordinator: [
      "common",
      "teacher",
      "coordinator"
    ]
  };
  const roleLabel = {
    common: "Comum",
    teacher: "Professor",
    coordinator: "Coordenador",
    admin: "Administrador",
  };

  const opcoes =
    permissoes[role] || [];

  async function salvar() {
    try {
      await updateUserRole(
        usuario.id,
        novaRole
      );

      toast.success(
        "Permissão atualizada."
      );

      onSuccess();
      onClose();
    } catch (error) {
      console.error(error);
      toast.error(
        "Erro ao atualizar."
      );
    }
  }




  return (

    <div
      className={styles.overlay}
    >


      <div
        className={styles.modal}
      >


        <h2>

          Alterar permissão

        </h2>


        <p>

          {usuario.name}

        </p>



        <select

          value={novaRole}

          onChange={
            e => setNovaRole(
              e.target.value
            )
          }

        >


          {
            opcoes.map(item => (
              <option
                key={item}
                value={item}
              >
                {roleLabel[item]}
              </option>
            ))

          }


        </select>

        <div
          className={styles.actions}
        >
          <button
            onClick={salvar}
          >
            Salvar
          </button>

          <button
            onClick={onClose}
          >
            Cancelar
          </button>

        </div>

      </div>
    </div>
  );
}
export default UserRoleModal;
