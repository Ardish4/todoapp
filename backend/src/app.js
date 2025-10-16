// backend/src/app.js - Express application setup
// This file sets up the Express app, middleware, and routes
import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'

// Initialize Express app
const app = express()

// Middlewares setup
// CORS configuration to allow requests from the specified origin with credentials
app.use(cors({
  origin: process.env.CORS,
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

export default app
