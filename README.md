# SecureTech Platform - Complete Package

## 🚀 Quick Start

### Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the Flask backend
python app.py
```

### Frontend Setup (if rebuilding)
```bash
# Navigate to React frontend
cd securetech-frontend

# Install dependencies
npm install

# Build for production
npm run build

# Copy build to client/build (already done)
cp -r dist/* ../client/build/
```

### Single Command Deploy
```bash
# Backend serves both API and frontend
python app.py
# Access at: http://localhost:5000
```

## 📁 Project Structure

```
SecureTech_Complete_Package/
├── app.py                    # Main Flask application (CORRECTED)
├── main.py                   # Original complex version
├── requirements.txt          # Python dependencies
├── client/
│   └── build/               # React production build (READY)
├── securetech-frontend/     # React source code
│   ├── src/
│   ├── package.json
│   └── dist/               # Vite build output
└── README.md               # This file
```

## 🔐 Demo Credentials

- **Admin**: admin@securetech.com / admin123
- **Officer**: officer@securetech.com / officer123  
- **Client**: client@securetech.com / client123

## ✅ What's Working

- ✅ Flask backend with JWT authentication
- ✅ React frontend with role-based UI
- ✅ Company data isolation architecture
- ✅ Professional SecureTech branding
- ✅ Security protections (robots.txt, noindex)
- ✅ Mobile-responsive design

## 🔧 Production Deployment

### Option 1: Simple Python Server
```bash
python app.py
```

### Option 2: Gunicorn (Recommended)
```bash
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Option 3: Docker
```bash
# Create Dockerfile
FROM python:3.11-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD ["gunicorn", "-w", "4", "-b", "0.0.0.0:5000", "app:app"]

# Build and run
docker build -t securetech .
docker run -p 5000:5000 securetech
```

## 🌐 Environment Variables

Create `.env` file:
```
FLASK_ENV=production
JWT_SECRET_KEY=your-secret-key-here
```

## 📊 API Endpoints

- `GET /` - Serves React frontend
- `GET /api/health` - Health check
- `POST /api/auth/login` - User authentication
- `GET /api/incidents` - Get incidents (JWT required)
- `GET /api/schedules` - Get schedules (JWT required)

## 🛡️ Security Features

- JWT token authentication
- bcrypt password hashing
- CORS protection
- Company-based data isolation
- Search engine protection (robots.txt, noindex)

## 📱 Frontend Features

- Role-based dashboards (Admin/Officer/Client)
- Auto-fill demo credentials
- Company data isolation UI
- Trial mode indicators
- Professional branding
- Mobile-responsive design

## 🔍 Troubleshooting

### Frontend not loading?
- Ensure `client/build/index.html` exists
- Check Flask static_folder points to 'client/build'
- Verify all assets are in `client/build/assets/`

### Login not working?
- Check browser console for API errors
- Verify JWT secret key is set
- Ensure CORS is enabled

### API errors?
- Check Flask logs for detailed error messages
- Verify all required packages are installed
- Ensure database/demo data is loaded

## 📞 Support

This package contains everything needed to run SecureTech independently. All demo data is included and the platform is ready for production deployment.

**Key Files:**
- `app.py` - Corrected Flask backend (USE THIS)
- `client/build/` - Production React frontend
- `requirements.txt` - All Python dependencies

# SecureTech Platform
