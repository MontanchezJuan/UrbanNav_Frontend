import { UserProfile } from './users-profile.interface';
import { Role } from './role.interface';
import { CreditCard } from './credit-card.interface';

export interface UserResponse {
  message: string;
  data: User[];
}

export interface UserResponseOne {
  message: string;
  data: User;
}

export interface UserData {
  email: string;
  password: string;
  status?: number;
  created_at?: string;
  twofactor_code?: null;
  role?: Role;
  creditCards?: CreditCard | null;
  userProfile?: UserProfile | null;
}

export interface User {
  _id: string;
  email: string;
  password: string;
  status: number;
  created_at: string;
  twofactor_code: null;
  role: Role;
  creditCards: CreditCard | null;
  userProfile: UserProfile | null;
}
