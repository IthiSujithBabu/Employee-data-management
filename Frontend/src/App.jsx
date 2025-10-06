import React, { useState, useEffect } from 'react';

function App() {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch all employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const url = search 
        ? `http://localhost:3001/api/employees?search=${encodeURIComponent(search)}`
        : 'http://localhost:3001/api/employees';
      
      const response = await fetch(url);
      const data = await response.json();
      setEmployees(data);
      setMessage('');
    } catch (error) {
      console.error('Error fetching employees:', error);
      setMessage('Error loading employees');
    } finally {
      setLoading(false);
    }
  };

  // Add new employee
  const addEmployee = async (e) => {
    e.preventDefault();
    
    if (!name || !email || !position) {
      setMessage('Please fill all fields');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch('http://localhost:3001/api/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, position }),
      });

      const data = await response.json();

      if (response.ok) {
        // Clear form
        setName('');
        setEmail('');
        setPosition('');
        setMessage('✅ Employee added successfully!');
        
        // Refresh employee list
        fetchEmployees();
      } else {
        setMessage(`❌ Error: ${data.error}`);
      }
    } catch (error) {
      console.error('Error adding employee:', error);
      setMessage('❌ Network error - check if backend is running');
    } finally {
      setLoading(false);
    }
  };

  // Delete employee
  const deleteEmployee = async (id, employeeName) => {
    if (!window.confirm(`Are you sure you want to delete ${employeeName}?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/api/employees/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setMessage('✅ Employee deleted successfully!');
        fetchEmployees();
      } else {
        setMessage('❌ Error deleting employee');
      }
    } catch (error) {
      console.error('Error deleting employee:', error);
      setMessage('❌ Error deleting employee');
    }
  };

  // Load employees when component mounts or search changes
  useEffect(() => {
    fetchEmployees();
  }, [search]);

  return (
    <div className="app">
      <header className="header">
        <h1>🏢 Employee Management System</h1>
        <p>Manage your employee database easily</p>
      </header>

      {message && (
        <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}

      <main className="main-content">
        {/* Add Employee Form */}
        <section className="form-section">
          <h2>➕ Add New Employee</h2>
          <form onSubmit={addEmployee} className="employee-form">
            <div className="form-group">
              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <input
                type="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <div className="form-group">
              <input
                type="text"
                placeholder="Job Position"
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                required
                disabled={loading}
              />
            </div>
            
            <button type="submit" disabled={loading} className="submit-btn">
              {loading ? 'Adding...' : 'Add Employee'}
            </button>
          </form>
        </section>

        {/* Search Section */}
        <section className="search-section">
          <h2>🔍 Search Employees</h2>
          <input
            type="text"
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            disabled={loading}
          />
        </section>

        {/* Employees List */}
        <section className="employees-section">
          <h2>👥 Employees ({employees.length})</h2>
          
          {loading ? (
            <div className="loading">Loading employees...</div>
          ) : employees.length === 0 ? (
            <div className="no-data">
              {search ? 'No employees found matching your search.' : 'No employees yet. Add some above!'}
            </div>
          ) : (
            <div className="employees-grid">
              {employees.map((employee) => (
                <div key={employee.id} className="employee-card">
                  <div className="employee-info">
                    <h3>{employee.name}</h3>
                    <p className="email">📧 {employee.email}</p>
                    <p className="position">💼 {employee.position}</p>
                    <p className="date">
                      📅 Joined: {new Date(employee.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => deleteEmployee(employee.id, employee.name)}
                    className="delete-btn"
                    disabled={loading}
                  >
                    🗑️ Delete
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      <footer className="footer">
        <p>Backend: http://localhost:3001 | Frontend: http://localhost:3000</p>
      </footer>
    </div>
  );
}

export default App;
