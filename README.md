# Employee Data Management System

A full-stack web application for managing employee data with complete CRUD (Create, Read, Update, Delete) operations. Built with React.js frontend and Node.js/Express backend with SQLite database.

## 👨‍💻 Developer
**Ithi Sujith Babu**  
📧 Email: [ithisujith@gmail.com](mailto:ithisujith@gmail.com)  
💼 Position: Full Stack Developer

## 🚀 Features

- **Add New Employees** - Simple form to add employee details
- **View All Employees** - Beautiful card-based employee display
- **Search Employees** - Real-time search by employee name
- **Delete Employees** - One-click employee removal with confirmation
- **Responsive Design** - Works perfectly on desktop and mobile devices
- **Real-time Updates** - Instant UI updates after all operations

## 🛠️ Tech Stack

### Frontend
- **React.js** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Modern styling with gradients and animations

### Backend
- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **SQLite** - Database (file-based, no setup required)
- **CORS** - Cross-origin resource sharing

## 📁 Project Structure

```
Employee Data Management/
├── backend/
│   ├── app.js                 # Main server file
│   ├── package.json           # Backend dependencies
│   └── employees.db           # SQLite database (auto-created)
└── frontend/
    ├── src/
    │   ├── App.jsx            # Main React component
    │   ├── App.css            # Styles
    │   └── main.jsx           # React entry point
    ├── index.html             # HTML template
    ├── vite.config.js         # Vite configuration
    └── package.json           # Frontend dependencies
```

## 🚀 Quick Start

### Prerequisites
- Node.js (version 14 or higher)
- npm (comes with Node.js)

### Installation & Setup

1. **Clone or download the project**
   ```bash
   # Navigate to your project directory
   cd "Employee Data Management"
   ```

2. **Setup Backend**
   ```bash
   cd backend
   npm install
   npm run dev
   ```
   Backend will start on: http://localhost:3001

3. **Setup Frontend** (Open new terminal)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   Frontend will start on: http://localhost:3000

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

## 📊 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/health` | Server health check |
| GET | `/api/employees` | Get all employees |
| POST | `/api/employees` | Create new employee |
| PUT | `/api/employees/:id` | Update employee |
| DELETE | `/api/employees/:id` | Delete employee |

### Employee Data Structure
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john.doe@company.com",
  "position": "Software Engineer",
  "createdAt": "2024-01-15T10:30:00.000Z"
}
```

## 🎯 Usage Guide

### Adding an Employee
1. Open http://localhost:3000
2. Fill in the "Add New Employee" form:
   - **Full Name**: Employee's full name
   - **Email Address**: Valid email format
   - **Job Position**: Employee's role/position
3. Click "Add Employee" button
4. See confirmation message and updated employee list

### Searching Employees
- Use the search box in the "Search Employees" section
- Type any part of an employee's name
- Results update in real-time

### Deleting an Employee
- Click the "Delete" button on any employee card
- Confirm deletion in the popup dialog
- Employee is immediately removed from the list

## 🗃️ Database

- **SQLite database** stored in `backend/employees.db`
- **Auto-created** when server starts
- **Sample data** automatically added on first run
- **Table schema**:
  ```sql
  CREATE TABLE employees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    position TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
  )
  ```

## 🎨 Features in Detail

### Frontend Features
- **Modern UI** with gradient backgrounds and smooth animations
- **Responsive grid layout** for employee cards
- **Loading states** during API calls
- **Success/error messages** for user feedback
- **Form validation** with real-time feedback
- **Search functionality** with instant results

### Backend Features
- **RESTful API** design
- **Input validation** and error handling
- **CORS enabled** for frontend communication
- **SQLite integration** with proper error handling
- **Automatic database initialization**

## 🔧 Development

### Running Tests
```bash
cd backend
npm test
```

### Building for Production
```bash
cd frontend
npm run build
```

### Production Deployment
- Frontend: Built files in `frontend/dist/`
- Backend: Run `npm start` in production

## 🐛 Troubleshooting

### Common Issues

1. **Port already in use**
   - Change ports in `backend/app.js` and `frontend/vite.config.js`

2. **CORS errors**
   - Ensure backend is running on port 3001
   - Check CORS configuration in `backend/app.js`

3. **Database errors**
   - Delete `backend/employees.db` to reset database
   - Restart backend server

4. **Frontend not connecting**
   - Verify backend is running at http://localhost:3001
   - Check browser console for network errors

### Debug Mode
Backend includes detailed console logging:
- API request/response logs
- Database operation logs
- Error details and stack traces

## 📧 Support & Contact

**Developer**: Ithi Sujith Babu  
**Email**: [ithisujith@gmail.com](mailto:ithisujith@gmail.com)  
**Project**: Employee Data Management System

For technical support, bug reports, or feature requests:
1. Check the troubleshooting section above
2. Verify all services are running properly
3. Check browser console for any error messages
4. Review backend terminal for detailed logs
5. Contact the developer with specific error details

## 📝 License

This project is for educational and portfolio purposes. Feel free to use and modify as needed.

## 👥 Contributing

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

---

**Developed with ❤️ by Ithi Sujith Babu**  
**Happy Employee Managing!** 🎉