import React, { useState, useEffect } from 'react';
import './App.css';

interface Employee {
  id: number;
  name: string;
  email: string;
  position: string;
  createdAt: string;
}

function App() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [search, setSearch] = useState('');

  // Test backend connection first
  const testBackend = async () => {
    try {
      const response = await fetch('http://localhost:3001/health');
      const data = await response.json();
      console.log('Backend health check:', data);
      return true;
    } catch (error) {
      console.error('Backend connection failed:', error);
      return false;
    }
  };

  // Fetch employees from backend
  const fetchEmployees = async () => {
    try {
      const url = `http://localhost:3001/api/employees${search ? `?search=${search}` : ''}`;
      console.log('Fetching from:', url);
      
      const response = await fetch(url);
      const data = await response.json();
      setEmployees(data);
      console.log('Employees loaded:', data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      alert('Cannot connect to backend. Make sure the backend server is running on port 3001.');
    }
  };

  // Add new employee
  const addEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !position) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, position }),
      });
      
      if (response.ok) {
        const newEmployee = await response.json();
        console.log('Employee added:', newEmployee);
        
        // Clear form
        setName('');
        setEmail('');
        setPosition('');
        
        // Refresh list
        fetchEmployees();
        alert('Employee added successfully!');
      } else {
        const errorData = await response.json();
        alert(`Error: ${errorData.error}`);
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('Network error. Check if backend is running on http://localhost:3001');
    }
  };

  // Delete employee
  const deleteEmployee = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
          method: 'DELETE',
        });
        
        if (response.ok) {
          fetchEmployees();
          alert('Employee deleted successfully!');
        }
      } catch (error) {
        console.error('Error deleting employee:', error);
        alert('Error deleting employee');
      }
    }
  };

  // Load employees on component mount
  useEffect(() => {
    testBackend();
    fetchEmployees();
  }, [search]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>Employee Data Management</h1>
        <div style={{background: '#e8f5e8', padding: '10px', borderRadius: '5px', margin: '10px 0'}}>
          <p>✅ Frontend: http://localhost:3000</p>
          <p>🔧 Backend: http://localhost:3001</p>
          <p>📊 API: http://localhost:3001/api/employees</p>
        </div>
      </header>

      <main className="app-main">
        {/* Add Employee Form */}
        <section className="form-section">
          <h2>Add New Employee</h2>
          <form onSubmit={addEmployee} className="employee-form">
            <input
              type="text"
              placeholder="Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Email *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Position *"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              required
            />
            <button type="submit">Add Employee</button>
          </form>
        </section>

        {/* Search Bar */}
        <section className="search-section">
          <input
            type="text"
            placeholder="Search employees by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
          />
        </section>

        {/* Employees Table */}
        <section className="employees-section">
          <h2>Employees ({employees.length})</h2>
          {employees.length === 0 ? (
            <p>No employees found. Add some employees above!</p>
          ) : (
            <table className="employees-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Position</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee.id}>
                    <td>{employee.id}</td>
                    <td>{employee.name}</td>
                    <td>{employee.email}</td>
                    <td>{employee.position}</td>
                    <td>
                      <button 
                        className="delete-btn"
                        onClick={() => deleteEmployee(employee.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;