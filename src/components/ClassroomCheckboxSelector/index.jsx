import {
  useTurmas
} from "../../hooks/useTurmas";
import styles from "./ClassroomCheckboxSelector.module.css";
function ClassroomCheckboxSelector({
  turmasSelecionadas = [],
  setTurmasSelecionadas
}) {
  const {
    turmas,
    loading
  } = useTurmas();
  function alterarSelecao(id){
    if(
      turmasSelecionadas.includes(id)
    ){
      setTurmasSelecionadas(
        turmasSelecionadas.filter(
          turmaId =>
            turmaId !== id
        )
      );
    }else{
      setTurmasSelecionadas([
        ...turmasSelecionadas,
        id
      ]);
    }
  }
  if(loading){
    return (
      <p>
        Carregando turmas...
      </p>
    );
  }
  return (
    <div
      className={styles.container}
    >
      <label
        className={styles.title}
      >
        Turmas disponíveis
      </label>
      <div
        className={styles.list}
      >
        {
          turmas.map(
            turma => (
              <label
                key={turma.id}
                className={
                  styles.item
                }
              >
                <input
                  type="checkbox"
                  checked={
                    turmasSelecionadas.includes(
                      turma.id
                    )
                  }
                  onChange={() =>
                    alterarSelecao(
                      turma.id
                    )
                  }
                />
                <span>
                  {turma.nome.toUpperCase()}
                </span>
              </label>
            )
          )
        }
      </div>
    </div>
  );
}
export default ClassroomCheckboxSelector;