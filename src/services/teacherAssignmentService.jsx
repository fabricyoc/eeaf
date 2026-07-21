import { supabase } from "../utils/supabase";



/**
 * Busca todas as alocações existentes
 */
export async function getTeacherAssignments() {


  const {
    data,
    error
  } = await supabase

    .from("professor_turma_disciplina")

    .select(`

      id,

      professor_id,

      turma_id,

      disciplina_id,


      users(
        id,
        name,
        email
      ),


      turmas(
        id,
        nome
      ),


      disciplinas(
        id,
        nome,
        codigo
      )

    `);



  if(error){

    console.error(error);

    throw error;

  }


  return data || [];

}





/**
 * Criar nova alocação
 */
export async function createTeacherAssignment(
  dados
){


  const {
    data,
    error
  } = await supabase

    .from("professor_turma_disciplina")

    .insert({

      professor_id:
        dados.professor_id,

      turma_id:
        dados.turma_id,

      disciplina_id:
        dados.disciplina_id

    })

    .select()

    .single();



  if(error){

    console.error(error);

    throw error;

  }


  return data;

}






/**
 * Excluir alocação
 */
export async function deleteTeacherAssignment(
 id
){


 const {
   error
 } = await supabase

 .from("professor_turma_disciplina")

 .delete()

 .eq(
   "id",
   id
 );



 if(error){

   throw error;

 }


}






/**
 * Buscar professores
 */
export async function getProfessors(){


 const {
   data,
   error
 } = await supabase

 .from("users")

 .select(`

    id,
    name,
    email

 `)

 .eq(
   "role",
   "teacher"
 )

 .order(
   "name"
 );



 if(error){

   throw error;

 }



 return data || [];


}







/**
 * Buscar todas as turmas
 */
export async function getTurmas(){


 const {
   data,
   error
 } = await supabase

 .from("turmas")

 .select(`

    id,
    nome

 `)

 .order(
    "nome"
 );



 if(error){

   throw error;

 }



 return data || [];


}







/**
 * Buscar disciplinas pertencentes a uma turma
 *
 * Remove disciplinas já alocadas
 */
export async function getDisciplinasDisponiveisPorTurma(
 turmaId
){


 /*
  * Busca disciplinas da turma
  */
 const {
   data: disciplinas,
   error: erroDisciplinas
 } = await supabase

 .from("turma_disciplina")

 .select(`

    disciplina_id,

    disciplinas(
       id,
       nome,
       codigo
    )

 `)

 .eq(
    "turma_id",
    turmaId
 );



 if(erroDisciplinas){

   throw erroDisciplinas;

 }



 /*
  * Busca disciplinas já associadas
  */
 const {
   data: existentes,
   error: erroExistentes
 } = await supabase

 .from("professor_turma_disciplina")

 .select(`

    disciplina_id

 `)

 .eq(
    "turma_id",
    turmaId
 );



 if(erroExistentes){

   throw erroExistentes;

 }



 const idsUsados =
   existentes.map(
      item=>item.disciplina_id
   );





 return (

   disciplinas || []

 )

 .map(
    item=>item.disciplinas
 )

 .filter(
    disciplina =>
      !idsUsados.includes(
        disciplina.id
      )
 );


}








/**
 * Buscar disciplinas já associadas a uma turma
 */
export async function getDisciplinasDaTurma(
 turmaId
){


 const {
  data,
  error
 } = await supabase

 .from("turma_disciplina")

 .select(`

    disciplinas(
      id,
      nome,
      codigo
    )

 `)

 .eq(
   "turma_id",
   turmaId
 );



 if(error){

   throw error;

 }



 return (

   data || []

 )

 .map(
    item=>item.disciplinas
 );


}
