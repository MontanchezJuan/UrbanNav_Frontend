export interface Response {
  message: string;
  data: User;
}

export interface User {
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

export interface DataLogin {
  email: string;
  password: string;
}

export interface DataToken {
  message: string;
  data: string;
}
