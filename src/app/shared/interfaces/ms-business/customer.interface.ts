import { User } from '../ms-security/users.interface';

export interface CustomerResponse {
  mensaje: string;
  data: Data;
}

export interface CustomerResponseOne {
  mensaje: string;
  data: Customer;
}

export interface Data {
  meta: Meta;
  data: Customer[];
}

export interface Customer {
  id: number;
  user_id: string;
  status: number;
  created_at: string;
  updated_at: string;
  user: User;
  contacts: Contact[];
  services: any[];
}

export interface CustomerData {
  user_id: string;
  status: number;
}

export interface Contact {
  id: number;
  customer_id: number;
  name: string;
  email: string;
  phone_number: string;
  is_emergy_contact: number;
  status: number;
  created_at: string;
  updated_at: string;
}

export interface Meta {
  total: number;
  per_page: number;
  current_page: number;
  last_page: number;
  first_page: number;
  first_page_url: string;
  last_page_url: string;
  next_page_url: null;
  previous_page_url: null;
}
