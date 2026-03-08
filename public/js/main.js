// Main JavaScript for HR Dashboard

document.addEventListener('DOMContentLoaded', function() {
  // Check if we're on the dashboard page
  if (window.chartData) {
    initEmployeeOverviewChart();
    initAttendanceSummaryChart();
    setupChartControls();
  }
  
  // Initialize employee management if on employees page
  initEmployeeManagement();
  
  // Initialize attendance management if on attendance page
  initAttendanceManagement();
  
  // Initialize leave management if on leaves page
  initLeaveManagement();
});

// Employee Overview Chart (Bar Chart)
let employeeChart;
function initEmployeeOverviewChart() {
  const ctx = document.getElementById('employeeOverviewChart').getContext('2d');
  
  employeeChart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: window.chartData.employeeOverview.labels,
      datasets: [
        {
          label: 'New Hires',
          data: window.chartData.employeeOverview.newHires,
          backgroundColor: '#667eea',
          borderColor: '#5a67d8',
          borderWidth: 1
        },
        {
          label: 'Departures',
          data: window.chartData.employeeOverview.departures,
          backgroundColor: '#f093fb',
          borderColor: '#f5576c',
          borderWidth: 1
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'bottom',
          labels: {
            usePointStyle: true,
            padding: 15,
            font: {
              size: 12,
              family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
            }
          }
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          cornerRadius: 8,
          displayColors: true
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            stepSize: 5,
            font: {
              size: 11
            }
          },
          grid: {
            color: 'rgba(0, 0, 0, 0.05)'
          }
        },
        x: {
          ticks: {
            font: {
              size: 11
            }
          },
          grid: {
            display: false
          }
        }
      }
    }
  });
}

// Attendance Summary Chart (Donut Chart)
let attendanceChart;
function initAttendanceSummaryChart() {
  const ctx = document.getElementById('attendanceSummaryChart').getContext('2d');
  
  attendanceChart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: ['Present', 'Absent', 'Late'],
      datasets: [{
        data: [
          window.chartData.attendanceSummary.present,
          window.chartData.attendanceSummary.absent,
          window.chartData.attendanceSummary.late
        ],
        backgroundColor: [
          '#3498db',
          '#e74c3c',
          '#f39c12'
        ],
        borderColor: [
          '#2980b9',
          '#c0392b',
          '#e67e22'
        ],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      cutout: '65%',
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          padding: 12,
          titleFont: {
            size: 14
          },
          bodyFont: {
            size: 13
          },
          cornerRadius: 8,
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = total > 0 ? ((value / total) * 100).toFixed(1) : 0;
              return `${label}: ${value} (${percentage}%)`;
            }
          }
        }
      }
    }
  });
}

// Setup Chart Controls (Monthly/Yearly toggle)
function setupChartControls() {
  const monthlyBtn = document.getElementById('monthlyBtn');
  const yearlyBtn = document.getElementById('yearlyBtn');
  
  if (monthlyBtn && yearlyBtn) {
    monthlyBtn.addEventListener('click', function() {
      monthlyBtn.classList.add('active');
      monthlyBtn.classList.remove('btn-outline-primary');
      monthlyBtn.classList.add('btn-primary');
      
      yearlyBtn.classList.remove('active');
      yearlyBtn.classList.add('btn-outline-primary');
      yearlyBtn.classList.remove('btn-primary');
      
      // Update chart with monthly data
      updateEmployeeChartData(window.chartData.employeeOverview.newHires, 
                              window.chartData.employeeOverview.departures);
    });
    
    yearlyBtn.addEventListener('click', function() {
      yearlyBtn.classList.add('active');
      yearlyBtn.classList.remove('btn-outline-primary');
      yearlyBtn.classList.add('btn-primary');
      
      monthlyBtn.classList.remove('active');
      monthlyBtn.classList.add('btn-outline-primary');
      monthlyBtn.classList.remove('btn-primary');
      
      // For demo, using same data. In real app, fetch yearly data
      updateEmployeeChartData(window.chartData.employeeOverview.newHires, 
                              window.chartData.employeeOverview.departures);
    });
  }
}

