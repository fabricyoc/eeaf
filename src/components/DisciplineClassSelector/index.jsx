import styles from "./DisciplineClassSelector.module.css";

import { useTurmas } from "../../hooks/useTurmas";


function DisciplineClassSelector({

    turmasSelecionadas = [],

    setTurmasSelecionadas

}){


    const {
        turmas,
        loading
    } = useTurmas();



    function alterarTurma(id){


        if(
            turmasSelecionadas.includes(id)
        ){

            setTurmasSelecionadas(

                turmasSelecionadas.filter(
                    turmaId =>
                    turmaId !== id
                )

            );


        }
        else{


            setTurmasSelecionadas([

                ...turmasSelecionadas,

                id

            ]);

        }

    }



    return(

        <div className={styles.container}>


            <label>

                Turmas vinculadas

            </label>


            {

                loading

                ?

                <p>
                    Carregando turmas...
                </p>


                :


                turmas.map(turma=>(


                    <label

                        key={turma.id}

                        className={styles.item}

                    >


                        <input

                            type="checkbox"

                            checked={

                                turmasSelecionadas.includes(
                                    turma.id
                                )

                            }


                            onChange={()=>alterarTurma(turma.id)}

                        />


                        {turma.nome}


                    </label>


                ))

            }


        </div>

    );

}


export default DisciplineClassSelector;