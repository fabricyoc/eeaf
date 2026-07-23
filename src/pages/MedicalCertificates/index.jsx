import styles from "./MedicalCertificates.module.css";
import Loading from "../../components/Loading";
import CertificatesHeader
  from "../../components/medicalCertificates/CertificatesHeader";
import CertificatesTable
  from "../../components/medicalCertificates/CertificatesTable";
import CertificateModal
  from "../../components/medicalCertificates/CertificateModal";
import CertificateDeleteDialog
  from "../../components/medicalCertificates/CertificateDeleteDialog";
import CertificateViewDialog
  from "../../components/medicalCertificates/CertificateViewDialog";
import {
  useAtestados
} from "../../hooks/useAtestados";
import {
  useAtestadoForm
} from "../../hooks/useAtestadoForm";
import {
  useAtestadoActions
} from "../../hooks/useAtestadoActions";
import {
  useCertificateDelete
} from "../../hooks/useCertificateDelete";
import {
  useCertificateFilter
} from "../../hooks/useCertificateFilter";
import {
  useCertificateView
} from "../../hooks/useCertificateView";
import {
  useRole
} from "../../hooks/useRole";
function MedicalCertificates() {

  // ==========================
  // PERMISSÕES
  // ==========================
  const {
    canCreateCertificates,
    canEditCertificates,
    canDeleteCertificates,
    isSecretary,
    isCoordinator,
    isAdmin
  } = useRole();

  // ==========================
  // DADOS DOS ATESTADOS
  // ==========================
  const {
    atestados,
    loading,
    salvarAtestado,
    excluirAtestado
  } = useAtestados();

  // ==========================
  // FILTRO / BUSCA
  // ==========================
  const {
    lista,
    buscaAtiva,
    filtrar,
    setBuscaAtiva
  } = useCertificateFilter(atestados);

  // ==========================
  // FORMULÁRIO
  // ==========================
  const {
    modal,
    form,
    atestadoSelecionado,
    alunoSelecionado,
    abrirNovo,
    editar,
    fecharModal,
    alterarCampo,
    selecionarAluno
  } = useAtestadoForm();

  // ==========================
  // SALVAR / EDITAR
  // ==========================
  const { salvar } = useAtestadoActions({
    form,
    atestadoSelecionado,
    salvarAtestado,
    fecharModal,
    canCreateCertificates
  });

  // ==========================
  // EXCLUSÃO
  // ==========================
  const {
    confirmOpen,
    atestadoSelecionado:
    atestadoSelecionadoDelete,
    solicitarExclusao,
    confirmarExclusao,
    fecharConfirmacao
  } = useCertificateDelete({ excluirAtestado });

  // ==========================
  // VISUALIZAÇÃO
  // ==========================
  const {
    open: visualizarOpen,
    atestado: atestadoVisualizar,
    visualizar,
    fechar: fecharVisualizacao
  } = useCertificateView();

  const canShowActions =
    isSecretary ||
    isCoordinator ||
    isAdmin;

  if (loading) {
    return (
      <Loading
        text="Carregando atestados..."
      />
    );
  }
  return (

    <section
      className={styles.container}
    >
      <CertificatesHeader
        atestados={atestados}
        onSearch={filtrar}
        setBuscaAtiva={setBuscaAtiva}
        onNovo={abrirNovo}
        canCreateCertificates={canCreateCertificates}
      />

      <div
        className={styles.content}
      >
        <CertificatesTable
          lista={lista}
          buscaAtiva={buscaAtiva}
          onVisualizar={visualizar}
          onEditar={editar}
          onExcluir={solicitarExclusao}
          canEditCertificates={canEditCertificates}
          canDeleteCertificates={canDeleteCertificates}
          canShowActions={canShowActions}
        />
      </div>

      {
        modal && (
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
        )
      }

      <CertificateDeleteDialog
        open={confirmOpen}
        atestado={atestadoSelecionadoDelete}
        onConfirm={confirmarExclusao}
        onClose={fecharConfirmacao}
      />

      <CertificateViewDialog
        open={visualizarOpen}
        atestado={atestadoVisualizar}
        onClose={fecharVisualizacao}
      />
    </section>
  );
}
export default MedicalCertificates;
