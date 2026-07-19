import { useEffect, useMemo, useState } from "react";
import { FaTimes, FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";

import { useTurmas } from "../../hooks/useTurmas";
import { useRole } from "../../hooks/useRole";
import { updateAluno } from "../../services/studentService";

import styles from "./StudentProfileModal.module.css";

const initialForm = {
  matricula: "",
  nome: "",
  email: "",
  foto_id: "",
  turma_id: "",
  posicao: "",
};

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
  },
  {
    name: "foto_id",
    label: "Foto ID",
  },
  {
    name: "posicao",
    label: "Posição",
  },
];

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

  const somenteLeitura = !canEditStudents;

  useEffect(() => {

    if (aluno) {
      setForm(preencherFormulario(aluno));
    }

  }, [aluno]);

  function handleChange(e) {

    const {
      name,
      value
    } = e.target;

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

  return (

    <div
      className={styles.overlay}
      onClick={onClose}
    >

      <div
        className={styles.modal}
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className={styles.close}
          onClick={onClose}
        >
          <FaTimes />
        </button>

        <div className={styles.header}>

          <img
            src={foto}
            alt={form.nome}
            className={styles.photo}
          />

          <div>

            <h2>
              <FaUserGraduate />
              {form.nome}
            </h2>

            <span>
              {
                canEditStudents
                  ? "Modo edição"
                  : "Somente leitura"
              }
            </span>

          </div>

        </div>

        <div className={styles.grid}>

          {
            campos.map(({
              name,
              label,
            }) => (

              <div
                key={name}
                className={styles.field}
              >

                <label>
                  {label}
                </label>

                <input
                  name={name}
                  value={form[name]}
                  onChange={handleChange}
                  readOnly={somenteLeitura}
                />

              </div>

            ))
          }

          <div className={styles.field}>

            <label>
              Turma
            </label>

            <select
              name="turma_id"
              value={form.turma_id}
              onChange={handleChange}
              disabled={somenteLeitura}
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

        </div>

        <div className={styles.actions}>

          <button
            className={styles.cancel}
            onClick={onClose}
          >
            Fechar
          </button>

          {
            canEditStudents && (

              <button
                className={styles.save}
                onClick={salvar}
              >
                Salvar Alterações
              </button>

            )
          }

        </div>

      </div>

    </div>

  );

}

export default StudentProfileModal;
