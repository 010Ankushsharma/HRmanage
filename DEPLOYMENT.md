# Deployment Guide

## 🚀 Production Deployment Options

This HR Management System can be deployed to various cloud platforms. Choose the one that best fits your needs.

---

## Option 1: Heroku (Recommended for Beginners)

### Prerequisites
- Heroku account (free at https://heroku.com)
- Heroku CLI installed
- MongoDB Atlas account (free tier)

### Step-by-Step Deployment

#### 1. Prepare MongoDB Atlas
```
1. Go to https://cloud.mongodb.com
2. Create free cluster (M0)
3. Create database user
4. Get connection string
5. Whitelist IP: 0.0.0.0/0 (allow all)
```

Connection string format:
```
mongodb+srv://username:password@cluster.mongodb.net/hr_dashboard?retryWrites=true&w=majority
```

#### 2. Login to Heroku
```bash
heroku login
```

#### 3. Create Heroku App
```bash
cd HRmange
heroku create your-app-name
```

#### 4. Set Environment Variables
```bash
heroku config:set MONGODB_URI="your-mongodb-atlas-connection-string"
heroku config:set NODE_ENV=production
```

#### 5. Initialize Git (if not already done)
```bash
git init
git add .
git commit -m "Initial commit"
```

#### 6. Deploy to Heroku
```bash
git push heroku main
```

#### 7. Seed Database
```bash
heroku run node seeders/seedData.js
```

#### 8. Open Application
```bash
heroku open
```

**Your app is now live!** 🎉

---

## Option 2: Railway (Easiest)

### Steps

1. **Connect GitHub**
   - Go to https://railway.app
   - Sign in with GitHub
   - Click "New Project" → "Deploy from GitHub repo"

2. **Select Repository**
   - Choose your HRmange repository

3. **Add Environment Variables**
   ```
   MONGODB_URI=your-mongodb-connection-string
   NODE_ENV=production
   ```

4. **Deploy**
   - Railway automatically builds and deploys
   - No commands needed!

5. **Custom Domain (Optional)**
   - Go to Settings → Domains
   - Add your custom domain

**Done!** Your app is deployed.

---

## Option 3: Render (Free Tier Available)

### Steps

#### 1. Create Web Service
- Go to https://render.com
- Click "New +" → "Web Service"

#### 2. Connect Repository
- Connect your GitHub account
- Select HRmange repository

#### 3. Configure Build
```
Build Command: npm install
Start Command: npm start
```

#### 4. Add Environment Variables
```
MONGODB_URI=your-mongodb-connection-string
NODE_ENV=production
```

#### 5. Deploy
- Click "Create Web Service"
- Render builds and deploys automatically

**Live URL provided!** ✅

---

## Option 4: VPS (DigitalOcean, AWS EC2, etc.)

### For Advanced Users

#### 1. Setup Server
```bash
# SSH into server
ssh user@your-server-ip

# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install MongoDB
wget -qO - https://www.mongodb.org/static/pgp/server-6.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/6.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-6.0.list
sudo apt update
sudo apt install -y mongodb-org
sudo systemctl start mongod
sudo systemctl enable mongod
```

#### 2. Clone Repository
```bash
git clone <your-repo-url>
cd HRmange
npm install
```

#### 3. Configure Environment
```bash
nano .env
```

Add:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/hr_dashboard
NODE_ENV=production
```

#### 4. Install PM2 (Process Manager)
```bash
sudo npm install -g pm2
```

#### 5. Start Application
```bash
pm2 start app.js --name hr-system
pm2 startup
pm2 save
```

#### 6. Setup Nginx (Reverse Proxy)
```bash
sudo apt install nginx
sudo nano /etc/nginx/sites-available/hr-system
```

Add Nginx configuration:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable site:
```bash
sudo ln -s /etc/nginx/sites-available/hr-system /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

**Production server ready!** 🚀

---

## Option 5: Docker Deployment

### Create Dockerfile

```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["npm", "start"]
```

### Create docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
      - MONGODB_URI=mongodb://mongo:27017/hr_dashboard
    depends_on:
      - mongo

  mongo:
    image: mongo:6.0
    volumes:
      - mongo-data:/data/db
    ports:
      - "27017:27017"

volumes:
  mongo-data:
```

### Build and Run
```bash
docker-compose up -d
```

### Seed Database
```bash
docker-compose exec app node seeders/seedData.js
```

**Containerized deployment complete!** 🐳

---

## 🔐 Security Checklist for Production

### Environment Variables
- [ ] Never commit `.env` file
- [ ] Use strong passwords
- [ ] Rotate credentials regularly

### Database
- [ ] Use MongoDB Atlas with authentication
- [ ] Enable IP whitelist
- [ ] Regular backups enabled
- [ ] SSL/TLS connection enabled

### Application
- [ ] HTTPS enabled (use Let's Encrypt)
- [ ] Helmet.js security headers
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Input validation enabled

### Server
- [ ] Firewall configured (ufw/iptables)
- [ ] SSH key authentication only
- [ ] Regular security updates
- [ ] Monitoring setup (New Relic, Datadog)
- [ ] Log aggregation (Papertrail, Loggly)

---

## 📊 Performance Optimization

### Enable Compression
Already included in app.js:
```javascript
const compression = require('compression');
app.use(compression());
```

### Enable Caching
Install redis for session caching:
```bash
npm install redis express-session
```

### Database Indexing
Add indexes to frequently queried fields:
```javascript
// In Employee model
employeeSchema.index({ email: 1 });
employeeSchema.index({ department: 1, status: 1 });
```

### CDN for Static Assets
Use Cloudflare or similar for:
- Bootstrap CSS/JS
- Chart.js
- Font Awesome
- Custom CSS/JS

---

## 🔄 CI/CD Pipeline (GitHub Actions)

### Create `.github/workflows/deploy.yml`

```yaml
name: Deploy to Production

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Setup Node.js
      uses: actions/setup-node@v2
      with:
        node-version: '18'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run tests
      run: npm test
    
    - name: Deploy to Heroku
      uses: akhileshns/heroku-deploy@v3.12.12
      with:
        heroku_api_key: ${{secrets.HEROKU_API_KEY}}
        heroku_app_name: "your-app-name"
        heroku_email: "your-email@example.com"
```

---

## 📈 Monitoring & Logging

### Application Monitoring
- **New Relic**: Free tier available
- **Datadog**: Comprehensive monitoring
- **LogRocket**: Session replay

### Error Tracking
- **Sentry**: Real-time error tracking
- **Rollbar**: Error monitoring

### Uptime Monitoring
- **UptimeRobot**: Free 5-minute checks
- **Pingdom**: Professional monitoring

---

## 💰 Cost Estimates

### Free Tier (Development/Testing)
- **Heroku**: Free (with limitations)
- **MongoDB Atlas**: Free 512MB
- **Total**: $0/month

### Small Production
- **Heroku Hobby**: $7/month
- **MongoDB Atlas M10**: ~$60/month
- **Domain**: $12/year
- **Total**: ~$70/month

### Medium Production
- **DigitalOcean Droplet**: $12/month
- **Managed MongoDB**: ~$60/month
- **Domain + SSL**: $15/year
- **Total**: ~$75/month

---

## 🆘 Post-Deployment Checklist

After deployment, verify:

- [ ] Application loads without errors
- [ ] All routes accessible
- [ ] Database connection working
- [ ] Forms submit successfully
- [ ] Charts rendering correctly
- [ ] Mobile responsive
- [ ] HTTPS working
- [ ] Error pages display properly
- [ ] Logs are being captured
- [ ] Backups are configured

---

## 📞 Support

For deployment issues:
1. Check application logs
2. Verify environment variables
3. Test database connection
4. Review platform-specific documentation

**Happy Deploying!** 🚀
