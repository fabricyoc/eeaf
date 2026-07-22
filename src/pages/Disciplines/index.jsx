import styles from "./Disciplines.module.css";

import {
  FaPlus
} from "react-icons/fa";


import Loading from "../../components/Loading";
import HeaderDashboard from "../../components/HeaderDashboard";


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



      <HeaderDashboard

        title="Componentes Curriculares"

      >


        <button

          className={styles.button}

          onClick={abrirNova}

        >

          <FaPlus />

          Nova Disciplina


        </button>



      </HeaderDashboard>







      <DisciplineTable


        disciplines={disciplines}


        onEdit={editar}


        // onClassrooms={abrirTurmas}
          onManageClassrooms={abrirTurmas}



        onDelete={excluir}


      />








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


        turmasSelecionadas={turmasSelecionadas}


        setTurmasSelecionadas={alterarTurmas}


        onSave={salvarTurmas}


        onClose={fecharTurmaModal}


      />




    </section>


  );

}


export default Disciplines;