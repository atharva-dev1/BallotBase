# ⚡ Quick Reference - Vote Management System

## 🚀 Quick Start Commands

### First Time Setup
```powershell
# 1. Start MongoDB (if not running as service)
mongod

# 2. Backend - Terminal 1
cd backend
npm run dev

# 3. Frontend - Terminal 2 (new window)
cd frontend
npm run dev

# 4. Create Admin User (optional)
cd backend
npm run create-admin
```

### Daily Development
```powershell
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd frontend
npm run dev
```

## 🔑 Default Admin Credentials
After running `npm run create-admin`:
- **Email**: admin@example.com
- **Password**: admin123

⚠️ **Change this password after first login!**

## 📍 Important URLs
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

## 🗂️ Project Structure
```
Vote Management System/
├── frontend/          # React + Vite + TypeScript
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── context/       # Auth context
│   │   ├── pages/         # Page components
│   │   ├── types/         # TypeScript types
│   │   └── utils/         # API utilities
│   └── .env              # Frontend config
│
├── backend/           # Node.js + Express
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Auth middleware
│   ├── server.js         # Entry point
│   ├── createAdmin.js    # Admin creation script
│   └── .env             # Backend config
│
└── Documentation files
```

## 🎯 Key Features Checklist

### Authentication ✅
- [x] User registration
- [x] User login
- [x] JWT tokens
- [x] Protected routes
- [x] Role-based access

### Polls ✅
- [x] Create polls (Admin)
- [x] View all polls
- [x] Vote on polls
- [x] View results
- [x] Delete polls (Admin)

### UI/UX ✅
- [x] Glassmorphism design
- [x] Responsive layout
- [x] Animations
- [x] Charts (Recharts)
- [x] Progress bars

## 🔧 Common Commands

### Backend
```powershell
npm run dev          # Start with nodemon
npm start            # Start production
npm run create-admin # Create admin user
```

### Frontend
```powershell
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| MongoDB connection error | Run `mongod` or check if MongoDB service is running |
| Port 5000 in use | Change PORT in `backend/.env` |
| Port 5173 in use | Vite will auto-suggest another port |
| CORS errors | Ensure backend is running on port 5000 |
| Can't create polls | Make sure you're logged in as admin |
| Blank page | Check browser console for errors |

## 📊 API Endpoints Quick Reference

### Auth
```
POST /api/auth/register    # Register user
POST /api/auth/login       # Login user
```

### Polls
```
GET    /api/polls          # Get all polls (Protected)
GET    /api/polls/:id      # Get single poll (Protected)
POST   /api/polls          # Create poll (Admin only)
POST   /api/polls/:id/vote # Vote on poll (Protected)
DELETE /api/polls/:id      # Delete poll (Admin only)
```

## 🎨 Color Reference

```css
Primary Blue:   #0ea5e9
Primary Purple: #d946ef
Background:     #0f172a (slate-900)
Success:        #10b981
Error:          #ef4444
```

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/vote-management
JWT_SECRET=your_secret_key
```

### Frontend (.env)
```env
VITE_API_URL=http://localhost:5000/api
```

## 🔐 Security Notes

- ✅ Passwords are hashed with bcrypt
- ✅ JWT tokens expire in 7 days
- ✅ Protected API routes
- ✅ Input validation on all forms
- ✅ Role-based access control

## 📚 Documentation Files

- **README.md** - Complete project documentation
- **SETUP_GUIDE.md** - Step-by-step setup for beginners
- **FEATURES.md** - Detailed feature list
- **QUICK_REFERENCE.md** - This file!

## 💡 Tips for Beginners

1. **Always start MongoDB first** before backend
2. **Keep terminals open** while developing
3. **Check browser console** for frontend errors
4. **Check terminal** for backend errors
5. **Use MongoDB Compass** to view database
6. **Read error messages** - they're helpful!

## 🎓 Learning Resources

### Frontend
- React: https://react.dev
- TypeScript: https://www.typescriptlang.org
- Tailwind: https://tailwindcss.com

### Backend
- Express: https://expressjs.com
- Mongoose: https://mongoosejs.com
- JWT: https://jwt.io

## 🚀 Next Steps

1. ✅ Complete setup
2. ✅ Create admin account
3. ✅ Create your first poll
4. ✅ Test voting
5. ✅ Explore the code
6. 🎯 Add new features!

## 📞 Getting Help

1. Check the error message
2. Read the documentation
3. Search the error online
4. Check MongoDB connection
5. Verify all services are running

---

**Happy Coding! 🎉**

For detailed information, see:
- **Setup**: SETUP_GUIDE.md
- **Features**: FEATURES.md
- **Full Docs**: README.md
