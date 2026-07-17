import {
  useEffect,
  useState
} from "react";


import {
  getUsers
} from "../services/userService";



export function useUsers(){

  const [
    users,
    setUsers
  ] = useState([]);


  const [
    loading,
    setLoading
  ] = useState(true);



  async function carregarUsers(){

    try{

      setLoading(true);


      const data =
        await getUsers();


      setUsers(data);


    }catch(error){

      console.error(error);

      setUsers([]);

    }
    finally{

      setLoading(false);

    }

  }



  useEffect(()=>{

    carregarUsers();

  },[]);



  return {

    users,

    loading,

    carregarUsers

  };

}
