import { FaPlus } from "react-icons/fa";

import HeaderDashboard from "../../HeaderDashboard";
import SearchBar from "../../ui/SearchBar";

import styles from "./CertificatesHeader.module.css";


const SEARCH_FIELDS = [
  "alunos.nome",
  "alunos.turmas.nome",
  "turno",
  "data_inicio",
  "data_fim",
];


function CertificatesHeader({

  atestados,

  onSearch,

  setBuscaAtiva,

  onNovo,

  canCreateCertificates,

}) {


  return (

    <HeaderDashboard
      title="Atestados dos Alunos"
    >


      <div className={styles.actions}>


        <SearchBar

          items={atestados}

          onSearch={onSearch}

          setBuscaAtiva={setBuscaAtiva}

          fields={SEARCH_FIELDS}

          placeholder="Pesquise aluno(a), turma ou data..."

        />



        {
          canCreateCertificates && (

            <button

              className={styles.button}

              onClick={onNovo}

            >

              <FaPlus />

              Novo Atestado

            </button>

          )
        }


      </div>


    </HeaderDashboard>

  );

}


export default CertificatesHeader;