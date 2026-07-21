import {
  useCallback,
  useEffect,
  useState
} from "react";

import {

  getAtestados,

  createAtestado,

  updateAtestado,

  deleteAtestado

} from "../services/atestadoService";

export function useAtestados() {

  const [
    atestados,
    setAtestados
  ] = useState([]);

  const [
    loading,
    setLoading
  ] = useState(true);

  const [
    error,
    setError
  ] = useState(null);

  const carregarAtestados = useCallback(
    async () => {

      try {

        setLoading(true);

        setError(null);

        const data =
          await getAtestados();

        setAtestados(data);

      } catch (err) {

        console.error(
          "Erro ao carregar atestados:",
          err
        );

        setError(err);

      } finally {

        setLoading(false);

      }

    },
    []
  );

  async function salvarAtestado(
    dados
  ) {

    try {

      if(dados.id){

        await updateAtestado(

          dados.id,

          dados

        );

      }else{

        await createAtestado(

          dados

        );

      }

      await carregarAtestados();

    } catch(err){

      console.error(
        "Erro ao salvar atestado:",
        err
      );

      throw err;

    }

  }

  async function excluirAtestado(
    id
  ){

    try{

      await deleteAtestado(

        id

      );

      await carregarAtestados();

    }catch(err){

      console.error(
        "Erro ao excluir atestado:",
        err
      );

      throw err;

    }

  }

  useEffect(()=>{

    carregarAtestados();

  },[
    carregarAtestados
  ]);

  return {

    atestados,

    loading,

    error,

    carregarAtestados,

    salvarAtestado,

    excluirAtestado

  };

}