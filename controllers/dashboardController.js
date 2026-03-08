const Employee = require('../models/Employee');
const Attendance = require('../models/Attendance');
const Leave = require('../models/Leave');
const Holiday = require('../models/Holiday');
const Activity = require('../models/Activity');

// Get Dashboard Data
exports.getDashboard = async (req, res) => {
  try {
    // Top Cards Data
    const totalEmployees = await Employee.countDocuments({ status: 'Active' });
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const onLeaveToday = await Employee.countDocuments({ status: 'On Leave' });
    
    const pendingApprovals = await Leave.countDocuments({ status: 'Pending' });
    
    const upcomingHolidays = await Holiday.countDocuments({
      date: { $gte: today }
    });

    // Employee Overview Chart Data (Department-wise)
    const departments = ['HR', 'IT', 'Sales', 'Marketing', 'Finance'];
    const employeeOverview = {
      labels: departments,
      newHires: [],
      departures: []
    };

    for (const dept of departments) {
      const newHiresCount = await Employee.countDocuments({
        department: dept,
        joiningDate: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) }
      });
      
      const inactiveCount = await Employee.countDocuments({
        department: dept,
        status: 'Inactive'
      });

      employeeOverview.newHires.push(newHiresCount);
      employeeOverview.departures.push(inactiveCount);
    }

    // Attendance Summary Data
    const attendanceData = await Attendance.aggregate([
      {
        $match: {
          date: { $gte: today, $lt: tomorrow }
        }
      },
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);

    const attendanceSummary = {
      Present: 0,
      Absent: 0,
      Late: 0
    };

    attendanceData.forEach(item => {
      attendanceSummary[item._id] = item.count;
    });

    // Calculate percentages
    const totalAttendance = attendanceSummary.Present + attendanceSummary.Absent + attendanceSummary.Late;
    if (totalAttendance > 0) {
      attendanceSummary.presentPercentage = Math.round((attendanceSummary.Present / totalAttendance) * 100);
      attendanceSummary.absentPercentage = Math.round((attendanceSummary.Absent / totalAttendance) * 100);
      attendanceSummary.latePercentage = Math.round((attendanceSummary.Late / totalAttendance) * 100);
    } else {
      // Default values if no data
      attendanceSummary.Present = 75;
      attendanceSummary.Absent = 15;
      attendanceSummary.Late = 10;
      attendanceSummary.presentPercentage = 75;
      attendanceSummary.absentPercentage = 15;
      attendanceSummary.latePercentage = 10;
    }

    // Leave Requests
    const leaveRequests = await Leave.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate('employee', 'name email avatar department');

    // Upcoming Holidays
    const holidays = await Holiday.find({
      date: { $gte: today }
    })
    .sort({ date: 1 })
    .limit(5);

    // Recent Activities
    const recentActivities = await Activity.find()
      .sort({ timestamp: -1 })
      .limit(6);

    res.render('dashboard', {
      title: 'Dashboard',
      totalEmployees,
      onLeaveToday,
      pendingApprovals,
      upcomingHolidays,
      employeeOverview,
      attendanceSummary,
      leaveRequests,
      holidays,
      recentActivities
    });
  } catch (error) {
    console.error('Dashboard Error:', error);
    res.status(500).send('Server Error');
  }
};

// Get Employees Page
exports.getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.render('employees', {
      title: 'Employees',
      employees
    });
  } catch (error) {
    console.error('Employees Error:', error);
    res.status(500).send('Server Error');
  }
};

// Add New Employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, position, salary, joiningDate, status } = req.body;
    
    const employee = new Employee({
      name,
      email,
      department,
      position,
      salary: parseFloat(salary),
      joiningDate: new Date(joiningDate),
      status
    });
    
    await employee.save();
    
    // Log activity
    await Activity.create({
      message: `Added new employee: ${name}`,
      type: 'employee'
    });
    
    res.redirect('/employees');
  } catch (error) {
    console.error('Add Employee Error:', error);
    res.status(500).send('Server Error');
  }
};

