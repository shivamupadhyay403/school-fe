import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Suspense } from 'react';
// import AuthGuard from "../src/gaurds/AuthGuard";
import GuestGuard from '../src/gaurds/GuestGuard';
// import TenantGuard from "../src/gaurds/TenantGaurd";
// import RoleGuard from "../src/gaurds/RoleGuard";
// import PermissionGuard from "../src/gaurds/PermissionGuard";
import { NotFound, Forbidden, Loader } from './pages/common';
import PublicRoutes from './routes/public/PublicRoutes';
export default function AppRoutes() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* Public-only pages */}
          <Route element={<GuestGuard />}>
            {PublicRoutes.map(({ name, path, component: Component }) => (
              <Route key={name} path={path} element={<Component />} />
            ))}
          </Route>

          {/* Authenticated pages */}
          {/* <Route element={<AuthGuard />}>
          <Route path="/schools" element={<Schools />} />


          <Route
            path="/schools/:tenantId"
            element={<TenantGuard />}
          >
            <Route path="dashboard" element={<Dashboard />} />

            Requires students.read
            <Route element={<PermissionGuard requiredPermissions={["students.read"]} />}>
              <Route path="students" element={<Students />} />
            </Route>

             Requires an administrator role 
            <Route element={<RoleGuard allowedRoles={["admin"]} />}>
              <Route path="settings" element={<SchoolSettings />} />
            </Route>
          </Route>
        </Route> */}

          <Route path="/forbidden" element={<Forbidden />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}
