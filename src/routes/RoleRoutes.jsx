import { Navigate } from "react-router-dom";

import Loading from "../components/Loading";
import { useRole } from "../hooks/useRole";

function RoleRoute({
  children,
  roles = [],
}) {

  const {
    loading,
    role,
    hasRole,
  } = useRole();


  if (loading) {
    return <Loading />;
  }


  // Usuário não autenticado
  if (!role) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }


  // console.log(
  //   "Role atual:",
  //   role,
  //   "Permitido:",
  //   roles
  // );


  const permitido = roles.some(
    (requiredRole) =>
      hasRole(requiredRole)
  );


  // Usuário comum sem permissão
  if (
    role === "common" &&
    !permitido
  ) {
    return (
      <Navigate
        to="/pending"
        replace
      />
    );
  }


  // Usuário autenticado,
  // mas sem autorização
  if (!permitido) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }


  return children;
}


export default RoleRoute;
