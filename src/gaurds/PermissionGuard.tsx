import { Navigate, Outlet, useParams } from 'react-router-dom';
import { useMemberships } from '../features/auth/auth.queries';
import { Loader } from '../pages/common';
interface PermissionGuardProps {
  requiredPermissions: string[];
  requireAll?: boolean;
}

export default function PermissionGuard({
  requiredPermissions,
  requireAll = true,
}: PermissionGuardProps) {
  const { tenantId } = useParams();
  const { data, isPending, isError } = useMemberships();

  if (isPending) return <Loader message="Checking permissions..." />;
  if (isError) return <Loader message="Unable to verify permissions." />;

  const membership = data?.find((item) => item.tenantId === tenantId && item.status === 'active');

  if (!membership) {
    return <Navigate to="/forbidden" replace />;
  }

  const allowed = requireAll
    ? requiredPermissions.every((permission) => membership.permissions.includes(permission))
    : requiredPermissions.some((permission) => membership.permissions.includes(permission));

  if (!allowed) {
    return <Navigate to="/forbidden" replace />;
  }

  return <Outlet />;
}
