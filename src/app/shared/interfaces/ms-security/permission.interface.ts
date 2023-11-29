export interface Permission {
  _id: string;
  route: string;
  method: string;
  description: string;
  status: number;
}
export interface DataPermission {
  route: string;
  method: string;
  description: string;
  status: number;
}
export interface PermissionResponse {
  message: string;
  data: Permission[];
}

export interface PermissionResponseOne {
  message: string;
  data: Permission;
}
