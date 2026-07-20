import {
  useCallback,
  useEffect,
  useState
} from "react";


import {
  getDisciplines
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


      try {


        setLoading(true);

        setError(null);



        const data =
          await getDisciplines(
            turmaId
          );



        setDisciplines(
          data
        );



      } catch(error){


        console.error(
          "Erro ao carregar disciplinas:",
          error
        );


        setError(
          error
        );


        setDisciplines([]);



      } finally {


        setLoading(false);


      }


    },
    [
      turmaId
    ]
  );







  useEffect(()=>{


    carregarDisciplinas();



  },[
    carregarDisciplinas
  ]);







  return {


    disciplines,


    loading,


    error,


    carregarDisciplinas



  };


}