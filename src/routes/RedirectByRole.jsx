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

  switch (role) {

    case "common":

      return (
        <Navigate
          to="/pending"
          replace
        />
      );

    case "secretary":

    case "teacher":

    case "coordinator":

    case "admin":

      return (
        <Navigate
          to="/dashboard"
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
