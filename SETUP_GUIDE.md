# 🚀 Quick Start Guide for Beginners

Welcome! This guide will help you get your Vote Management System up and running.

## Step 1: Verify Prerequisites ✅

### Check Node.js Installation
Open PowerShell and run:
```powershell
node --version
```
You should see something like `v18.x.x` or higher. If not, [download Node.js](https://nodejs.org/).

### Check MongoDB Installation
```powershell
mongod --version
```
You should see MongoDB version info. If not, [download MongoDB](https://www.mongodb.com/try/download/community).

## Step 2: Start MongoDB 🍃

### Windows
MongoDB should start automatically as a service. To verify:
```powershell
Get-Service -Name MongoDB
```

If it's not running, start it:
```powershell
Start-Service -Name MongoDB
```

Or run MongoDB manually:
```powershell
mongod
```

## Step 3: Start the Backend Server 🔧

Open PowerShell in the project directory:

```powershell
# Navigate to backend
cd backend

# Start the server
npm run dev
```

You should see:
```
✅ MongoDB connected successfully
🚀 Server is running on port 5000
```

**Keep this terminal open!**

## Step 4: Start the Frontend 🎨

Open a **NEW** PowerShell window:

```powershell
# Navigate to frontend
cd frontend

# Start the development server
npm run dev
```

You should see:
```
VITE v7.x.x  ready in XXX ms
➜  Local:   http://localhost:5173/
```

## Step 5: Open Your Browser 🌐

1. Open your browser
2. Go to: `http://localhost:5173`
3. You should see the beautiful login page!

## Step 6: Create Your First Account 👤

1. Click "Sign up" on the login page
2. Fill in:
   - Username (at least 3 characters)
   - Email
   - Password (at least 6 characters)
3. Click "Create Account"

You'll be automatically logged in and redirected to the dashboard!

## Step 7: Create an Admin Account (Optional) 👑

To create polls, you need admin access. Here's how:

### Option 1: Using MongoDB Compass (Recommended for beginners)

1. Download [MongoDB Compass](https://www.mongodb.com/try/download/compass)
2. Connect to: `mongodb://localhost:27017`
3. Select database: `vote-management`
4. Select collection: `users`
5. Find your user and click "Edit"
6. Change `"role": "user"` to `"role": "admin"`
7. Click "Update"
8. Refresh your browser - you should now see the "Create Poll" button!

### Option 2: Using MongoDB Shell

```powershell
# Open MongoDB shell
mongosh

# Switch to the database
use vote-management

# Update your user to admin (replace with your email)
db.users.updateOne(
  { email: "your-email@example.com" },
  { $set: { role: "admin" } }
)

# Exit
exit
```

## Step 8: Create Your First Poll 📊

1. As an admin, click "Create Poll" button
2. Enter a question (e.g., "What's your favorite programming language?")
3. Add at least 2 options (e.g., "JavaScript", "Python", "Java")
4. Click "Create Poll"

## Step 9: Vote and See Results! 🗳️

1. Go back to the dashboard
2. Click on your poll
3. Select an option
4. Click "Submit Vote"
5. See the beautiful animated results and chart!

## 🎉 Congratulations!

You've successfully set up and used your Vote Management System!

## Common Issues & Solutions 🔧

### Issue: "MongoDB connection error"
**Solution**: Make sure MongoDB is running. Run `mongod` in a terminal.

### Issue: "Port 5000 already in use"
**Solution**: 
1. Open `backend/.env`
2. Change `PORT=5000` to `PORT=5001`
3. Update `frontend/.env` to `VITE_API_URL=http://localhost:5001/api`

### Issue: "Cannot connect to backend"
**Solution**: Make sure the backend server is running in a separate terminal.

### Issue: "Page not loading"
**Solution**: 
1. Check if frontend is running on port 5173
2. Try clearing browser cache
3. Try a different browser

### Issue: "Nodemon not working" or "npm run dev fails in backend"
**Solution**: 
1. Navigate to the backend folder:
   ```powershell
   cd backend
   ```
2. Reinstall nodemon:
   ```powershell
   npm uninstall nodemon
   npm install --save-dev nodemon
   ```
3. Verify nodemon is installed:
   ```powershell
   npx nodemon --version
   ```
4. Try running the dev server again:
   ```powershell
   npm run dev
   ```

**Note**: A `nodemon.json` configuration file has been added to ensure proper file watching and auto-restart functionality.


## Next Steps 🚀

Now that everything is working:

1. **Experiment**: Create multiple polls, vote on them
2. **Learn**: Look at the code in `frontend/src` and `backend/`
3. **Customize**: Change colors in `tailwind.config.js`
4. **Extend**: Add new features like poll editing, comments, etc.

## Need Help? 💬

- Check the main `README.md` for detailed documentation
- Review the code comments
- Search for error messages online
- Ask in developer communities

Happy coding! 🎊
