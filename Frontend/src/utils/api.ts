import axios from 'axios';
import { Employee, CreateEmployeeRequest, UpdateEmployeeRequest } from '../types/Employee';

const API_BASE_URL = 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const employeeApi = {
  getAllEmployees: (search?: string): Promise<Employee[]> =>
    api.get(`/employees${search ? `?search=${encodeURIComponent(search)}` : ''}`).then(res => res.data),

  getEmployeeById: (id: number): Promise<Employee> =>
    api.get(`/employees/${id}`).then(res => res.data),

  createEmployee: (data: CreateEmployeeRequest): Promise<Employee> =>
    api.post('/employees', data).then(res => res.data),

  updateEmployee: (id: number, data: UpdateEmployeeRequest): Promise<Employee> =>
    api.put(`/employees/${id}`, data).then(res => res.data),

  deleteEmployee: (id: number): Promise<void> =>
    api.delete(`/employees/${id}`),
};