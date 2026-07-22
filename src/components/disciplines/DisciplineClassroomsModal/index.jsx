import {
  FaUsers,
  FaExclamationTriangle,
  FaCheckCircle
} from "react-icons/fa";

import ProfileModal from "../../ui/ProfileModal";

import ClassroomCheckboxSelector from "../../ClassroomCheckboxSelector";

import styles from "./DisciplineClassroomsModal.module.css";

function DisciplineClassroomsModal({
  open,
  disciplina,
  turmasSelecionadas = [],
  setTurmasSelecionadas,
  onSave,
  onClose
}) {

  if (!open) { return null; }

  return (

    <ProfileModal
      title="Vincular disciplina à turmas"
      icon={<FaUsers />}
      form={{}}
      fields={[]}
      onSave={onSave}
      saveText="Salvar alterações"
      onClose={onClose}
    >

      <div className={styles.content}>

        <div className={styles.headerInfo}>
          <div>
            <span>Disciplina a ser vinculada:</span>
            <strong>{disciplina?.nome}</strong>
          </div>

          <div className={styles.counter}>
            <FaCheckCircle />
            {turmasSelecionadas.length}
            <small>turma(s)</small>
          </div>
        </div>

        <div className={styles.warning}>

          <FaExclamationTriangle />

          <div>
            <strong>
              Cuidado ao remover turmas
            </strong>
            <p>
              A remoção de uma turma pode excluir
              o diário do professor e apagar dados
              acadêmicos já registrados, como notas,
              frequência e observações.
            </p>
          </div>
        </div>

        <div className={styles.section}>

          <h4>
            Turmas disponíveis
          </h4>

          <p>
            Marque as turmas que terão esta disciplina.
          </p>

        </div>

        <div className={styles.selector}>

          <ClassroomCheckboxSelector

            turmasSelecionadas={turmasSelecionadas}

            setTurmasSelecionadas={setTurmasSelecionadas}

          />

        </div>

      </div>

    </ProfileModal>

  );

}

export default DisciplineClassroomsModal;