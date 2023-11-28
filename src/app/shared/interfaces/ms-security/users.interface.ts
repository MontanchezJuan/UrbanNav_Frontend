import { UserProfile } from './users-profile.interface';

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
  totalPermissions: null | TotalPermission[];
}

export interface MatchProfileResponse {
  message: string;
  data: Data;
}

export interface Data {
  _id: string;
  email: string;
  password: string;
  status: number;
  created_at: string;
  twofactor_code: null;
  role: Role;
  creditCards: null;
  userProfile: UserProfile;
}

export interface TotalPermission {
  _id: string;
  route: string;
  method: string;
  description: string;
  status: number;
}
