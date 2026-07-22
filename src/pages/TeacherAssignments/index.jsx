import { useEffect, useState } from "react";

import styles from "./TeacherAssignments.module.css";

import Loading from "../../components/Loading";

import TeacherAssignmentsHeader
  from "../../components/teacherAssignments/TeacherAssignmentsHeader";

import TeacherAssignmentsTable
  from "../../components/teacherAssignments/TeacherAssignmentsTable";

import TeacherAssignmentModal
  from "../../components/teacherAssignments/TeacherAssignmentModal";

import TeacherAssignmentDeleteDialog
  from "../../components/teacherAssignments/TeacherAssignmentDeleteDialog";

import {
  useTeacherAssignments
} from "../../hooks/useTeacherAssignments";

import {
  useUsers
} from "../../hooks/useUsers";

import {
  useTeacherAssignmentForm
} from "../../hooks/useTeacherAssignmentForm";

import {
  useTeacherAssignmentDelete
} from "../../hooks/useTeacherAssignmentDelete";

function TeacherAssignments() {

  const {
    assignments,
    loading,
    carregar
  } = useTeacherAssignments();

  const {    users  } = useUsers();

  const {
    modal,
    form,
    turmas,
    disciplinas,
    abrirModal,
    fecharModal,
    alterarCampo,
    salvar
  } = useTeacherAssignmentForm({    carregar  });

  const {
    confirmOpen,
    assignmentSelecionada,
    solicitarExclusao,
    confirmarExclusao,
    fecharConfirmacao
  } = useTeacherAssignmentDelete({ carregar });

  const [lista, setLista] = useState([]);

  const [buscaAtiva, setBuscaAtiva] = useState(false);

  useEffect(() => {
    setLista(assignments);
  }, [assignments]);

  if (loading) {
    return (
      <Loading
        text="Carregando alocações..."
      />
    );
  }

  return (

    <section className={styles.container}>

      <TeacherAssignmentsHeader
        assignments={assignments}
        onSearch={setLista}
        setBuscaAtiva={setBuscaAtiva}
        onNovo={abrirModal}
      />

      <TeacherAssignmentsTable
        assignments={lista}
        buscaAtiva={buscaAtiva}
        onDelete={solicitarExclusao}
      />

      <TeacherAssignmentModal
        open={modal}
        form={form}
        users={users}
        turmas={turmas}
        disciplinas={disciplinas}
        onChange={alterarCampo}
        onSave={salvar}
        onClose={fecharModal}
      />

      <TeacherAssignmentDeleteDialog
        open={confirmOpen}
        assignment={assignmentSelecionada}
        onConfirm={confirmarExclusao}
        onClose={fecharConfirmacao}
      />

    </section>

  );

}

export default TeacherAssignments;
