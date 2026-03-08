const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Holiday = require('../models/Holiday');
const Activity = require('../models/Activity');

// Load environment variables
dotenv.config();

// Clear all data from database
const clearDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    console.log('='.repeat(60));
    console.log('CLEARING DATABASE...');
    console.log('='.repeat(60));
    console.log('');
    
    // Count existing documents
    const employeeCount = await Employee.countDocuments();
    const attendanceCount = await Attendance.countDocuments();
    const leaveCount = await Leave.countDocuments();
    const holidayCount = await Holiday.countDocuments();
    const activityCount = await Activity.countDocuments();
    
    console.log('📊 Current Database Contents:');
    console.log('-'.repeat(60));
    console.log(`   Employees:      ${employeeCount}`);
    console.log(`   Attendance:     ${attendanceCount}`);
    console.log(`   Leave Requests: ${leaveCount}`);
    console.log(`   Holidays:       ${holidayCount}`);
    console.log(`   Activities:     ${activityCount}`);
    console.log('');
    
    // Delete all documents from each collection
    await Employee.deleteMany({});
    await Attendance.deleteMany({});
    await Leave.deleteMany({});
    await Holiday.deleteMany({});
    await Activity.deleteMany({});
    
    console.log('✅ All collections cleared successfully!');
    console.log('');
    
    // Verify deletion
    const newEmployeeCount = await Employee.countDocuments();
    const newAttendanceCount = await Attendance.countDocuments();
    const newLeaveCount = await Leave.countDocuments();
    const newHolidayCount = await Holiday.countDocuments();
    const newActivityCount = await Activity.countDocuments();
    
    console.log('📊 Database After Clearing:');
    console.log('-'.repeat(60));
    console.log(`   Employees:      ${newEmployeeCount}`);
    console.log(`   Attendance:     ${newAttendanceCount}`);
    console.log(`   Leave Requests: ${newLeaveCount}`);
    console.log(`   Holidays:       ${newHolidayCount}`);
    console.log(`   Activities:     ${newActivityCount}`);
    console.log('');
    
    console.log('='.repeat(60));
    console.log('✅ DATABASE CLEARED SUCCESSFULLY!');
    console.log('='.repeat(60));
    console.log('');
    console.log('Your database is now empty.');
    console.log('You can add your own data according to the schema.');
    console.log('');
    console.log('Schema Reference:');
    console.log('-'.repeat(60));
    console.log('Employee Schema:');
    console.log('  - name: String (required)');
    console.log('  - email: String (required, unique)');
    console.log('  - department: String (enum: HR, IT, Sales, Marketing, Finance)');
    console.log('  - position: String (required)');
    console.log('  - salary: Number (required)');
    console.log('  - joiningDate: Date (required)');
    console.log('  - status: String (enum: Active, Inactive, On Leave)');
    console.log('  - avatar: String (default: "/images/default-avatar.png")');
    console.log('');
    console.log('Attendance Schema:');
    console.log('  - employee: ObjectId (ref Employee, required)');
    console.log('  - date: Date (required)');
    console.log('  - status: String (enum: Present, Absent, Late)');
    console.log('  - checkIn: String');
    console.log('  - checkOut: String');
    console.log('');
    console.log('Leave Schema:');
    console.log('  - employee: ObjectId (ref Employee, required)');
    console.log('  - leaveType: String (enum: Casual Leave, Sick Leave, Annual Leave, Emergency Leave)');
    console.log('  - startDate: Date (required)');
    console.log('  - endDate: Date (required)');
    console.log('  - reason: String');
    console.log('  - status: String (enum: Pending, Approved, Rejected)');
    console.log('');
    console.log('Holiday Schema:');
    console.log('  - name: String (required)');
    console.log('  - date: Date (required)');
    console.log('  - description: String');
    console.log('');
    console.log('Activity Schema:');
    console.log('  - message: String (required)');
    console.log('  - type: String (enum: employee, payroll, leave, attendance, system)');
    console.log('  - timestamp: Date (default: now)');
    console.log('');
    console.log('='.repeat(60));
    
    process.exit(0);
  } catch (error) {
    console.error('❌ Error clearing database:', error.message);
    process.exit(1);
  }
};

// Run the clear function
clearDatabase();
