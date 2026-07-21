import styles from "./Classes.module.css";

import {
  FaUsers,
  FaCalendarAlt,
  FaClock,
  FaBookOpen
} from "react-icons/fa";

import Loading from "../../components/Loading";
import HeaderDashboard from "../../components/HeaderDashboard";

import {
  useClasses
} from "../../hooks/useClasses";

function Classes() {

  const {
    classes,
    loading
  } = useClasses();

  if (loading) {

    return (

      <Loading
        text="Carregando turmas..."
      />

    );

  }

  return (

    <section className={styles.container}>

      <HeaderDashboard
        title="Minhas Turmas"
      />

      {
        classes.length === 0 ? (

          <div
            className={styles.emptyMessage}
          >

            Professor não alocado em nenhuma turma.

          </div>

        ) : (

          <div
            className={styles.grid}
          >

            {
              classes.map(turma => {

                const disciplinas =
                  turma.disciplinas ?? [];

                const quantidadeDisciplinas =
                  disciplinas.length ??
                  turma.totalDisciplinas ??
                  0;

                return (

                  <article

                    key={turma.id}

                    className={styles.card}

                  >

                    <div
                      className={styles.top}
                    >

                      <div
                        className={styles.icon}
                      >

                        <FaUsers />

                      </div>

                      <div>

                        <h2>

                          {
                            turma.nome
                              ?.toUpperCase()
                          }

                        </h2>

                        <p
                          className={
                            styles.subtitle
                          }
                        >

                          Ensino Técnico

                        </p>

                      </div>

                    </div>

                    <div
                      className={styles.meta}
                    >

                      <div
                        className={
                          styles.metaItem
                        }
                      >

                        <FaCalendarAlt />

                        <div>

                          <span>
                            Ano
                          </span>

                          <strong>
                            {turma.ano}
                          </strong>

                        </div>

                      </div>

                      <div
                        className={
                          styles.metaItem
                        }
                      >

                        <FaClock />

                        <div>

                          <span>
                            Turno
                          </span>

                          <strong>

                            {
                              turma.turno
                                ?.toUpperCase()
                            }

                          </strong>

                        </div>

                      </div>

                    </div>

                    <div
                      className={
                        styles.divider
                      }
                    />

                    <div
                      className={
                        styles.counter
                      }
                    >

                      <FaBookOpen
                        className={
                          styles.bookIcon
                        }
                      />

                      <span
                        className={
                          styles.number
                        }
                      >

                        {
                          quantidadeDisciplinas
                        }

                      </span>

                      <span
                        className={
                          styles.text
                        }
                      >

                        DISCIPLINAS

                      </span>

                    </div>

                    <div
                      className={
                        styles.disciplineList
                      }
                    >

                      {
                        disciplinas.length > 0 ? (

                          disciplinas.map(
                            disciplina => (

                              <span

                                key={
                                  disciplina.id
                                }

                                className={
                                  styles.discipline
                                }

                              >

                                {
                                  disciplina.nome
                                    ?.toUpperCase()
                                }

                              </span>

                            )

                          )

                        ) : (

                          <span
                            className={
                              styles.emptyDiscipline
                            }
                          >

                            Nenhuma disciplina cadastrada

                          </span>

                        )

                      }

                    </div>

                  </article>

                );

              })

            }

          </div>

        )

      }

    </section>

  );

}

export default Classes;
