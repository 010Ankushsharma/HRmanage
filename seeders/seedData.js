const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Holiday = require('../models/Holiday');
const Activity = require('../models/Activity');

// Load environment variables
dotenv.config();

// Sample Data
const employees = [
  {
    name: 'Amit Sharma',
    email: 'amit.sharma@company.com',
    department: 'IT',
    position: 'Senior Developer',
    salary: 85000,
    joiningDate: new Date('2022-03-15'),
    status: 'Active'
  },
  {
    name: 'Priya Singh',
    email: 'priya.singh@company.com',
    department: 'HR',
    position: 'HR Manager',
    salary: 75000,
    joiningDate: new Date('2021-06-10'),
    status: 'Active'
  },
  {
    name: 'Rahul Verma',
    email: 'rahul.verma@company.com',
    department: 'Sales',
    position: 'Sales Executive',
    salary: 65000,
    joiningDate: new Date('2023-01-20'),
    status: 'Active'
  },
  {
    name: 'Sneha Patel',
    email: 'sneha.patel@company.com',
    department: 'Marketing',
    position: 'Marketing Specialist',
    salary: 70000,
    joiningDate: new Date('2022-09-05'),
    status: 'Active'
  },
  {
    name: 'Vikram Kumar',
    email: 'vikram.kumar@company.com',
    department: 'Finance',
    position: 'Financial Analyst',
    salary: 80000,
    joiningDate: new Date('2021-11-30'),
    status: 'Active'
  },
  {
    name: 'Anita Desai',
    email: 'anita.desai@company.com',
    department: 'IT',
    position: 'Full Stack Developer',
    salary: 78000,
    joiningDate: new Date('2023-02-14'),
    status: 'Active'
  },
  {
    name: 'Rajesh Gupta',
    email: 'rajesh.gupta@company.com',
    department: 'Sales',
    position: 'Sales Manager',
    salary: 90000,
    joiningDate: new Date('2020-07-22'),
    status: 'Active'
  },
  {
    name: 'Kavita Reddy',
    email: 'kavita.reddy@company.com',
    department: 'HR',
    position: 'Recruiter',
    salary: 55000,
    joiningDate: new Date('2023-04-10'),
    status: 'Active'
  },
  {
    name: 'Arjun Nair',
    email: 'arjun.nair@company.com',
    department: 'IT',
    position: 'DevOps Engineer',
    salary: 82000,
    joiningDate: new Date('2022-05-18'),
    status: 'Active'
  },
  {
    name: 'Meera Iyer',
    email: 'meera.iyer@company.com',
    department: 'Marketing',
    position: 'Content Strategist',
    salary: 68000,
    joiningDate: new Date('2022-08-25'),
    status: 'Active'
  },
  {
    name: 'Sanjay Kapoor',
    email: 'sanjay.kapoor@company.com',
    department: 'Finance',
    position: 'Accountant',
    salary: 60000,
    joiningDate: new Date('2021-12-05'),
    status: 'On Leave'
  },
  {
    name: 'Pooja Mehta',
    email: 'pooja.mehta@company.com',
    department: 'IT',
    position: 'QA Engineer',
    salary: 72000,
    joiningDate: new Date('2023-03-01'),
    status: 'Active'
  }
];

const holidays = [
  {
    name: 'Labour Day',
    date: new Date('2024-05-01'),
    description: 'International Workers Day'
  },
  {
    name: 'Eid al-Fitr',
    date: new Date('2024-05-14'),
    description: 'Festival marking end of Ramadan'
  },
  {
    name: 'Independence Day',
    date: new Date('2024-06-15'),
    description: 'National Independence Day'
  },
  {
    name: 'Diwali',
    date: new Date('2024-11-01'),
    description: 'Festival of Lights'
  },
  {
    name: 'Christmas',
    date: new Date('2024-12-25'),
    description: 'Celebration of Christmas'
  }
];

