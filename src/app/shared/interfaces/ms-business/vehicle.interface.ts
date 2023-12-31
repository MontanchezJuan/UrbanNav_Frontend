// Generated by https://quicktype.io

import { Driver } from './drivers.interface';

export interface VehicleResponse {
  mensaje: string;
  data: Data;
}

export interface VehicleResponseOne {
  mensaje: string;
  data: Vehicle;
}

export interface Data {
  meta: Meta;
  data: Vehicle[];
}

export interface Vehicle {
  id: number;
  driver_id: number;
  license_plate: string;
  model: string;
  capacity: number;
  color: string;
  velocity: number;
  status: number;
  created_at: string;
  updated_at: string;
  driver: Driver;
}

export interface VehicleData {
  driver_id: number;
  license_plate: string;
  model: string;
  capacity: number;
  color: string;
  velocity: number;
  status: number;
  driver: Driver;
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
