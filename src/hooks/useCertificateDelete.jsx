import {
  useState
} from "react";

import {
  toast
} from "react-toastify";


export function useCertificateDelete({
  excluirAtestado
}) {


  const [

    confirmOpen,

    setConfirmOpen

  ] = useState(false);



  const [

    atestadoSelecionado,

    setAtestadoSelecionado

  ] = useState(null);





  function solicitarExclusao(atestado) {


    setAtestadoSelecionado(atestado);

    setConfirmOpen(true);


  }






  async function confirmarExclusao() {


    if (!atestadoSelecionado) {

      return;

    }



    try {


      await excluirAtestado(
        atestadoSelecionado.id
      );


      toast.success(
        "Atestado excluído com sucesso!"
      );



    } catch(error) {


      toast.error(
        error.message ||
        "Erro ao excluir atestado"
      );


    } finally {


      setConfirmOpen(false);

      setAtestadoSelecionado(null);


    }


  }






  function fecharConfirmacao() {


    setConfirmOpen(false);

    setAtestadoSelecionado(null);


  }






  return {


    confirmOpen,


    atestadoSelecionado,


    solicitarExclusao,


    confirmarExclusao,


    fecharConfirmacao


  };


}