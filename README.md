# Student Grievance & Analytics Platform

A MERN stack application for filing, tracking, and analyzing student grievances with AI-powered complaint structuring and dual-role access.

## Features
- 📋 **File Complaints:** Students can file detailed complaints
- 🔐 **Privacy Protection:** University IDs are hashed; generated Reference IDs for tracking
- 🤖 **AI Structuring:** Automatic categorization and extraction of complaint details
- 📊 **Analytics Dashboard:** Real-time heatmaps and trend analysis
- 👮 **Officer Portal:** Full case access with status updates and Socket.IO real-time tracking
- 🔔 **Live Updates:** Socket.IO for real-time complaint status notifications

## Tech Stack
- **Frontend:** React.js + Vite
- **Backend:** Node.js + Express.js
- **Database:** MongoDB
- **Authentication:** JWT + bcrypt
- **Real-time:** Socket.IO
- **File Upload:** Multer + Cloudinary

## Quick Start

### Backend Setup
```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register/student` - Register Student
- `POST /api/auth/login/student` - Login Student
- `POST /api/auth/register/officer` - Register Officer
- `POST /api/auth/login/officer` - Login Officer

### Complaints
- `POST /api/complaints` - File New Complaint
- `GET /api/complaints` - Get User's Complaints
- `GET /api/complaints/:referenceID` - Get Complaint by Reference ID
- `PUT /api/complaints/:id` - Update Complaint Status (Officer Only)

### Dashboard
- `GET /api/dashboard/stats` - Get Analytics Stats
- `GET /api/dashboard/complaints/all` - Get All Complaints (Officer Only)

## License
MIT
