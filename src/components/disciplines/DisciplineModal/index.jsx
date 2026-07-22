import {
  FaBook
} from "react-icons/fa";

import ProfileModal from "../../ui/ProfileModal";


const fields = [
  {
    name: "nome",
    label: "Nome"
  },

  {
    name: "codigo",
    label: "Código"
  }
];


function DisciplineModal({

  open,

  disciplina,

  form = {},

  onChange,

  onSave,

  onClose

}) {


  if (!open) {
    return null;
  }


  return (

    <ProfileModal

      title={
        disciplina
          ? "Editar Disciplina"
          : "Nova Disciplina"
      }


      icon={
        <FaBook />
      }


      form={
        form
      }


      fields={
        fields
      }


      onChange={
        onChange
      }


      onSave={
        onSave
      }


      onClose={
        onClose
      }

    />

  );

}


export default DisciplineModal;
