import {
  useEffect,
  useState
} from "react";

import {
  supabase
} from "../utils/supabase";



const hierarchy = {

  common: 0,

  secretary: 1,

  teacher: 2,

  coordinator: 3,

  admin: 4,

};




export function useRole() {


  const [
    role,
    setRole
  ] = useState(null);



  const [
    loading,
    setLoading
  ] = useState(true);



  const [
    error,
    setError
  ] = useState(null);







  useEffect(() => {


    async function carregarRole() {


      try {


        setLoading(true);



        const {

          data: {
            user

          },

          error

        } = await supabase.auth.getUser();




        if (error)
          throw error;





        if (!user) {

          setRole(null);

          return;

        }






        const {

          data,

          error: userError

        } = await supabase

          .from("users")

          .select("role")

          .eq(
            "id",
            user.id
          )

          .single();





        if (userError)
          throw userError;





        setRole(
          data.role
        );




      } catch (err) {


        console.error(
          "Erro role:",
          err
        );


        setError(err);

        setRole(null);



      } finally {


        setLoading(false);


      }


    }




    carregarRole();


  }, []);









  /*
    Compatibilidade com RoleRoute
  */

  function hasRole(requiredRole) {


    if (!role)
      return false;



    return (

      hierarchy[role] >=
      hierarchy[requiredRole]

    );


  }









  /*
    Controle de alteração de usuários
  */

  function canChangeRole(targetRole) {



    // ADMIN pode tudo

    if (role === "admin") {

      return true;

    }





    // COORDENADOR até coordenador

    if (role === "coordinator") {


      return [

        "common",

        "secretary",

        "teacher",

        "coordinator"

      ].includes(targetRole);


    }





    // professor e secretário não alteram

    return false;


  }









  return {


    role,


    loading,


    error,



    hasRole,



    canChangeRole,





    /*
      Identificação
    */


    isAdmin:

      role === "admin",



    isCoordinator:

      role === "coordinator",



    isSecretary:

      role === "secretary",



    isTeacher:

      role === "teacher",







    /*
      Acessos
    */



    // Alunos
    canAccessStudents:

      [

        "secretary",

        "teacher",

        "coordinator",

        "admin"

      ].includes(role),







    // Atestados
    canAccessCertificates:

      [

        "secretary",

        "coordinator",

        "admin"

      ].includes(role),







    // Área professor
    canAccessTeacher:

      [

        "teacher",

        "coordinator",

        "admin"

      ].includes(role),







    // Área secretário
    canAccessSecretary:

      [

        "secretary",

        "admin"

      ].includes(role),







    // Coordenação
    canAccessCoordinator:

      [

        "coordinator",

        "admin"

      ].includes(role),







    // Admin
    canAccessAdmin:

      role === "admin",







    /*
      Ações
    */



    // cadastrar alunos

    canCreateStudents:

      [

        "secretary",

        "coordinator",

        "admin"

      ].includes(role),







    // editar alunos

    canEditStudents:

      [

        "secretary",

        "teacher",

        "coordinator",

        "admin"

      ].includes(role),







    // excluir alunos

    canDeleteStudents:

      [

        "coordinator",

        "admin"

      ].includes(role),







    /*
  Ações de atestados
*/

    canCreateCertificates:

      [
        "secretary",
        "coordinator",
        "admin"
      ].includes(role),



    canEditCertificates:

      [
        "secretary",
        "coordinator",
        "admin"
      ].includes(role),



    canDeleteCertificates:

      [
        "secretary",
        "coordinator",
        "admin"
      ].includes(role),



    canViewCertificates:

      [
        "secretary",
        "teacher",
        "coordinator",
        "admin"
      ].includes(role),

  };


}