// Update Employee Chart Data
function updateEmployeeChartData(newHires, departures) {
  if (employeeChart) {
    employeeChart.data.datasets[0].data = newHires;
    employeeChart.data.datasets[1].data = departures;
    employeeChart.update();
  }
}

// Search functionality
const searchInput = document.getElementById('searchInput');
if (searchInput) {
  searchInput.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
      const searchTerm = this.value.trim();
      if (searchTerm) {
        console.log('Searching for:', searchTerm);
        // Implement search functionality here
        alert(`Search functionality for "${searchTerm}" will be implemented soon!`);
      }
    }
  });
}

// Add smooth transitions to all cards
document.querySelectorAll('.card, .stat-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transition = 'all 0.3s ease';
  });
});

// Notification click handler
document.querySelectorAll('.notification-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    console.log('Notifications clicked');
    // Implement notification functionality here
  });
});

// Employee Management Functions
function initEmployeeManagement() {
  // Edit button handlers
  document.querySelectorAll('.edit-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      const name = this.dataset.name;
      const email = this.dataset.email;
      const department = this.dataset.department;
      const position = this.dataset.position;
      const salary = this.dataset.salary;
      const joiningDate = this.dataset.joiningdate;
      const status = this.dataset.status;
      
      // Populate edit modal
      document.getElementById('editEmployeeId').value = id;
      document.getElementById('editName').value = name;
      document.getElementById('editEmail').value = email;
      document.getElementById('editDepartment').value = department;
      document.getElementById('editPosition').value = position;
      document.getElementById('editSalary').value = salary;
      document.getElementById('editJoiningDate').value = joiningDate;
      document.getElementById('editStatus').value = status;
      
      // Update form action
      document.getElementById('editEmployeeForm').action = `/employees/update/${id}`;
    });
  });
  
  // Delete button handlers
  document.querySelectorAll('.delete-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const id = this.dataset.id;
      const name = this.dataset.name;
      
      if (confirm(`Are you sure you want to delete employee "${name}"?`)) {
        fetch(`/employees/delete/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert('Employee deleted successfully!');
            window.location.reload();
          } else {
            alert('Error deleting employee');
          }
        })
        .catch(err => {
          console.error('Error:', err);
          alert('Error deleting employee');
        });
      }
    });
  });
}

// Attendance Management Functions
function initAttendanceManagement() {
  const bulkMarkBtn = document.getElementById('bulkMarkBtn');
  if (bulkMarkBtn) {
    bulkMarkBtn.addEventListener('click', function() {
      const attendanceData = [];
      document.querySelectorAll('.attendance-row').forEach(row => {
        const employeeId = row.dataset.employeeId;
        const status = row.querySelector('.status-select').value;
        const checkIn = row.querySelector('.checkin-input').value;
        const checkOut = row.querySelector('.checkout-input').value;
        
        if (employeeId && status) {
          attendanceData.push({ employeeId, status, checkIn, checkOut });
        }
      });
      
      if (attendanceData.length > 0) {
        fetch('/attendance/bulk-mark', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ attendanceData })
        })
        .then(res => res.redirect ? window.location.reload() : res.json())
        .catch(err => {
          console.error('Error:', err);
          alert('Error marking attendance');
        });
      }
    });
  }
}

// Leave Management Functions
function initLeaveManagement() {
  // Approve/Reject buttons
  document.querySelectorAll('.approve-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const leaveId = this.dataset.id;
      updateLeaveStatus(leaveId, 'Approved');
    });
  });
  
  document.querySelectorAll('.reject-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const leaveId = this.dataset.id;
      updateLeaveStatus(leaveId, 'Rejected');
    });
  });
}

function updateLeaveStatus(id, status) {
  fetch('/leaves/update-status', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ id, status })
  })
  .then(res => res.json())
  .then(data => {
    if (data.success) {
      alert(`Leave ${status.toLowerCase()} successfully!`);
      window.location.reload();
    } else {
      alert('Error updating leave status');
    }
  })
  .catch(err => {
    console.error('Error:', err);
    alert('Error updating leave status');
  });
}
