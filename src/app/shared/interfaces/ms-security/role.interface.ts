import { Permission } from './permission.interface';

export interface RoleResponse {
  message: string;
  data: Role[];
}

export interface RoleResponseOne {
  message: string;
  data: Role;
}

export interface Role {
  _id: string;
  name: string;
  description: string;
  status: number;
  totalPermissions: null | Permission[];
}
export interface DataRole {
  name: string;
  description: string;
  status: number;
}
