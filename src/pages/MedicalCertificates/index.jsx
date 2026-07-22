import { useEffect, useState } from "react";

import styles from "./MedicalCertificates.module.css";

import Loading from "../../components/Loading";

import CertificatesHeader from "../../components/medicalCertificates/CertificatesHeader";
import CertificatesTable from "../../components/medicalCertificates/CertificatesTable";
import CertificateModal from "../../components/medicalCertificates/CertificateModal";

import { useAtestados } from "../../hooks/useAtestados";
import { useAtestadoForm } from "../../hooks/useAtestadoForm";
import { useAtestadoActions } from "../../hooks/useAtestadoActions";
import { useRole } from "../../hooks/useRole";

function MedicalCertificates() {
  const {
    canCreateCertificates,
    canEditCertificates,
    canDeleteCertificates,
    isSecretary,
    isCoordinator,
    isAdmin,
  } = useRole();

  const {
    atestados,
    loading,
    salvarAtestado,
    excluirAtestado,
  } = useAtestados();

  const {
    modal,
    form,
    atestadoSelecionado,
    alunoSelecionado,
    abrirNovo,
    editar,
    fecharModal,
    alterarCampo,
    selecionarAluno,
  } = useAtestadoForm();

  const { salvar, excluir } = useAtestadoActions({
    form,
    atestadoSelecionado,
    salvarAtestado,
    excluirAtestado,
    fecharModal,
    canCreateCertificates,
  });

  const [lista, setLista] = useState([]);

  const [buscaAtiva, setBuscaAtiva] = useState(false);

  useEffect(() => {
    setLista(atestados);
  }, [atestados]);

  const canShowActions =
    isSecretary ||
    isCoordinator ||
    isAdmin;

  if (loading) {
    return (
      <Loading text="Carregando atestados..." />
    );
  }

  return (
    <section className={styles.container}>
      <CertificatesHeader
        atestados={atestados}
        onSearch={setLista}
        setBuscaAtiva={setBuscaAtiva}
        onNovo={abrirNovo}
        canCreateCertificates={canCreateCertificates}
      />

      <div className={styles.content}>
        <CertificatesTable
          lista={lista}
          buscaAtiva={buscaAtiva}
          onEditar={editar}
          onExcluir={excluir}
          canEditCertificates={canEditCertificates}
          canDeleteCertificates={canDeleteCertificates}
          canShowActions={canShowActions}
        />
      </div>

      <CertificateModal
        modal={modal}
        atestadoSelecionado={atestadoSelecionado}
        form={form}
        alunoSelecionado={alunoSelecionado}
        onChange={alterarCampo}
        onSave={salvar}
        onClose={fecharModal}
        onSelectAluno={selecionarAluno}
      />
    </section>
  );
}

export default MedicalCertificates;