// Update Employee
exports.updateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, department, position, salary, joiningDate, status } = req.body;
    
    await Employee.findByIdAndUpdate(id, {
      name,
      email,
      department,
      position,
      salary: parseFloat(salary),
      joiningDate: new Date(joiningDate),
      status
    });
    
    // Log activity
    await Activity.create({
      message: `Updated employee: ${name}`,
      type: 'employee'
    });
    
    res.redirect('/employees');
  } catch (error) {
    console.error('Update Employee Error:', error);
    res.status(500).send('Server Error');
  }
};

// Delete Employee
exports.deleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const employee = await Employee.findById(id);
    
    await Employee.findByIdAndDelete(id);
    
    // Log activity
    await Activity.create({
      message: `Deleted employee: ${employee.name}`,
      type: 'employee'
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Delete Employee Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Attendance Page
exports.getAttendance = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const attendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow }
    }).populate('employee', 'name email department');

    const employees = await Employee.find({ status: 'Active' });

    res.render('attendance', {
      title: 'Attendance',
      attendance,
      employees
    });
  } catch (error) {
    console.error('Attendance Error:', error);
    res.status(500).send('Server Error');
  }
};

// Mark Attendance
exports.markAttendance = async (req, res) => {
  try {
    const { employeeId, status, checkIn, checkOut } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if attendance already exists for today
    const existingAttendance = await Attendance.findOne({
      employee: employeeId,
      date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
    });

    if (existingAttendance) {
      // Update existing
      await Attendance.findByIdAndUpdate(existingAttendance._id, {
        status,
        checkIn,
        checkOut
      });
    } else {
      // Create new
      await Attendance.create({
        employee: employeeId,
        date: today,
        status,
        checkIn,
        checkOut
      });
    }

    // Log activity
    await Activity.create({
      message: `Marked attendance for employee ${employeeId}`,
      type: 'attendance'
    });

    res.redirect('/attendance');
  } catch (error) {
    console.error('Mark Attendance Error:', error);
    res.status(500).send('Server Error');
  }
};

// Bulk Mark Attendance
exports.bulkMarkAttendance = async (req, res) => {
  try {
    const { attendanceData } = req.body;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (const item of attendanceData) {
      const { employeeId, status, checkIn, checkOut } = item;

      const existingAttendance = await Attendance.findOne({
        employee: employeeId,
        date: { $gte: today, $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000) }
      });

      if (existingAttendance) {
        await Attendance.findByIdAndUpdate(existingAttendance._id, {
          status,
          checkIn,
          checkOut
        });
      } else {
        await Attendance.create({
          employee: employeeId,
          date: today,
          status,
          checkIn,
          checkOut
        });
      }
    }

    // Log activity
    await Activity.create({
      message: `Bulk attendance marked for ${attendanceData.length} employees`,
      type: 'attendance'
    });

    res.redirect('/attendance');
  } catch (error) {
    console.error('Bulk Attendance Error:', error);
    res.status(500).send('Server Error');
  }
};

// Get Leaves Page
exports.getLeaves = async (req, res) => {
  try {
    const leaves = await Leave.find()
      .sort({ createdAt: -1 })
      .populate('employee', 'name email avatar department');
    
    const employees = await Employee.find({ status: 'Active' });

    res.render('leaves', {
      title: 'Leave Management',
      leaves,
      employees
    });
  } catch (error) {
    console.error('Leaves Error:', error);
    res.status(500).send('Server Error');
  }
};

// Apply for Leave
exports.applyLeave = async (req, res) => {
  try {
    const { employeeId, leaveType, startDate, endDate, reason } = req.body;
    
    const leave = new Leave({
      employee: employeeId,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      reason
    });
    
    await leave.save();
    
    // Log activity
    await Activity.create({
      message: `New leave request submitted`,
      type: 'leave'
    });
    
    res.redirect('/leaves');
  } catch (error) {
    console.error('Apply Leave Error:', error);
    res.status(500).send('Server Error');
  }
};

