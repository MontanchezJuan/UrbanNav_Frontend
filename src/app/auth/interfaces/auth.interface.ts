import { User } from '../../shared/interfaces/ms-security/users.interface';

export interface AuthResponse {
  message: string;
  data: User;
}

export interface DataLogin {
  email: string;
  password: string;
}

export interface DataToken {
  message: string;
  data: string;
}
