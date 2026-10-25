export interface IUser {
  id: string;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  status: 'active' | 'suspended' | 'disabled';
}

export interface ITenantMembership {
  tenantId: string;
  tenantName: string;
  role: string;
  permissions: string[];
  status: 'active' | 'suspended' | 'inactive';
}

export interface IAuthSession {
  user: IUser;
}

export interface ILoginPayload {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface IApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}
