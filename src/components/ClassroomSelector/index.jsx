import styles from "./ClassroomSelector.module.css";
import { useTurmas } from "../../hooks/useTurmas";

function ClassroomSelector({
  turmaSelecionada,
  setTurmaSelecionada
}) {
  const { turmas, loading } = useTurmas();

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Mapa da Sala</h2>

      <div className={styles.content}>
        <label htmlFor="turma" className={styles.label}>
          Selecione uma turma
        </label>

        <select
          id="turma"
          className={styles.select}
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
        >
          <option value="">Escolha uma turma</option>

          {loading && <option>Carregando...</option>}

          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {turma.nome.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </section>
  );
}

export default ClassroomSelector;
