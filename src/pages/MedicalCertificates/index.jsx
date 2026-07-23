import {
  useEffect,
  useState
} from "react";
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
  useRole
} from "../../hooks/useRole";
function MedicalCertificates() {
  const {
    canCreateCertificates,
    canEditCertificates,
    canDeleteCertificates,
    isSecretary,
    isCoordinator,
    isAdmin
  } = useRole();
  const {
    atestados,
    loading,
    salvarAtestado,
    excluirAtestado
  } = useAtestados();
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
  const {
    salvar
  } = useAtestadoActions({
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
  } = useCertificateDelete({
    excluirAtestado
  });
  // ==========================
  // VISUALIZAÇÃO
  // ==========================
  const [
    visualizarOpen,
    setVisualizarOpen
  ] = useState(false);
  const [
    atestadoVisualizar,
    setAtestadoVisualizar
  ] = useState(null);
  function visualizar(atestado) {
    setAtestadoVisualizar(atestado);
    setVisualizarOpen(true);
  }
  function fecharVisualizacao() {
    setVisualizarOpen(false);
    setAtestadoVisualizar(null);
  }
  const [
    lista,
    setLista
  ] = useState([]);
  const [
    buscaAtiva,
    setBuscaAtiva
  ] = useState(false);
  useEffect(() => {
    setLista(atestados);
  }, [
    atestados
  ]);
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
        onSearch={setLista}
        setBuscaAtiva={setBuscaAtiva}
        onNovo={abrirNovo}
        canCreateCertificates={
          canCreateCertificates
        }
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
          canEditCertificates={
            canEditCertificates
          }
          canDeleteCertificates={
            canDeleteCertificates
          }
          canShowActions={
            canShowActions
          }
        />
      </div>
      {
        modal && (
          <CertificateModal
            modal={modal}
            atestadoSelecionado={
              atestadoSelecionado
            }
            form={form}
            alunoSelecionado={
              alunoSelecionado
            }
            onChange={alterarCampo}
            onSave={salvar}
            onClose={fecharModal}
            onSelectAluno={
              selecionarAluno
            }
          />
        )
      }
      <CertificateDeleteDialog
        open={confirmOpen}
        atestado={
          atestadoSelecionadoDelete
        }
        onConfirm={
          confirmarExclusao
        }
        onClose={
          fecharConfirmacao
        }
      />
      <CertificateViewDialog
        open={visualizarOpen}
        atestado={
          atestadoVisualizar
        }
        onClose={
          fecharVisualizacao
        }
      />
    </section>
  );
}
export default MedicalCertificates;