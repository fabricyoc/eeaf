import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaBase from "./pages/PaginaBase";
import Home from "./pages/Home";
import Arquivos from "./pages/Arquivos";
import Eventos from "./pages/Eventos";
import Contatos from "./pages/Contatos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Dashboard from "./pages/Dashboard";

import TeacherDashboard from "./pages/TeacherDashboard";
// import AdminDashboard from "./pages/AdminDashboard";
import PageNotFound from "./pages/PageNotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import RoleRoute from "./routes/RoleRoutes";

import TeacherRoute from "./routes/TeacherRoute";
import TeacherStudents from "./pages/TeacherStudents";
import TeacherClassroom from "./pages/TeacherClassroom";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={<Home />} />

          <Route path="arquivos" element={<Arquivos />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="contatos" element={<Contatos />} />

          <Route
            path="login"
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            }
          />

          <Route
            path="cadastro"
            element={
              <PublicRoute>
                <Cadastro />
              </PublicRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["common"]}>
                  <Dashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="teacher"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["teacher"]}>
                  <TeacherDashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="teacher/students"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["teacher"]}>
                  <TeacherStudents />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="teacher/maps"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["teacher"]}>
                  <TeacherClassroom />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<PageNotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;