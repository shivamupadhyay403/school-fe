import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { queryClient } from '../../query-client';
import { revokeSession } from '../../lib/axios';
import { authApi } from './auth.api';
import { authKeys } from './auth.queries';
import type { ILoginPayload } from './auth.types';

export function useLogin() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (payload: ILoginPayload) => authApi.login(payload),

    onSuccess: (session) => {
      queryClient.setQueryData(authKeys.me, session);
      queryClient.removeQueries({
        queryKey: authKeys.memberships,
      });

      navigate('/schools', { replace: true });
    },
  });
}

export function useLogout() {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      try {
        await revokeSession();
      } finally {
        // Clear local state even if the server is unreachable.
        await queryClient.cancelQueries();
        queryClient.clear();
      }
    },

    onSettled: () => {
      navigate('/login', { replace: true });
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: authApi.register,
  });
}
