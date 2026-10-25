import { Navigate, Outlet } from 'react-router-dom';
import { useCurrentUser } from '../features/auth/auth.queries';
import { Loader } from '../pages/common';
export default function GuestGuard() {
  const { data, isPending, isError } = useCurrentUser();

  if (isPending) return <Loader message="Checking session...." />;

  if (isError) {
    return <Loader message="Unable to verify session. Please retry." />;
  }

  if (data?.user) {
    return <Navigate to="/schools" replace />;
  }

  return <Outlet />;
}
