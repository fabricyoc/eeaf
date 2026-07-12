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

  // Verifica se o usuário possui
  // pelo menos uma das roles exigidas
  const permitido = roles.some(
    (requiredRole) =>
      hasRole(requiredRole)
  );

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
