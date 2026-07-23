import {
  useEffect,
  useState
} from "react";


import styles from "./Disciplines.module.css";


import Loading
  from "../../components/Loading";


import DisciplinesHeader
  from "../../components/disciplines/DisciplinesHeader";


import DisciplineTable
  from "../../components/disciplines/DisciplineTable";


import DisciplineModal
  from "../../components/disciplines/DisciplineModal";


import DisciplineClassroomsModal
  from "../../components/disciplines/DisciplineClassroomsModal";


import {
  useDisciplinePage
} from "../../hooks/useDisciplinePage";



function Disciplines() {


  const {

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

    alterarTurmas,

    salvar,

    salvarTurmas,

    excluir,

    fecharModal,

    fecharTurmaModal

  } = useDisciplinePage();





  const [

    lista,

    setLista

  ] = useState([]);





  const [

    buscaAtiva,

    setBuscaAtiva

  ] = useState(false);







  useEffect(() => {


    setLista(disciplines);


  }, [
    disciplines
  ]);








  if (loading) {


    return (

      <Loading

        text="Carregando componentes curriculares..."

      />

    );


  }








  return (

    <section

      className={styles.container}

    >



      <DisciplinesHeader


        disciplines={disciplines}


        onSearch={setLista}


        setBuscaAtiva={setBuscaAtiva}


        onNovo={abrirNova}


      />






      <div

        className={styles.content}

      >


        <DisciplineTable


          disciplines={lista}


          buscaAtiva={buscaAtiva}


          onEdit={editar}


          onManageClassrooms={
            abrirTurmas
          }


          onDelete={excluir}


        />


      </div>







      <DisciplineModal


        open={modal}


        disciplina={disciplinaAtual}


        form={form}


        onChange={alterarCampo}


        onSave={salvar}


        onClose={fecharModal}


      />







      <DisciplineClassroomsModal


        open={turmaModal}


        disciplina={disciplinaAtual}


        turmasSelecionadas={
          turmasSelecionadas
        }


        setTurmasSelecionadas={
          alterarTurmas
        }


        onSave={salvarTurmas}


        onClose={fecharTurmaModal}


      />




    </section>

  );


}


export default Disciplines;