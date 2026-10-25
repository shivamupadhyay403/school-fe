import { useQuery } from '@tanstack/react-query';
import { authApi } from './auth.api';

export const authKeys = {
  all: ['auth'] as const,
  me: ['auth', 'me'] as const,
  memberships: ['auth', 'memberships'] as const,
};

export function useCurrentUser() {
  return useQuery({
    queryKey: authKeys.me,
    queryFn: authApi.me,
    retry: false,
    staleTime: 30_000,
  });
}

export function useMemberships(enabled = true) {
  return useQuery({
    queryKey: authKeys.memberships,
    queryFn: authApi.memberships,
    enabled,
    retry: false,
  });
}
