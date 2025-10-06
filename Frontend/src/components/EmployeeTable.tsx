import React from 'react';
import { Employee } from '../types/Employee';

interface EmployeeTableProps {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
  isLoading?: boolean;
}

const EmployeeTable: React.FC<EmployeeTableProps> = ({
  employees,
  onEdit,
  onDelete,
  isLoading = false,
}) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return <div className="loading">Loading employees...</div>;
  }

  if (employees.length === 0) {
    return <div className="no-data">No employees found.</div>;
  }

  return (
    <div className="employee-table-container">
      <table className="employee-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Position</th>
            <th>Created</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.position}</td>
              <td>{formatDate(employee.createdAt)}</td>
              <td className="actions">
                <button
                  onClick={() => onEdit(employee)}
                  className="edit-btn"
                  title="Edit employee"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(employee.id)}
                  className="delete-btn"
                  title="Delete employee"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;