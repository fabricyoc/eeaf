import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { toast } from "react-toastify";

import ProfileModal from "../ui/ProfileModal";
import styles from "../ui/ProfileModal/ProfileModal.module.css";

import { useRole } from "../../hooks/useRole";
import { updateUser } from "../../services/userService";

const initialForm = {
  name: "",
  email: "",
  role: "",
};

function UserRoleModal({
  usuario,
  onClose,
  onSuccess,
}) {

  const { role } = useRole();

  const [form, setForm] = useState(initialForm);

  useEffect(() => {

    if (usuario) {

      setForm({
        name: usuario.name ?? "",
        email: usuario.email ?? "",
        role: usuario.role ?? "common",
      });

    }

  }, [usuario]);



  function handleChange(name, value) {

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  }



  const permissoes = {
    admin: [
      "common",
      "teacher",
      "coordinator",
      "admin",
    ],

    coordinator: [
      "common",
      "teacher",
      "coordinator",
    ],
  };



  const roleLabel = {
    common: "Comum",
    teacher: "Professor",
    coordinator: "Coordenador",
    admin: "Administrador",
  };



  const opcoes =
    permissoes[role] ?? [];



  async function salvar() {

    try {

      await updateUser(
        usuario.id,
        form
      );

      toast.success(
        "Usuário atualizado com sucesso!"
      );

      await onSuccess?.();

      onClose();

    } catch (error) {

      console.error(error);

      toast.error(
        "Erro ao atualizar usuário."
      );

    }

  }



  const campos = [
    {
      name: "name",
      label: "Nome",
    },
    {
      name: "email",
      label: "E-mail",
      type: "email",
    },
  ];



  return (

    <ProfileModal

      title={form.name}

      subtitle="Editar usuário"

      icon={<FaUser />}

      form={form}

      fields={campos}

      readOnly={false}

      onChange={handleChange}

      onSave={salvar}

      onClose={onClose}

    >

      <div className={styles.field}>

        <label>
          Permissão
        </label>

        <select

          name="role"

          value={form.role}

          onChange={(e) =>
            handleChange(
              "role",
              e.target.value
            )
          }

        >

          {
            opcoes.map((item) => (

              <option
                key={item}
                value={item}
              >
                {roleLabel[item]}
              </option>

            ))
          }

        </select>

      </div>

    </ProfileModal>

  );

}

export default UserRoleModal;