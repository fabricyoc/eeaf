import styles from "./RoomMap.module.css";

import Loading from "../../components/Loading";
import ClassroomSelector from "../../components/ClassroomSelector";
import ClassroomMap from "../../components/ClassroomMap";
import HeaderDashboard from "../../components/HeaderDashboard";

import { useState } from "react";
import { useTurmas } from "../../hooks/useTurmas";

function RoomMap() {
  const [turmaSelecionada, setTurmaSelecionada] = useState("");

  const { turmas } = useTurmas();

  const turmaAtual = turmas.find(
    (t) => t.id === turmaSelecionada
  );

  if (!turmaSelecionada) {
    return (
      <section className={styles.container}>
        <HeaderDashboard
          title="Mapa de Sala"
        >
          <ClassroomSelector
            turmaSelecionada={turmaSelecionada}
            setTurmaSelecionada={setTurmaSelecionada}
          />
        </HeaderDashboard>
      </section>
    );
  }

  return (
    <section className={styles.container}>

      <HeaderDashboard
        title="Mapa de Sala"
      >
        <ClassroomSelector
          turmaSelecionada={turmaSelecionada}
          setTurmaSelecionada={setTurmaSelecionada}
        />
      </HeaderDashboard>


      <ClassroomMap
        turmaId={turmaSelecionada}
        turmaNome={turmaAtual?.nome || ""}
      />
    </section>
  );
}

export default RoomMap;
