import {
  FaUserTie
} from "react-icons/fa";

import ProfileModal from "../../ui/ProfileModal";


function TeacherAssignmentModal({

  open,

  form,

  users = [],

  turmas = [],

  disciplinas = [],

  onChange,

  onSave,

  onClose

}) {


  if (!open) {

    return null;

  }



  return (

    <ProfileModal

      title="Alocar Professor"

      icon={
        <FaUserTie />
      }

      form={form}


      fields={[


        {
          name:"professor_id",

          label:"Professor",

          type:"select",

          options:[

            {
              value:"",
              label:"Selecione um professor",
              disabled:true
            },


            ...users

              .filter(
                user =>
                  user.role === "teacher"
              )

              .map(
                user => ({

                  value:user.id,

                  label:user.name

                })
              )

          ]

        },




        {
          name:"turma_id",

          label:"Turma",

          type:"select",

          options:[

            {
              value:"",
              label:"Selecione uma turma",
              disabled:true
            },


            ...turmas.map(
              turma => ({

                value:turma.id,

                label:
                  turma.nome.toUpperCase()

              })
            )

          ]

        },





        {
          name:"disciplina_id",

          label:"Disciplina",

          type:"select",

          options:[

            {
              value:"",
              label:"Selecione uma disciplina",
              disabled:true
            },


            ...disciplinas.map(
              disciplina => ({

                value:disciplina.id,

                label:disciplina.nome

              })
            )

          ]

        }


      ]}


      onChange={onChange}

      onSave={onSave}

      onClose={onClose}

      saveText="Salvar alocação"

    />

  );

}


export default TeacherAssignmentModal;