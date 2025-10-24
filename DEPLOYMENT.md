# Deployment Instructions

## Changes Made to Fix Production Deployment

### Frontend Changes

1. **Created API Configuration** (`frontend/src/config/api.js`)
   - Centralized axios instance with dynamic base URL
   - Uses environment variables to switch between development and production

2. **Environment Files**
   - `.env.production` - Sets `VITE_API_URL=https://two2doapp.onrender.com`
   - `.env.development` - Empty `VITE_API_URL` to use Vite proxy in dev mode

3. **Updated All API Calls**
   - Replaced `axios` with `api` instance in:
     - `signup.jsx`
     - `login.jsx`
     - `home.jsx`

### Backend Configuration (Already Set)
- CORS is configured to allow requests from `https://22doapp.netlify.app`
- Located in `backend/.env`: `CORS = https://22doapp.netlify.app`

## How to Deploy

### 1. Frontend (Netlify)

**Build the project:**
```bash
cd frontend
npm run build
```

**Deploy to Netlify:**
- Option 1: Drag and drop the `dist` folder to Netlify
- Option 2: Connect your GitHub repo and Netlify will auto-deploy

**Important:** Make sure your Netlify environment variables include:
- `VITE_API_URL=https://two2doapp.onrender.com`

**Netlify Configuration:**
The `_redirects` file is already in `public/` folder to handle SPA routing.

### 2. Backend (Render)

Make sure your Render environment variables include:
- `CORS=https://22doapp.netlify.app`
- `MONGO_URI=your_mongodb_connection_string`
- `ACCESS_TOKEN_SECRET=your_secret`
- `REFRESH_TOKEN_SECRET=your_secret`
- `ACCESS_TOKEN_EXPIRY=1d`
- `REFRESH_TOKEN_EXPIRY=7d`
- `PORT=6000`

**Deploy:**
Render will automatically deploy when you push to your connected GitHub repo.

## Testing

After deploying both frontend and backend:

1. Visit `https://22doapp.netlify.app/signup`
2. Try creating a new account
3. The error should now be replaced with proper backend error messages
4. If signup is successful, you should be redirected to login

## Common Issues

### Issue: "Signup failed. Please try again"
**Cause:** Frontend can't reach backend
**Solution:** 
- Check backend is running on Render
- Verify `VITE_API_URL` environment variable in Netlify
- Check browser console for CORS errors

### Issue: CORS errors
**Cause:** Backend CORS not configured correctly
**Solution:**
- Verify `CORS` environment variable in Render is set to `https://22doapp.netlify.app`
- No trailing slash in the URL
- Restart backend after changing env vars

### Issue: 404 Not Found on refresh
**Cause:** SPA routing issue
**Solution:**
- Make sure `_redirects` file is in the `public` folder
- Content should be: `/* /index.html 200`
