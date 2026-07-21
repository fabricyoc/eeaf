import {
  useState,
  useEffect, useRef
} from "react";

import {
  FaSearch,
  FaUserGraduate
} from "react-icons/fa";

import {
  searchAlunos
} from "../../../services/studentService";

import styles from "./StudentSearch.module.css";

function StudentSearch({
  onSelect,
  alunoSelecionado
}) {

  const [pesquisa, setPesquisa] = useState(alunoSelecionado?.nome || "");

  const [resultados, setResultados] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {

    const termo = pesquisa.trim();

    if (termo.length < 3) {
      setResultados([]);
      return;
    }

    const buscar = async () => {

      try {

        setLoading(true);

        const alunos = await searchAlunos(termo);
        setResultados(alunos);

      } catch (error) {

        console.error("Erro ao buscar alunos:", error);
        setResultados([]);

      } finally {
        setLoading(false);
      }

    };

    const delay = setTimeout(buscar, 300);

    return () =>
      clearTimeout(delay);

  }, [pesquisa]);

  function selecionar(aluno) {

    onSelect(aluno);

    // limpa o campo de pesquisa
    setPesquisa("");

    // esconde a lista
    setResultados([]);

  }

  function limparSelecao() {

    setPesquisa("");
    setResultados([]);
    onSelect(null);

    // aguarda o componente atualizar
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  }

  return (

    <div
      className={styles.container}
    >
      <label
        className={styles.label}
      >
        Aluno
      </label>

      <div
        className={styles.inputWrapper}
      >

        <FaSearch
          className={styles.icon}
        />

        <input
          ref={inputRef}
          type="text"
          value={pesquisa}
          placeholder="Digite o nome do aluno..."
          onChange={(e) =>
            setPesquisa(e.target.value)
          }
        />

      </div>

      {
        loading && (
          <div
            className={styles.loading}
          >
            Buscando alunos...
          </div>
        )
      }

      {
        resultados.length > 0 && (

          <div
            className={styles.results}
          >

            {
              resultados.map(
                aluno => (
                  <button
                    key={aluno.id}
                    type="button"
                    className={styles.resultItem}
                    onClick={() =>
                      selecionar(aluno)
                    }
                  >

                    <div
                      className={styles.studentInfo}
                    >
                      <FaUserGraduate />

                      <div>
                        <strong>
                          {
                            aluno.nome.toUpperCase()
                          }
                        </strong>

                        <span>
                          {
                            aluno.turma
                              ? aluno.turma.toUpperCase()
                              : "SEM TURMA"
                          }
                        </span>
                      </div>
                    </div>
                  </button>
                )
              )
            }
          </div>
        )
      }

      {
        !loading &&
        pesquisa.length >= 3 &&
        resultados.length === 0 && (
          <div
            className={styles.empty}
          >
            Nenhum aluno encontrado.
          </div>
        )
      }

      {
        alunoSelecionado && (
          <div
            className={styles.selected}
          >
            <FaUserGraduate />

            <span>
              Aluno selecionado:
            </span>

            <strong>
              {
                alunoSelecionado.nome.toUpperCase()
              }
            </strong>

            <button
              type="button"
              onClick={limparSelecao}
            >
              Alterar
            </button>
          </div>
        )
      }
    </div>
  );
}

export default StudentSearch;
