# HR Management System

A comprehensive, production-ready HR Management Dashboard built with Node.js, Express, MongoDB, and EJS..

![HR Management System](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-brightgreen)
![EJS](https://img.shields.io/badge/Templating-EJS-blue)
![Bootstrap](https://img.shields.io/badge/UI-Bootstrap%205-purple)

## 🚀 Features

### Core Modules
- **Employee Management** - Complete CRUD operations for employee records
- **Attendance Tracking** - Daily attendance with check-in/check-out times
- **Leave Management** - Apply, approve, and track leave requests
- **Payroll System** - Automatic salary calculations with tax and deductions
- **Reports & Analytics** - Comprehensive HR statistics and insights

### Key Capabilities
✅ Real-time dashboard with interactive charts  
✅ Responsive design (mobile, tablet, desktop)  
✅ Activity logging for audit trails  
✅ AJAX-powered interactions  
✅ Bootstrap 5 UI components  
✅ Chart.js data visualizations  

## 📋 Tech Stack

| Component | Technology |
|-----------|-----------|
| **Backend** | Node.js, Express.js |
| **Database** | MongoDB (Local/Atlas) |
| **Templating** | EJS |
| **UI Framework** | Bootstrap 5 |
| **Charts** | Chart.js |
| **Icons** | Font Awesome |
| **Architecture** | MVC Pattern |

## 🛠️ Installation

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)

### 1. Clone Repository
```bash
git clone <your-repository-url>
cd HRmange
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Create `.env` file in the root directory:

**For Local MongoDB:**
```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hr_dashboard
NODE_ENV=production
```

**For MongoDB Atlas:**
```env
PORT=3000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/hr_dashboard?retryWrites=true&w=majority
NODE_ENV=production
```

### 4. Initialize Database
```bash
npm run seed
```

This populates your database with sample data:
- 12 employees across 5 departments
- Today's attendance records
- Leave requests with various statuses
- Upcoming holidays
- Recent activities

### 5. Start Application

**Development Mode:**
```bash
npm run dev
```

**Production Mode:**
```bash
npm start
```

Visit: **http://localhost:3000/dashboard**

## 📊 Application Structure.

```
HRmange/
├── app.js                 # Main application entry point
├── config/
│   └── db.js             # Database connection configuration
├── controllers/
│   └── dashboardController.js  # Route handlers and business logic
├── models/
│   ├── Employee.js       # Employee schema
│   ├── Attendance.js     # Attendance schema
│   ├── Leave.js          # Leave schema
│   ├── Holiday.js        # Holiday schema
│   └── Activity.js       # Activity schema
├── routes/
│   └── dashboardRoutes.js    # API routes
├── views/
│   ├── layout/
│   │   └── layout.ejs    # Main layout template
│   ├── partials/
│   │   └── navigation.ejs # Navigation component
│   ├── dashboard.ejs     # Dashboard view
│   ├── employees.ejs     # Employee management
│   ├── attendance.ejs    # Attendance tracking
│   ├── leaves.ejs        # Leave management
│   ├── payroll.ejs       # Payroll system
│   ├── reports.ejs       # Analytics and reports
│   └── error.ejs         # Error page
├── public/
│   ├── css/
│   │   └── style.css     # Custom styles
│   └── js/
│       └── main.js       # Frontend JavaScript
├── seeders/
│   └── seedData.js       # Database seeding script
├── .env                  # Environment variables
├── .gitignore           # Git ignore rules
└── package.json         # Dependencies and scripts
```

## 🎯 Available Routes

### Employee Routes
```
GET    /employees              # View all employees
POST   /employees/add          # Add new employee
POST   /employees/update/:id   # Update employee
DELETE /employees/delete/:id   # Delete employee
```

### Attendance Routes
```
GET    /attendance             # View today's attendance
POST   /attendance/mark        # Mark individual attendance
POST   /attendance/bulk-mark   # Bulk mark attendance
```

### Leave Routes
```
GET    /leaves                 # View all leave requests
POST   /leaves/apply           # Apply for leave
POST   /leaves/update-status   # Approve/Reject leave
```

### Payroll Routes
```
GET    /payroll                         # View payroll overview
GET    /payroll/payslip/:id/:month/:year # Generate payslip
```

### Reports Routes
```
GET    /reports                # View comprehensive reports
```

## 🔧 NPM Scripts

```bash
npm start          # Start production server
npm run dev        # Start development server with auto-reload
npm run seed       # Seed database with sample data
```

## 📱 Features Detail

### Employee Management
- Add, edit, and delete employee records
- Track employee details (name, email, department, position, salary)
- Monitor employment status (Active, Inactive, On Leave)
- Avatar generation with employee initials
- Department-wise filtering

### Attendance System
- Mark daily attendance (Present/Absent/Late)
- Record check-in and check-out times
- View today's attendance summary
- Auto-update existing records
- Bulk attendance marking capability

### Leave Management
- Submit leave applications with type and reason
- Four leave types: Casual, Sick, Annual, Emergency
- Approval workflow (Pending → Approved/Rejected)
- Track leave history and status
- Manager approval interface

### Payroll Calculator
- Automatic monthly salary calculation
- Tax deduction (10%)
- Other deductions (5%)
- Net salary computation
- Detailed payslip generation

### Reports & Analytics
- Employee statistics by status
- Department distribution analysis
- Leave request analytics
- Today's attendance breakdown
- Salary expenditure reports (monthly/annual)

## 🚀 Deployment Guide

### Deploy to Heroku

1. **Install Heroku CLI**
```bash
npm install -g heroku
```

2. **Login and Create App**
```bash
heroku login
heroku create your-app-name
```

3. **Set Up MongoDB Atlas**
- Create free cluster at https://cloud.mongodb.com
- Get connection string
- Add to Heroku config:

```bash
heroku config:set MONGODB_URI="mongodb+srv://user:pass@cluster.mongodb.net/hr_dashboard"
heroku config:set NODE_ENV=production
```

4. **Deploy**
```bash
git add .
git commit -m "Initial commit"
git push heroku main
```

5. **Seed Database**
```bash
heroku run node seeders/seedData.js
```

### Deploy to Railway

1. **Connect GitHub Repository**
2. **Add Environment Variables:**
   - `MONGODB_URI`
   - `NODE_ENV=production`
3. **Deploy automatically on push**

### Deploy to Render

1. **Create New Web Service**
2. **Connect Repository**
3. **Build Command:** `npm install`
4. **Start Command:** `npm start`
5. **Add Environment Variables**

## 🔐 Security Best Practices

- Use environment variables for sensitive data
- Implement input validation
- Enable HTTPS in production
- Set up proper CORS policies
- Use helmet.js for security headers
- Implement rate limiting
- Regular dependency updates

## 📊 Database Schema

### Employee Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  department: String (enum: HR, IT, Sales, Marketing, Finance),
  position: String (required),
  salary: Number (required),
  joiningDate: Date (required),
  status: String (enum: Active, Inactive, On Leave),
  avatar: String
}
```

### Attendance Model
```javascript
{
  employee: ObjectId (ref Employee),
  date: Date (required),
  status: String (enum: Present, Absent, Late),
  checkIn: String,
  checkOut: String
}
```

### Leave Model
```javascript
{
  employee: ObjectId (ref Employee),
  leaveType: String (enum: Casual/Sick/Annual/Emergency Leave),
  startDate: Date (required),
  endDate: Date (required),
  reason: String,
  status: String (enum: Pending, Approved, Rejected)
}
```

## 🐛 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sc query MongoDB

# Start MongoDB service
net start MongoDB
```

### Port Already in Use
```bash
# Change PORT in .env file
PORT=3001
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📝 License

MIT License - feel free to use this project for learning or commercial purposes.

## 👥 Support

For issues, questions, or contributions, please open an issue on GitHub.

---

**Built with ❤️ using Node.js, Express, and MongoDB**
