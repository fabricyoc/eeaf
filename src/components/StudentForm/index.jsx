import {
  useState
} from "react";

import {
  useTurmas
} from "../../hooks/useTurmas";

import {
  createAluno, getUltimaPosicaoDisponivel
} from "../../services/studentService";

import { toast } from "react-toastify";
import styles from "./StudentForm.module.css";


function StudentForm({
  onClose,
  onSuccess
}) {


  const {
    turmas,
    loading
  } = useTurmas();



  const [form, setForm] =
    useState({

      matricula: "",
      nome: "",
      email: "",
      foto_id: "",
      turma_id: ""
    });



  function handleChange(e) {

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  }


  async function handleSubmit(e) {
    e.preventDefault();

    try {

      const posicao =
        await getUltimaPosicaoDisponivel(
          form.turma_id
        );


      if (!posicao) {

        toast.error(
          "Essa turma não possui lugares disponíveis."
        );

        return;

      }


      await createAluno({

        ...form,

        posicao

      });


      toast.success(
        "Aluno cadastrado com sucesso!"
      );


      onSuccess();

      onClose();


    } catch (error) {

      console.error(
        "Erro ao cadastrar aluno:",
        error
      );


      toast.error(
        "Erro ao cadastrar aluno."
      );

    }
  }



  return (

    <div className={styles.overlay}>

      <form
        className={styles.form}
        onSubmit={handleSubmit}
      >

        <h2>
          Novo Aluno
        </h2>


        <input
          name="matricula"
          placeholder="Matrícula"
          value={form.matricula}
          onChange={handleChange}
          required
        />


        <input
          name="nome"
          placeholder="Nome completo"
          value={form.nome}
          onChange={handleChange}
          required
        />


        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />


        <input
          name="foto_id"
          placeholder="ID da foto Google Drive"
          value={form.foto_id}
          onChange={handleChange}
        />



        <select
          name="turma_id"
          value={form.turma_id}
          onChange={handleChange}
          required
        >

          <option value="">
            Selecione a turma
          </option>


          {
            !loading &&
            turmas.map(turma => (

              <option
                key={turma.id}
                value={turma.id}
              >

                {turma.nome.toUpperCase()}

              </option>

            ))
          }


        </select>






        <div className={styles.actions}>


          <button
            type="button"
            onClick={onClose}
          >
            Cancelar
          </button>


          <button
            type="submit"
          >
            Salvar
          </button>


        </div>


      </form>

    </div>

  );

}


export default StudentForm;