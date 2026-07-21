import { BrowserRouter, Routes, Route } from "react-router-dom";

import PaginaBase from "./pages/PaginaBase";
import Home from "./pages/Home";
import Arquivos from "./pages/Arquivos";
import Eventos from "./pages/Eventos";
import Contatos from "./pages/Contatos";
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import PublicRoute from "./routes/PublicRoute";
import RoleRoute from "./routes/RoleRoutes";

import TeacherRoute from "./routes/TeacherRoute";
import Students from "./pages/Students";
import RoomMap from "./pages/RoomMap";
import Classes from "./pages/Classes";
import PendingApproval from "./pages/PendingApproval";
import RedirectByRole from "./routes/RedirectByRole";
import ManagerUsers from "./pages/ManagerUsers";
import Disciplines from "./pages/Disciplines";
import TeacherAssignments from "./pages/TeacherAssignments";
import MedicalCertificates from "./pages/MedicalCertificates";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PaginaBase />}>
          <Route index element={<Home />} />

          <Route path="arquivos" element={<Arquivos />} />
          <Route path="eventos" element={<Eventos />} />
          <Route path="eventos/:year" element={<Eventos />} />
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
            path="redirect"
            element={
              <ProtectedRoute>
                <RedirectByRole />
              </ProtectedRoute>
            }
          />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["secretary"]}>
                  <Dashboard />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="students"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["secretary"]}>
                  <Students />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="manager/users"
            element={
              <ProtectedRoute>
                <RoleRoute
                  roles={[
                    "coordinator"
                  ]}
                >
                  <ManagerUsers />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="disciplines"
            element={
              <ProtectedRoute>
                <RoleRoute
                  roles={[
                    "coordinator"
                  ]}
                >
                  <Disciplines />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/teacher/assignment"
            element={
              <ProtectedRoute>
                <RoleRoute
                  roles={[
                    "coordinator"
                  ]}
                >
                  <TeacherAssignments />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/roommap"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["teacher"]}>
                  <RoomMap />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/classes"
            element={
              <ProtectedRoute>
                <RoleRoute roles={["teacher"]}>
                  <Classes />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="/medical/certificates"
            element={
              <ProtectedRoute>
                <RoleRoute
                  roles={[
                    "secretary",
                    "teacher",
                    "coordinator",
                    "admin"
                  ]}
                >
                  <MedicalCertificates />
                </RoleRoute>
              </ProtectedRoute>
            }
          />

          <Route
            path="pending"
            element={
              <ProtectedRoute>
                <PendingApproval />
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