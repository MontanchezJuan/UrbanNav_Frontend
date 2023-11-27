export interface UserMatchRoleResponse {
  message: string;
  data: DataUser;
}

export interface DataUser {
  _id: string;
  email: string;
  password: string;
  status: number;
  created_at: string;
  twofactor_code: null;
  role: Role;
  creditCards: null;
  userProfile: null;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  status: number;
  totalPermissions: null;
}
