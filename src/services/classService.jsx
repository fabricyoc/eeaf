import { supabase } from "../utils/supabase";
import { getCurrentUser } from "./authService";


/**
 * Busca turmas conforme permissão
 */
export async function getClasses(role) {


  // COORDENADOR E ADMIN VEEM TODAS AS TURMAS
  if (
    role === "admin" ||
    role === "coordinator"
  ) {

    const {
      data,
      error
    } = await supabase
      .from("turmas")
      .select(`
        id,
        nome,
        ano,
        turno
      `)
      .order(
        "nome"
      );


    if(error)
      throw error;


    return data || [];

  }



  // PROFESSOR BUSCA APENAS SUAS TURMAS
  if(role === "teacher") {


    const user =
      await getCurrentUser();



    const {
      data,
      error
    } = await supabase
      .from("professor_turma_disciplina")
      .select(`
        turma_id,
        turmas (
          id,
          nome,
          ano,
          turno
        )
      `)
      .eq(
        "professor_id",
        user.id
      );



    if(error)
      throw error;



    /*
      Remove duplicadas

      Um professor pode ter:
      Turma A + Matemática
      Turma A + Português

      Queremos apenas uma Turma A
    */

    const turmasUnicas =
      data
      .map(item => item.turmas)
      .filter(Boolean)
      .filter(
        (turma,index,self)=>
          index === self.findIndex(
            t=>t.id===turma.id
          )
      );


    return turmasUnicas;

  }


  return [];

}