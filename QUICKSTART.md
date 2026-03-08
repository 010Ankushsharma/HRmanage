# Quick Start Guide

Get your HR Management System up and running in minutes!

---

## 🚀 Option 1: Local Development (Recommended for Testing)

### Prerequisites
- Node.js installed (v14+)
- MongoDB installed locally

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Database
Make sure MongoDB is running:
```bash
# Windows
net start MongoDB

# macOS/Linux
sudo systemctl start mongod
```

### 3. Seed Database with Sample Data
```bash
npm run seed
```

### 4. Start Application
```bash
npm run dev
```

✅ **Done!** Visit http://localhost:3000/dashboard

---

## 🌐 Option 2: Deploy to Cloud (Production)

### Heroku Deployment (5 minutes)

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Login & Create App**
   ```bash
   heroku login
   heroku create my-hr-system
   ```

3. **Setup MongoDB Atlas**
   - Go to https://cloud.mongodb.com
   - Create free cluster
   - Get connection string

4. **Set Environment Variables**
   ```bash
   heroku config:set MONGODB_URI="your-connection-string"
   ```

5. **Deploy**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push heroku main
   ```

6. **Seed Database**
   ```bash
   heroku run node seeders/seedData.js
   ```

✅ **Live!** Your app is now accessible at `https://my-hr-system.herokuapp.com`

---

## 🐳 Option 3: Docker (Containerized)

### Run with Docker Compose

```bash
# Build and start all services
docker-compose up -d

# Seed database
docker-compose exec app node seeders/seedData.js
```

✅ **Done!** Visit http://localhost:3000

---

## 📋 What's Included?

After setup, you'll have:

### Pre-loaded Data
- ✅ 12 employees across 5 departments
- ✅ Today's attendance records
- ✅ Leave requests (Pending, Approved, Rejected)
- ✅ Upcoming holidays
- ✅ Recent activities

### Working Features
- ✅ Employee Management (CRUD)
- ✅ Attendance Tracking
- ✅ Leave Management
- ✅ Payroll Calculator
- ✅ Reports & Analytics

---

## 🔧 Common Commands

```bash
# Start development server
npm run dev

# Start production server
npm start

# Seed database
npm run seed

# Clear database
node seeders/clearDatabase.js
```

---

## 🆘 Troubleshooting

### MongoDB Connection Error
```bash
# Check if MongoDB is running
sc query MongoDB

# If not running:
net start MongoDB
```

### Port Already in Use
Change port in `.env`:
```
PORT=3001
```

### Module Not Found
```bash
# Clean reinstall
rm -rf node_modules package-lock.json
npm install
```

---

## 📞 Need Help?

Check the full documentation:
- [README.md](README.md) - Complete project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guides
- [.env.example](.env.example) - Environment configuration template

---

**Happy Coding!** 🎉
