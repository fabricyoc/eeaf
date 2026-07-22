import {
  useState
} from "react";

import {
  toast
} from "react-toastify";

import {
  useDisciplines
} from "./useDisciplines";

import {
  initialDisciplineForm
} from "../components/disciplines/constants";


export function useDisciplinePage() {


  const {

    disciplines,

    loading,

    salvarDisciplina,

    excluirDisciplina,

    atualizarTurmas

  } = useDisciplines();



  const [modal,setModal] = useState(false);

  const [turmaModal,setTurmaModal] = useState(false);

  const [disciplinaAtual,setDisciplinaAtual] = useState(null);

  const [form,setForm] = useState(
    initialDisciplineForm
  );

  const [turmasSelecionadas,setTurmasSelecionadas] = useState([]);





  function abrirNova(){

    setDisciplinaAtual(null);

    setForm(
      initialDisciplineForm
    );

    setModal(true);

  }





  function editar(disciplina){

    setDisciplinaAtual(
      disciplina
    );

    setForm({

      nome: disciplina.nome,

      codigo: disciplina.codigo || ""

    });


    setModal(true);

  }






  function abrirTurmas(disciplina){


    setDisciplinaAtual(
      disciplina
    );


    const ids =
      disciplina.turma_disciplina
      ?.map(item => item.turma_id)
      || [];


    setTurmasSelecionadas(ids);


    setTurmaModal(true);

  }





  function alterarCampo(name,value){

    setForm(prev=>({

      ...prev,

      [name]:value

    }));

  }





  async function salvar(){


    try{


      await salvarDisciplina({

        ...form,

        id: disciplinaAtual?.id

      });



      toast.success(

        disciplinaAtual

        ? "Disciplina atualizada com sucesso!"

        : "Disciplina criada com sucesso!"

      );



      fecharModal();



    }catch(error){


      console.error(error);


      toast.error(
        "Erro ao salvar disciplina."
      );


    }


  }








  async function salvarTurmas(){


    try{


      await atualizarTurmas(

        disciplinaAtual.id,

        turmasSelecionadas

      );



      toast.success(
        "Turmas atualizadas com sucesso!"
      );



      fecharTurmaModal();



    }catch(error){


      console.error(error);


      toast.error(
        "Erro ao atualizar turmas."
      );


    }


  }








  async function excluir(disciplina){


    try{


      await excluirDisciplina(
        disciplina.id
      );



      toast.success(
        "Disciplina removida com sucesso!"
      );



    }catch(error){


      // console.error(error);



      toast.error(

        error.message ||

        "Erro ao excluir disciplina."

      );


    }


  }







  function fecharModal(){

    setModal(false);

    setDisciplinaAtual(null);

    setForm(
      initialDisciplineForm
    );

  }





  function fecharTurmaModal(){

    setTurmaModal(false);

    setDisciplinaAtual(null);

    setTurmasSelecionadas([]);

  }





  return {


    disciplines,

    loading,


    modal,

    turmaModal,


    disciplinaAtual,


    form,


    turmasSelecionadas,


    abrirNova,

    editar,

    abrirTurmas,


    alterarCampo,

    alterarTurmas:
      setTurmasSelecionadas,


    salvar,

    salvarTurmas,


    excluir,


    fecharModal,

    fecharTurmaModal


  };


}