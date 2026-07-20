import {
  useEffect,
  useState
} from "react";

import {
  getClasses
} from "../services/classService";

import {
  useRole
} from "./useRole";


export function useClasses(){


  const {
    role
  } = useRole();



  const [
    classes,
    setClasses
  ] = useState([]);



  const [
    loading,
    setLoading
  ] = useState(true);



  const [
    error,
    setError
  ] = useState(null);



  async function carregarClasses(){


    try{

      setLoading(true);


      const resultado =
        await getClasses(role);


      setClasses(resultado);


    }catch(err){

      console.error(err);

      setError(err);

    }finally{

      setLoading(false);

    }

  }



  useEffect(()=>{


    if(role){

      carregarClasses();

    }


  },[role]);



  return {

    classes,

    loading,

    error,

    carregarClasses

  };


}