import { useEffect, useState } from "react";
import { FaTimes, FaUserGraduate } from "react-icons/fa";
import { toast } from "react-toastify";

import { useTurmas } from "../../hooks/useTurmas";
import { useRole } from "../../hooks/useRole";
import { updateAluno } from "../../services/studentService";

import styles from "./StudentProfileModal.module.css";

function StudentProfileModal({
  aluno,
  onClose,
  onSuccess,
}) {
  const { turmas } = useTurmas();

  const { canEditStudents } = useRole();

  const [form, setForm] = useState({
    matricula: "",
    nome: "",
    email: "",
    foto_id: "",
    turma_id: "",
    posicao: "",
  });

  useEffect(() => {
    if (!aluno) return;

    setForm({
      matricula: aluno.matricula || "",
      nome: aluno.nome || "",
      email: aluno.email || "",
      foto_id: aluno.foto_id || "",
      turma_id: aluno.turma_id || "",
      posicao: aluno.posicao || "",
    });
  }, [aluno]);

  function handleChange(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  }

async function salvar() {
  try {
    await updateAluno(aluno.id, form);

    // Recarrega os alunos do contexto
    await onSuccess?.();

    toast.success("Aluno atualizado com sucesso!");

    onClose();

  } catch (err) {
    console.error(err);

    toast.error("Erro ao atualizar aluno.");
  }
}

  const foto =
    form.foto_id
      ? `https://drive.google.com/thumbnail?id=${form.foto_id}&sz=w1000`
      : "https://placehold.co/250x250?text=Sem+Foto";

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
              {canEditStudents
                ? "Modo edição"
                : "Somente leitura"}
            </span>

          </div>

        </div>

        <div className={styles.grid}>

          <div className={styles.field}>
            <label>Matrícula</label>

            <input
              name="matricula"
              value={form.matricula}
              onChange={handleChange}
              readOnly={!canEditStudents}
            />
          </div>

          <div className={styles.field}>
            <label>Email</label>

            <input
              name="email"
              value={form.email}
              onChange={handleChange}
              readOnly={!canEditStudents}
            />
          </div>

          <div className={styles.field}>
            <label>Nome</label>

            <input
              name="nome"
              value={form.nome}
              onChange={handleChange}
              readOnly={!canEditStudents}
            />
          </div>

          <div className={styles.field}>
            <label>Foto ID</label>

            <input
              name="foto_id"
              value={form.foto_id}
              onChange={handleChange}
              readOnly={!canEditStudents}
            />
          </div>

          <div className={styles.field}>
            <label>Turma</label>

            <select
              name="turma_id"
              value={form.turma_id}
              onChange={handleChange}
              disabled={!canEditStudents}
            >
              {turmas.map((turma) => (
                <option
                  key={turma.id}
                  value={turma.id}
                >
                  {turma.nome.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <div className={styles.field}>
            <label>Posição</label>

            <input
              name="posicao"
              value={form.posicao}
              onChange={handleChange}
              readOnly={!canEditStudents}
            />
          </div>

        </div>

        <div className={styles.actions}>

          <button
            className={styles.cancel}
            onClick={onClose}
          >
            Fechar
          </button>

          {canEditStudents && (
            <button
              className={styles.save}
              onClick={salvar}
            >
              Salvar Alterações
            </button>
          )}

        </div>

      </div>
    </div>
  );
}

export default StudentProfileModal;
