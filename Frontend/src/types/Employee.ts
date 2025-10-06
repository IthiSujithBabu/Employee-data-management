export interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmployeeRequest {
  name: string;
  email: string;
  position: string;
}

export interface UpdateEmployeeRequest {
  name?: string;
  email?: string;
  position?: string;
}