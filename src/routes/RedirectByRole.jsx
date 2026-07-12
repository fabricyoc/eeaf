import { Navigate } from "react-router-dom";

import Loading from "../components/Loading";
import { useRole } from "../hooks/useRole";


function RedirectByRole() {

  const {
    role,
    loading,
  } = useRole();


  if (loading) {
    return <Loading />;
  }


  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  switch(role) {

    case "common":
      return (
        <Navigate
          to="/pending"
          replace
        />
      );


    case "teacher":
      return (
        <Navigate
          to="/teacher"
          replace
        />
      );


    case "coordinator":
      return (
        <Navigate
          to="/coordinator"
          replace
        />
      );


    case "admin":
      return (
        <Navigate
          to="/admin"
          replace
        />
      );


    default:
      return (
        <Navigate
          to="/pending"
          replace
        />
      );

  }

}


export default RedirectByRole;
