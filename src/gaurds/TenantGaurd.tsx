import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useCurrentUser, useMemberships } from '../features/auth/auth.queries';
import { Loader } from '../pages/common';
export default function TenantGuard() {
  const { tenantId } = useParams();
  const { data: session, isPending: authPending } = useCurrentUser();

  const {
    data: memberships,
    isPending: membershipsPending,
    isError,
  } = useMemberships(Boolean(session?.user));

  if (authPending || membershipsPending) {
    return <Loader message="Loading school access.." />;
  }

  if (!session?.user) {
    return <Navigate to="/login" replace />;
  }

  if (isError) {
    return <Loader message="Unable to verify school membership." />;
  }

  if (!tenantId) {
    return <Navigate to="/schools" replace />;
  }

  const membership = memberships?.find((item) => item.tenantId === tenantId);

  if (!membership || membership.status !== 'active') {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
