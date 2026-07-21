import {
  useCallback,
  useEffect,
  useState
} from "react";

import {

  getDisciplines,

  createDisciplina,

  updateDisciplina,

  deleteDisciplina,

  getTurmasDaDisciplina

} from "../services/disciplineService";



export function useDisciplines(
  turmaId = null
){

  const [
    disciplines,
    setDisciplines
  ] = useState([]);



  const [
    loading,
    setLoading
  ] = useState(true);



  const [
    error,
    setError
  ] = useState(null);




  const carregarDisciplinas = useCallback(

    async()=>{

      try{

        setLoading(true);

        setError(null);

        const data =
          await getDisciplines(
            turmaId
          );

        setDisciplines(
          data
        );

      }

      catch(error){

        console.error(
          "Erro ao carregar disciplinas:",
          error
        );

        setError(error);

        setDisciplines([]);

      }

      finally{

        setLoading(false);

      }

    },

    [turmaId]

  );





  async function salvarDisciplina(
    disciplina
  ){

    if(disciplina.id){

      await updateDisciplina(
        disciplina.id,
        disciplina
      );

    }else{

      await createDisciplina(
        disciplina
      );

    }

    await carregarDisciplinas();

  }





  async function excluirDisciplina(
    id
  ){

    await deleteDisciplina(
      id
    );

    await carregarDisciplinas();

  }





  async function carregarTurmasDaDisciplina(
    disciplinaId
  ){

    return await getTurmasDaDisciplina(
      disciplinaId
    );

  }





  useEffect(()=>{

    carregarDisciplinas();

  },[
    carregarDisciplinas
  ]);





  return{

    disciplines,

    loading,

    error,

    carregarDisciplinas,

    salvarDisciplina,

    excluirDisciplina,

    carregarTurmasDaDisciplina

  };

}