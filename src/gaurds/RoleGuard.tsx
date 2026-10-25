import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useMemberships } from '../features/auth/auth.queries';
import { Loader } from '../pages/common';
interface RoleGuardProps {
  allowedRoles: string[];
}

export default function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { tenantId } = useParams();
  const { data, isPending, isError } = useMemberships();

  if (isPending) return <Loader message="Checking role..." />;
  if (isError) return <Loader message="Unable to verify role." />;

  const membership = data?.find((item) => item.tenantId === tenantId);

  if (!membership || !allowedRoles.includes(membership.role)) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
