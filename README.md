# 🗳️ Full-Stack Vote Management System

A modern, full-stack voting application built with React, Node.js, Express, and MongoDB. Features include user authentication, poll creation, real-time voting, and beautiful data visualization.

![Tech Stack](https://img.shields.io/badge/React-18-blue) ![Node.js](https://img.shields.io/badge/Node.js-Express-green) ![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-brightgreen) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)

## ✨ Features

- 🔐 **User Authentication**: Secure JWT-based authentication with bcrypt password hashing
- 👥 **Role-Based Access**: Admin and User roles with different permissions
- 📊 **Poll Creation**: Admins can create polls with 2-6 options
- 🗳️ **Voting System**: Users can vote once per poll
- 📈 **Real-Time Results**: Live vote counts with animated progress bars
- 📉 **Data Visualization**: Beautiful bar charts using Recharts
- 🎨 **Modern UI**: Glassmorphism design with Tailwind CSS
- ⚡ **Responsive**: Works perfectly on all devices

## 🛠️ Tech Stack

### Frontend
- **React 18** with **Vite** for fast development
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **React Router** for navigation
- **Axios** for API calls
- **Recharts** for data visualization

### Backend
- **Node.js** with **Express.js**
- **MongoDB** with **Mongoose** ODM
- **JWT** for authentication
- **bcryptjs** for password hashing
- **express-validator** for input validation

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** (v5 or higher) - [Download](https://www.mongodb.com/try/download/community)
- **npm** or **yarn** package manager

## 🚀 Installation & Setup

### 1. Clone or Navigate to the Project

```bash
cd "d:\Full_Stack_Development\Vote Management System"
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies (already done)
npm install

# Make sure MongoDB is running on your system
# Windows: MongoDB should be running as a service
# Mac/Linux: mongod

# Start the backend server
npm run dev
```

The backend will run on **http://localhost:5000**

### 3. Frontend Setup

Open a **new terminal** and run:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies (already done)
npm install

# Start the development server
npm run dev
```

The frontend will run on **http://localhost:5173**

## 🎯 Usage Guide

### First Time Setup

1. **Start MongoDB**: Ensure MongoDB is running on your system
2. **Start Backend**: Run `npm run dev` in the backend folder
3. **Start Frontend**: Run `npm run dev` in the frontend folder
4. **Open Browser**: Navigate to `http://localhost:5173`

### Creating Your First Admin User

By default, all users are created with the `user` role. To create an admin:

**Option 1: Modify during registration (Temporary for testing)**
- Register a new account
- Manually update the user in MongoDB to have `role: "admin"`

**Option 2: Use MongoDB Compass or Shell**
```javascript
// Connect to your database
use vote-management

// Update a user to admin
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)
```

### Using the Application

1. **Register/Login**: Create an account or login
2. **View Polls**: See all available polls on the dashboard
3. **Vote**: Click on a poll and select your choice
4. **View Results**: After voting, see live results with charts
5. **Create Polls** (Admin only): Click "Create Poll" to add new polls

## 📁 Project Structure

```
Vote Management System/
├── frontend/
│   ├── src/
│   │   ├── components/      # Reusable components
│   │   ├── context/         # React Context (Auth)
│   │   ├── pages/           # Page components
│   │   ├── types/           # TypeScript types
│   │   ├── utils/           # Utility functions (API)
│   │   ├── App.tsx          # Main app component
│   │   └── main.tsx         # Entry point
│   ├── public/              # Static assets
│   └── package.json
│
├── backend/
│   ├── models/              # Mongoose models
│   ├── routes/              # Express routes
│   ├── middleware/          # Custom middleware
│   ├── server.js            # Entry point
│   └── package.json
│
└── README.md
```

## 🔑 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vote-management
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🎨 Design Features

- **Glassmorphism**: Modern glass-like UI elements
- **Gradient Backgrounds**: Beautiful purple-blue gradients
- **Smooth Animations**: Fade-in, slide-up, and glow effects
- **Responsive Design**: Mobile-first approach
- **Custom Color Palette**: Carefully selected colors for maximum visual appeal

## 🔒 Security Features

- JWT token-based authentication
- Password hashing with bcrypt
- Protected routes on both frontend and backend
- Input validation and sanitization
- Role-based access control

## 📊 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Polls
- `GET /api/polls` - Get all polls (Protected)
- `GET /api/polls/:id` - Get single poll (Protected)
- `POST /api/polls` - Create poll (Admin only)
- `POST /api/polls/:id/vote` - Vote on poll (Protected)
- `DELETE /api/polls/:id` - Delete poll (Admin only)

## 🐛 Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running: `mongod` or check Windows Services
- Verify the connection string in `backend/.env`

### Port Already in Use
- Backend: Change `PORT` in `backend/.env`
- Frontend: Vite will automatically suggest another port

### CORS Errors
- Ensure backend is running on port 5000
- Check `VITE_API_URL` in `frontend/.env`

## 🚀 Production Deployment

### Backend
1. Set up MongoDB Atlas or your preferred MongoDB hosting
2. Update `MONGODB_URI` in production environment
3. Change `JWT_SECRET` to a strong, random string
4. Deploy to Heroku, Railway, or your preferred platform

### Frontend
1. Build the production bundle: `npm run build`
2. Deploy the `dist` folder to Vercel, Netlify, or your preferred platform
3. Update `VITE_API_URL` to your production backend URL

## 📝 License

This project is open source and available for educational purposes.

## 🤝 Contributing

This is a beginner-friendly project! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## 📧 Support

If you encounter any issues or have questions, please create an issue in the repository.

---

**Built with ❤️ for learning full-stack development**
