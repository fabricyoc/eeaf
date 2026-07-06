import {
  useState
} from "react";

import {
  useTurmas
} from "../../hooks/useTurmas";

import {
  createAluno
} from "../../services/studentService";


import styles from "./StudentForm.module.css";


function StudentForm({
  onClose,
  onSuccess
}) {


  const {
    turmas,
    loading
  } = useTurmas();



  const [form,setForm] =
    useState({

      matricula:"",
      nome:"",
      email:"",
      foto_id:"",
      turma_id:"",
      posicao:""

    });



  function handleChange(e){

    setForm({

      ...form,

      [e.target.name]:
        e.target.value

    });

  }



  async function handleSubmit(e){

    e.preventDefault();


    try{


      await createAluno({

        ...form,

        posicao:
          form.posicao || null

      });


      alert(
        "Aluno cadastrado!"
      );


      onSuccess();


      onClose();


    }catch(error){

      alert(
        "Erro ao cadastrar aluno"
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
            turmas.map(turma=>(

              <option
                key={turma.id}
                value={turma.id}
              >

                {turma.nome.toUpperCase()}

              </option>

            ))
          }


        </select>



        <input
          name="posicao"
          placeholder="Posição inicial (ex: 11)"
          value={form.posicao}
          onChange={handleChange}
        />



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