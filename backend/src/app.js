// backend/src/app.js - Express application setup
// This file sets up the Express app, middleware, and routes
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Initialize Express app
const app = express()

// Middlewares setup
// CORS configuration to allow requests from multiple origins
const allowedOrigins = process.env.CORS?.split(',').map(origin => origin.trim()) || [];

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}))
app.use(express.json({ limit: '16kb' }))  // Limit the size of JSON and URL-encoded payloads to 16kb
app.use(express.urlencoded({ extended: true, limit: '16kb' }))  // The extended option allows for rich objects and arrays to be encoded into the URL-encoded format
app.use(cookieParser()) // With cookie-parser, we can access cookies via req.cookies

// import routers
import userRouter from './routes/user.route.js'
import todoRouter from './routes/todo.route.js'

// setup routers
app.use('/api/v1/user', userRouter)
app.use('/api/v1/todo', todoRouter)

// Error handling middleware (must be after all routes)
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || 'Internal Server Error'
  
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
    errors: err.errors || []
  })
})

export default app
