import { useState } from "react";

import Loading from "../../components/Loading";
import ClassroomSelector from "../../components/ClassroomSelector";
import ClassroomMap from "../../components/ClassroomMap";

import styles from "./TeacherClassroom.module.css";

import { useTurmas } from "../../hooks/useTurmas";

function TeacherClassroom() {
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  const { turmas } = useTurmas();

  const turmaAtual = turmas.find(
    (t) => t.id === turmaSelecionada
  );

  if (!turmaSelecionada) {
    return (
      <section className={styles.container}>
        <ClassroomSelector
          turmaSelecionada={turmaSelecionada}
          setTurmaSelecionada={setTurmaSelecionada}
        />
      </section>
    );
  }

  return (
    <section className={styles.container}>
      <ClassroomSelector
        turmaSelecionada={turmaSelecionada}
        setTurmaSelecionada={setTurmaSelecionada}
      />

      <ClassroomMap
        turmaId={turmaSelecionada}
        turmaNome={turmaAtual?.nome || ""}
      />
    </section>
  );
}

export default TeacherClassroom;
