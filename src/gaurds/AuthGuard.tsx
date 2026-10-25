import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useCurrentUser } from '../features/auth/auth.queries';
import { Loader } from '../pages/common';

export default function AuthGuard() {
  const location = useLocation();
  const { data, isPending, isError } = useCurrentUser();

  if (isPending) {
    return <Loader message="Checking session.." />;
  }

  if (isError) {
    return <Loader message="Unable to verify session. Please retry." />;
  }

  if (!data?.user) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  if (data.user.status !== 'active') {
    return <Navigate to="/account-restricted" replace />;
  }

  return <Outlet />;
}
