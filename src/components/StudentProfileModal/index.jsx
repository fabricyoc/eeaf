import { useEffect, useMemo, useState } from "react";
import { FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";

import ProfileModal from "../ui/ProfileModal";
import styles from "../ui/ProfileModal/ProfileModal.module.css";

import { useTurmas } from "../../hooks/useTurmas";
import { useRole } from "../../hooks/useRole";

import { updateAluno } from "../../services/studentService";

const initialForm = {
  matricula: "",
  nome: "",
  email: "",
  foto_id: "",
  turma_id: "",
  posicao: "",
};

function preencherFormulario(aluno) {
  return {
    matricula: aluno.matricula ?? "",
    nome: aluno.nome ?? "",
    email: aluno.email ?? "",
    foto_id: aluno.foto_id ?? "",
    turma_id: aluno.turma_id ?? "",
    posicao: aluno.posicao ?? "",
  };
}

function StudentProfileModal({
  aluno,
  onClose,
  onSuccess,
}) {

  const { turmas } = useTurmas();

  const { canEditStudents } = useRole();

  const [form, setForm] = useState(initialForm);

  useEffect(() => {

    if (aluno) {
      setForm(preencherFormulario(aluno));
    }

  }, [aluno]);

  function handleChange(name, value) {

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  }

  async function salvar() {

    try {

      await updateAluno(
        aluno.id,
        form
      );

      await onSuccess?.();

      toast.success(
        "Aluno atualizado com sucesso!"
      );

      onClose();

    } catch (err) {

      console.error(err);

      toast.error(
        "Erro ao atualizar aluno."
      );

    }

  }

  const foto = useMemo(() => {

    return form.foto_id
      ? `https://drive.google.com/thumbnail?id=${form.foto_id}&sz=w1000`
      : "https://placehold.co/250x250?text=Sem+Foto";

  }, [form.foto_id]);

  const campos = [
    {
      name: "matricula",
      label: "Matrícula",
    },
    {
      name: "nome",
      label: "Nome",
    },
    {
      name: "email",
      label: "Email",
      type: "email",
    },
    {
      name: "foto_id",
      label: "Foto ID",
    },
    {
      name: "posicao",
      label: "Posição",
      type: "number",
    },
  ];

  return (

    <ProfileModal

      title={form.nome}

      subtitle={
        canEditStudents
          ? "Modo edição"
          : "Somente leitura"
      }

      image={foto}

      icon={<FaUserGraduate />}

      form={form}

      fields={campos}

      readOnly={!canEditStudents}

      onChange={handleChange}

      onSave={salvar}

      onClose={onClose}

    >

      <div className={styles.field}>

        <label>
          Turma
        </label>

        <select

          name="turma_id"

          value={form.turma_id}

          onChange={(e) =>
            handleChange(
              "turma_id",
              e.target.value
            )
          }

          disabled={!canEditStudents}

        >

          {
            turmas.map((turma) => (

              <option
                key={turma.id}
                value={turma.id}
              >
                {turma.nome.toUpperCase()}
              </option>

            ))
          }

        </select>

      </div>

    </ProfileModal>

  );

}

export default StudentProfileModal;
