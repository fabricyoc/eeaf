import { useState, useRef, useEffect } from "react";

import styles from "./ClassroomSelector.module.css";
import { useTurmas } from "../../hooks/useTurmas";

function ClassroomSelector({

  multiple = false,

  turmaSelecionada,
  setTurmaSelecionada,

  turmasSelecionadas = [],
  setTurmasSelecionadas,

}) {

  const {
    turmas,
    loading
  } = useTurmas();

  const [open, setOpen] = useState(false);

  const dropdownRef = useRef(null);

  const selected = turmas.find(
    turma => turma.id === turmaSelecionada
  );

  useEffect(() => {

    function handleClickOutside(event){

      if(
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ){

        setOpen(false);

      }

    }

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () =>

      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );

  }, []);

  function toggleTurma(id){

    if(!setTurmasSelecionadas){
      return;
    }

    const existe =
      turmasSelecionadas.includes(id);

    if(existe){

      setTurmasSelecionadas(

        turmasSelecionadas.filter(
          turmaId => turmaId !== id
        )

      );

    }else{

      setTurmasSelecionadas([
        ...turmasSelecionadas,
        id
      ]);

    }

  }

  function textoSelecionado(){

    if(loading){

      return "Carregando turmas...";

    }

    if(multiple){

      if(turmasSelecionadas.length === 0){

        return "Selecione uma ou mais turmas";

      }

      if(turmasSelecionadas.length === 1){

        const turma = turmas.find(
          t => t.id === turmasSelecionadas[0]
        );

        return turma?.nome ?? "";

      }

      return `${turmasSelecionadas.length} turmas selecionadas`;

    }

    return selected
      ? selected.nome.toUpperCase()
      : "Escolha uma turma";

  }

  return(

    <div className={styles.content}>

      <label className={styles.label}>
        Selecione a turma
      </label>

      <div
        className={styles.dropdown}
        ref={dropdownRef}
      >

        <div
          className={styles.control}
          onClick={() => setOpen(!open)}
        >

          {textoSelecionado()}

          <span className={styles.arrow}>
            ▾
          </span>

        </div>

        {

          open && (

            <div className={styles.menu}>

              {

                turmas.map(turma => (

                  multiple ? (

                    <label
                      key={turma.id}
                      className={styles.checkboxItem}
                    >

                      <input

                        type="checkbox"

                        checked={
                          turmasSelecionadas.includes(
                            turma.id
                          )
                        }

                        onChange={() =>
                          toggleTurma(
                            turma.id
                          )
                        }

                      />

                      {turma.nome.toUpperCase()}

                    </label>

                  ) : (

                    <div

                      key={turma.id}

                      className={`${styles.item}
                        ${
                          turmaSelecionada === turma.id
                            ? styles.active
                            : ""
                        }`}

                      onClick={() => {

                        setTurmaSelecionada(
                          turma.id
                        );

                        setOpen(false);

                      }}

                    >

                      {turma.nome.toUpperCase()}

                    </div>

                  )

                ))

              }

            </div>

          )

        }

      </div>

    </div>

  );

}

export default ClassroomSelector;