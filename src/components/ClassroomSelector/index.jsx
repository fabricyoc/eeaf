import { useState, useRef, useEffect } from "react";
import styles from "./ClassroomSelector.module.css";
import { useTurmas } from "../../hooks/useTurmas";

function ClassroomSelector({ turmaSelecionada, setTurmaSelecionada }) {
  const { turmas, loading } = useTurmas();

  const [open, setOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selected = turmas.find(
    (t) => t.id === turmaSelecionada
  );

  /**
   * Fecha ao clicar fora
   */
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Mapa da Sala</h2>

      <div className={styles.content}>
        <label className={styles.label}>
          Selecione uma turma
        </label>

        {/* DROPDOWN CUSTOM */}
        <div className={styles.dropdown} ref={dropdownRef}>
          
          {/* BOTÃO */}
          <div
            className={styles.control}
            onClick={() => setOpen(!open)}
          >
            {loading
              ? "Carregando turmas..."
              : selected
              ? selected.nome.toUpperCase()
              : "Escolha uma turma"}

            <span className={styles.arrow}>▾</span>
          </div>

          {/* MENU */}
          {open && (
            <div className={styles.menu}>
              {turmas.map((turma) => (
                <div
                  key={turma.id}
                  className={`${styles.item} ${
                    turmaSelecionada === turma.id
                      ? styles.active
                      : ""
                  }`}
                  onClick={() => {
                    setTurmaSelecionada(turma.id);
                    setOpen(false);
                  }}
                >
                  {turma.nome.toUpperCase()}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default ClassroomSelector;