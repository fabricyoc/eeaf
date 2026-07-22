import { FaNotesMedical } from "react-icons/fa";

import ProfileModal from "../../ui/ProfileModal";
import StudentSearch from "../../ui/StudentSearch";

function hoje() {
  return new Date().toISOString().substring(0, 10);
}

function CertificateModal({
  modal,
  atestadoSelecionado,
  form,
  alunoSelecionado,
  onChange,
  onSave,
  onClose,
  onSelectAluno,
}) {
  if (!modal) {
    return null;
  }

  return (
    <ProfileModal
      title={
        atestadoSelecionado
          ? "Editar Atestado"
          : "Novo Atestado"
      }
      icon={<FaNotesMedical />}
      form={form}
      fields={[
        {
          name: "data_inicio",
          label: "Data inicial",
          type: "date",
          max: hoje(),
        },
        {
          name: "data_fim",
          label: "Data final",
          type: "date",
          max: hoje(),
        },
        {
          name: "turno",
          label: "Turno",
          type: "select",
          options: [
            {
              value: "",
              label: "Todos os turnos",
            },
            {
              value: "manha",
              label: "Manhã",
            },
            {
              value: "tarde",
              label: "Tarde",
            },
            {
              value: "noite",
              label: "Noite",
            },
          ],
        },
        {
          name: "observacao",
          label: "Observação",
          type: "textarea",
        },
      ]}
      onChange={onChange}
      onSave={onSave}
      onClose={onClose}
    >
      <StudentSearch
        alunoSelecionado={alunoSelecionado}
        onSelect={onSelectAluno}
      />
    </ProfileModal>
  );
}

export default CertificateModal;