// Approve/Reject Leave
exports.updateLeaveStatus = async (req, res) => {
  try {
    const { id, status } = req.body;
    
    await Leave.findByIdAndUpdate(id, {
      status
    });
    
    const leave = await Leave.findById(id).populate('employee', 'name');
    
    // Log activity
    await Activity.create({
      message: `Leave ${status.toLowerCase()} for ${leave.employee.name}`,
      type: 'leave'
    });
    
    res.json({ success: true });
  } catch (error) {
    console.error('Update Leave Status Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Payroll Page
exports.getPayroll = async (req, res) => {
  try {
    const employees = await Employee.find({ status: 'Active' });
    
    // Calculate payroll data for each employee
    const payrollData = employees.map(emp => {
      const monthlySalary = emp.salary / 12;
      const tax = monthlySalary * 0.1; // 10% tax
      const deduction = monthlySalary * 0.05; // 5% other deductions
      const netSalary = monthlySalary - tax - deduction;
      
      return {
        ...emp.toObject(),
        monthlySalary,
        tax,
        deduction,
        netSalary
      };
    });
    
    res.render('payroll', {
      title: 'Payroll',
      employees: payrollData
    });
  } catch (error) {
    console.error('Payroll Error:', error);
    res.status(500).send('Server Error');
  }
};

// Generate Payslip
exports.generatePayslip = async (req, res) => {
  try {
    const { employeeId, month, year } = req.params;
    
    const employee = await Employee.findById(employeeId);
    
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    
    const monthlySalary = employee.salary / 12;
    const tax = monthlySalary * 0.1;
    const deduction = monthlySalary * 0.05;
    const netSalary = monthlySalary - tax - deduction;
    
    res.json({
      employee: {
        name: employee.name,
        email: employee.email,
        department: employee.department,
        position: employee.position
      },
      period: { month, year },
      salary: {
        gross: monthlySalary,
        tax,
        deduction,
        net: netSalary
      }
    });
  } catch (error) {
    console.error('Generate Payslip Error:', error);
    res.status(500).json({ error: 'Server Error' });
  }
};

// Get Reports Page
exports.getReports = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments();
    const activeEmployees = await Employee.countDocuments({ status: 'Active' });
    const onLeave = await Employee.countDocuments({ status: 'On Leave' });
    const inactiveEmployees = await Employee.countDocuments({ status: 'Inactive' });
    
    const totalLeaves = await Leave.countDocuments();
    const pendingLeaves = await Leave.countDocuments({ status: 'Pending' });
    const approvedLeaves = await Leave.countDocuments({ status: 'Approved' });
    const rejectedLeaves = await Leave.countDocuments({ status: 'Rejected' });
    
    // Department-wise statistics
    const departments = ['HR', 'IT', 'Sales', 'Marketing', 'Finance'];
    const deptStats = [];
    
    for (const dept of departments) {
      const count = await Employee.countDocuments({ department: dept, status: 'Active' });
      deptStats.push({ name: dept, count });
    }
    
    // Monthly attendance summary
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const todayAttendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow }
    });
    
    const attendanceStats = {
      present: todayAttendance.filter(a => a.status === 'Present').length,
      absent: todayAttendance.filter(a => a.status === 'Absent').length,
      late: todayAttendance.filter(a => a.status === 'Late').length
    };
    
    // Salary breakdown
    const employees = await Employee.find({ status: 'Active' });
    const totalMonthlySalary = employees.reduce((sum, emp) => sum + (emp.salary / 12), 0);
    const totalAnnualSalary = employees.reduce((sum, emp) => sum + emp.salary, 0);
    
    res.render('reports', {
      title: 'Reports',
      totalEmployees,
      activeEmployees,
      onLeave,
      inactiveEmployees,
      totalLeaves,
      pendingLeaves,
      approvedLeaves,
      rejectedLeaves,
      deptStats,
      attendanceStats,
      totalMonthlySalary: totalMonthlySalary.toFixed(2),
      totalAnnualSalary: totalAnnualSalary.toFixed(2)
    });
  } catch (error) {
    console.error('Reports Error:', error);
    res.status(500).send('Server Error');
  }
};
