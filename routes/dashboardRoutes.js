const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');

// Dashboard Routes
router.get('/dashboard', dashboardController.getDashboard);

// Employee Routes
router.get('/employees', dashboardController.getEmployees);
router.post('/employees/add', dashboardController.addEmployee);
router.post('/employees/update/:id', dashboardController.updateEmployee);
router.delete('/employees/delete/:id', dashboardController.deleteEmployee);

// Attendance Routes
router.get('/attendance', dashboardController.getAttendance);
router.post('/attendance/mark', dashboardController.markAttendance);
router.post('/attendance/bulk-mark', dashboardController.bulkMarkAttendance);

// Leave Routes
router.get('/leaves', dashboardController.getLeaves);
router.post('/leaves/apply', dashboardController.applyLeave);
router.post('/leaves/update-status', dashboardController.updateLeaveStatus);

// Payroll Routes
router.get('/payroll', dashboardController.getPayroll);
router.get('/payroll/payslip/:employeeId/:month/:year', dashboardController.generatePayslip);

// Reports Routes
router.get('/reports', dashboardController.getReports);

// Default redirect to dashboard
router.get('/', (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
