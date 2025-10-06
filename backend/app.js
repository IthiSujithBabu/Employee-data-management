const express = require('express');
const cors = require('cors');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite Database
const db = new sqlite3.Database('./employees.db', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
    
    // Create employees table
    db.run(`
      CREATE TABLE IF NOT EXISTS employees (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        position TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating table:', err.message);
      } else {
        console.log('✅ Employees table ready');
        
        // Add sample data if table is empty
        db.get('SELECT COUNT(*) as count FROM employees', (err, row) => {
          if (row.count === 0) {
            console.log('Adding sample employees...');
            const sampleEmployees = [
              ['John Doe', 'john.doe@company.com', 'Software Engineer'],
              ['Jane Smith', 'jane.smith@company.com', 'Product Manager'],
              ['Mike Johnson', 'mike.johnson@company.com', 'Designer']
            ];
            
            sampleEmployees.forEach((emp) => {
              db.run('INSERT INTO employees (name, email, position) VALUES (?, ?, ?)', emp);
            });
            console.log('✅ Sample employees added');
          }
        });
      }
    });
  }
});

// Routes

// GET all employees
app.get('/api/employees', (req, res) => {
  const { search } = req.query;
  let query = 'SELECT * FROM employees';
  const params = [];

  if (search) {
    query += ' WHERE name LIKE ?';
    params.push(`%${search}%`);
  }

  query += ' ORDER BY createdAt DESC';

  console.log('Fetching employees...');
  db.all(query, params, (err, rows) => {
    if (err) {
      console.error('Error fetching employees:', err);
      res.status(500).json({ error: 'Failed to fetch employees' });
    } else {
      console.log(`Found ${rows.length} employees`);
      res.json(rows);
    }
  });
});

// CREATE new employee
app.post('/api/employees', (req, res) => {
  console.log('📨 POST /api/employees - Received:', req.body);
  
  const { name, email, position } = req.body;

  // Validation
  if (!name || !email || !position) {
    console.log('❌ Missing fields');
    return res.status(400).json({ error: 'Name, email, and position are required' });
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    console.log('❌ Invalid email:', email);
    return res.status(400).json({ error: 'Invalid email format' });
  }

  console.log('✅ Valid data, inserting into database...');
  
  db.run(
    'INSERT INTO employees (name, email, position) VALUES (?, ?, ?)',
    [name, email, position],
    function(err) {
      if (err) {
        console.error('❌ Database error:', err.message);
        if (err.message.includes('UNIQUE constraint failed')) {
          res.status(400).json({ error: 'Email already exists' });
        } else {
          res.status(500).json({ error: 'Failed to create employee: ' + err.message });
        }
      } else {
        console.log('✅ Employee inserted with ID:', this.lastID);
        
        // Return the newly created employee
        db.get('SELECT * FROM employees WHERE id = ?', [this.lastID], (err, row) => {
          if (err) {
            console.error('Error fetching new employee:', err);
            res.status(500).json({ error: 'Employee created but failed to fetch details' });
          } else {
            console.log('✅ Employee created successfully:', row);
            res.status(201).json(row);
          }
        });
      }
    }
  );
});

// UPDATE employee
app.put('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  const { name, email, position } = req.body;

  console.log(`📝 PUT /api/employees/${id} - Updating:`, { name, email, position });

  db.run(
    'UPDATE employees SET name = ?, email = ?, position = ? WHERE id = ?',
    [name, email, position, id],
    function(err) {
      if (err) {
        console.error('Error updating employee:', err);
        res.status(500).json({ error: 'Failed to update employee' });
      } else if (this.changes === 0) {
        res.status(404).json({ error: 'Employee not found' });
      } else {
        console.log('✅ Employee updated successfully');
        db.get('SELECT * FROM employees WHERE id = ?', [id], (err, row) => {
          if (err) {
            res.status(500).json({ error: 'Employee updated but failed to fetch details' });
          } else {
            res.json(row);
          }
        });
      }
    }
  );
});

// DELETE employee
app.delete('/api/employees/:id', (req, res) => {
  const { id } = req.params;
  console.log(`🗑️ DELETE /api/employees/${id}`);

  db.run('DELETE FROM employees WHERE id = ?', [id], function(err) {
    if (err) {
      console.error('Error deleting employee:', err);
      res.status(500).json({ error: 'Failed to delete employee' });
    } else if (this.changes === 0) {
      res.status(404).json({ error: 'Employee not found' });
    } else {
      console.log('✅ Employee deleted successfully');
      res.status(204).send();
    }
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    message: 'Employee API is running'
  });
});

// Test endpoint
app.get('/test', (req, res) => {
  res.json({ 
    message: 'Backend is working!',
    endpoints: [
      'GET /health',
      'GET /api/employees',
      'POST /api/employees',
      'PUT /api/employees/:id',
      'DELETE /api/employees/:id'
    ]
  });
});

// Start server
app.listen(PORT, () => {
  console.log('🚀 Employee Management Backend');
  console.log('================================');
  console.log(`📍 Port: ${PORT}`);
  console.log(`📊 API: http://localhost:${PORT}/api/employees`);
  console.log(`❤️  Health: http://localhost:${PORT}/health`);
  console.log(`🧪 Test: http://localhost:${PORT}/test`);
  console.log('================================');
});