const leaveRequests = [
  {
    employeeName: 'Amit Sharma',
    leaveType: 'Casual Leave',
    startDate: new Date('2024-05-10'),
    endDate: new Date('2024-05-12'),
    reason: 'Personal work',
    status: 'Pending'
  },
  {
    employeeName: 'Priya Singh',
    leaveType: 'Sick Leave',
    startDate: new Date('2024-04-22'),
    endDate: new Date('2024-04-23'),
    reason: 'Medical appointment',
    status: 'Approved'
  },
  {
    employeeName: 'Rahul Verma',
    leaveType: 'Annual Leave',
    startDate: new Date('2024-04-25'),
    endDate: new Date('2024-04-28'),
    reason: 'Family vacation',
    status: 'Approved'
  },
  {
    employeeName: 'Sneha Patel',
    leaveType: 'Emergency Leave',
    startDate: new Date('2024-05-05'),
    endDate: new Date('2024-05-06'),
    reason: 'Family emergency',
    status: 'Pending'
  },
  {
    employeeName: 'Vikram Kumar',
    leaveType: 'Casual Leave',
    startDate: new Date('2024-04-15'),
    endDate: new Date('2024-04-16'),
    reason: 'Personal reasons',
    status: 'Rejected'
  }
];

const activities = [
  {
    message: 'Kavita Patel added a new employee record',
    type: 'employee',
    timestamp: new Date(Date.now() - 10 * 60 * 1000) // 10 mins ago
  },
  {
    message: 'Payroll for April 2024 has been processed',
    type: 'payroll',
    timestamp: new Date(Date.now() - 60 * 60 * 1000) // 1 hour ago
  },
  {
    message: 'Leave request approved for Priya Singh',
    type: 'leave',
    timestamp: new Date(Date.now() - 3 * 60 * 60 * 1000) // 3 hours ago
  },
  {
    message: 'Attendance marked for IT department',
    type: 'attendance',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000) // 5 hours ago
  },
  {
    message: 'New system update deployed successfully',
    type: 'system',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000) // 1 day ago
  },
  {
    message: 'Ravi Kumar applied for casual leave',
    type: 'leave',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) // 2 days ago
  }
];

// Connect to MongoDB and seed data
const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Employee.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Holiday.deleteMany({});
    await Activity.deleteMany({});

    console.log('Cleared existing data');

    // Insert Employees
    const insertedEmployees = await Employee.insertMany(employees);
    console.log(`Inserted ${insertedEmployees.length} employees`);

    // Insert Holidays
    const insertedHolidays = await Holiday.insertMany(holidays);
    console.log(`Inserted ${insertedHolidays.length} holidays`);

    // Insert Leave Requests
    for (const leaveReq of leaveRequests) {
      const employee = insertedEmployees.find(emp => emp.name === leaveReq.employeeName);
      if (employee) {
        await Leave.create({
          employee: employee._id,
          leaveType: leaveReq.leaveType,
          startDate: leaveReq.startDate,
          endDate: leaveReq.endDate,
          reason: leaveReq.reason,
          status: leaveReq.status
        });
      }
    }
    console.log(`Inserted ${leaveRequests.length} leave requests`);

    // Insert Activities
    await Activity.insertMany(activities);
    console.log(`Inserted ${activities.length} activities`);

    // Generate Attendance Records for Today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const attendanceRecords = [];
    insertedEmployees.forEach(emp => {
      const isPresent = Math.random() > 0.15; // 85% present
      const isLate = isPresent && Math.random() > 0.8; // 20% of present are late

      attendanceRecords.push({
        employee: emp._id,
        date: today,
        status: isPresent ? (isLate ? 'Late' : 'Present') : 'Absent',
        checkIn: isPresent ? (isLate ? '10:15 AM' : '09:00 AM') : null,
        checkOut: isPresent ? '06:00 PM' : null
      });
    });

    await Attendance.insertMany(attendanceRecords);
    console.log(`Inserted ${attendanceRecords.length} attendance records`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\n📊 Summary:');
    console.log(`   - Employees: ${insertedEmployees.length}`);
    console.log(`   - Holidays: ${insertedHolidays.length}`);
    console.log(`   - Leave Requests: ${leaveRequests.length}`);
    console.log(`   - Activities: ${activities.length}`);
    console.log(`   - Attendance Records: ${attendanceRecords.length}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
