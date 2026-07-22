import { toast } from "react-toastify";

export function useAtestadoActions({
  form,
  atestadoSelecionado,
  salvarAtestado,
  excluirAtestado,
  fecharModal,
  canCreateCertificates,
}) {
  async function salvar() {
    if (!canCreateCertificates) {
      toast.error(
        "Você não possui permissão para cadastrar atestados."
      );

      return false;
    }

    if (
      !form.aluno_id ||
      !form.data_inicio ||
      !form.data_fim
    ) {
      toast.warning(
        "Informe aluno e período do atestado."
      );

      return false;
    }

    if (form.data_fim < form.data_inicio) {
      toast.warning(
        "A data final não pode ser anterior à data inicial."
      );

      return false;
    }

    try {
      await salvarAtestado({
        ...form,
        id: atestadoSelecionado?.id,
      });

      toast.success(
        atestadoSelecionado
          ? "Atestado atualizado!"
          : "Atestado cadastrado!"
      );

      fecharModal();

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Erro ao salvar atestado");

      return false;
    }
  }

  async function excluir(atestado) {
    try {
      await excluirAtestado(atestado.id);

      toast.success("Atestado removido!");

      return true;
    } catch (error) {
      console.error(error);

      toast.error("Erro ao excluir atestado");

      return false;
    }
  }

  return {
    salvar,
    excluir,
  };
}